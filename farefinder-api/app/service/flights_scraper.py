import aiohttp
import asyncio
import requests

from datetime import date, timedelta
from dateutil.relativedelta import relativedelta
from aiohttp.client_exceptions import ContentTypeError

from app.service.data_utils import get_airport_codes, get_nearby_airports
from app.core.config import WIZZ_AIR_BUILDNUMBER_URL, WIZZ_AIR_HOME_URL

import re
import shutil
import tempfile
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait


async def main():
    airport_codes = get_airport_codes()
    nearby_airports = get_nearby_airports()

    generated_dates = generate_two_month_ranges()
    all_flights_by_code = {}

    # Selenium is synchronous. Run it outside the event loop so the API can
    # continue serving health checks while Chrome performs discovery.
    base_url = await asyncio.to_thread(get_base_url)

    # Run all airports in parallel
    tasks = [
        process_airport(base_url, code, name, generated_dates, nearby_airports)
        for code, name in airport_codes.items()
    ]
    results = await asyncio.gather(*tasks)

    # Build dictionary
    for code, flights in results:
        all_flights_by_code[code] = flights

    return all_flights_by_code


def generate_two_month_ranges():
    # Use today's date automatically
    start_date = date.today()

    ranges = []
    current_start = start_date

    for _ in range(8):
        current_end = current_start + relativedelta(months=1)
        ranges.append((current_start.isoformat(), current_end.isoformat()))
        # Next start date = 1 day after the end date
        current_start = current_end + timedelta(days=1)

    return ranges


def process_flights(flight_list):
    processed = []

    for flight in flight_list:
        for dep_date in flight.get("departureDates", []):
            discount_price = flight.get("price").get("amount")
            original_price = flight.get("originalPrice").get("amount")

            if not discount_price:
                continue

            processed.append({
                "departureStation": flight.get("departureStation"),
                "arrivalStation": flight.get("arrivalStation"),
                "discountPrice": discount_price,
                "originalPrice": original_price,
                "departureDate": dep_date
            })
    return processed


async def fetch_flights(session, base_url, payload):
    async with session.post(base_url, json=payload) as resp:
        try:
            return await resp.json()
        except ContentTypeError:
            text = await resp.text()
            print(f"Non-JSON response {resp.status} → {text[:100]}...")
            return {}
        except Exception as e:
            print(f"Error fetching flights: {e}")
            return {}


async def process_airport(base_url, code, name, generated_dates, nearby_airports):
    all_outbound_flights = []
    all_return_flights = []

    async with aiohttp.ClientSession() as session:
        tasks = []

        for from_date, to_date in generated_dates:
            # Main request
            payload_main = {
                "adultCount": 1,
                "childCount": 0,
                "flightList": [
                    {"departureStation": "SKP", "arrivalStation": code, "from": from_date, "to": to_date},
                    {"departureStation": code, "arrivalStation": "SKP", "from": from_date, "to": to_date}
                ],
                "priceType": "regular",
                "infantCount": 0
            }
            tasks.append(fetch_flights(session, base_url, payload_main))

        # Run all requests concurrently
        results = await asyncio.gather(*tasks)

        # Process all results
        for data in results:
            outbound_flights = process_flights(data.get("outboundFlights", []))
            return_flights = process_flights(data.get("returnFlights", []))
            all_outbound_flights.extend(outbound_flights)
            all_return_flights.extend(return_flights)

    return code, {"outbound": all_outbound_flights, "return": all_return_flights}


def get_base_url():
    user_data_dir = tempfile.mkdtemp(prefix="chrome-user-data-")

    options = Options()

    options.binary_location = "/usr/bin/google-chrome"  # updated path
    # options.add_argument("--headless=new")  # REQUIRED
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument(f"--user-data-dir={user_data_dir}")

    service = Service("/usr/local/bin/chromedriver")  # updated path

    driver = None

    try:
        driver = webdriver.Chrome(service=service, options=options)
        driver.set_page_load_timeout(60)

        driver.get(WIZZ_AIR_HOME_URL)

        try:
            # A WAF silent challenge can briefly display "Human Verification"
            # before redirecting to the requested page. Wait for the application
            # configuration instead of treating the challenge as an immediate
            # terminal result.
            WebDriverWait(driver, 60, poll_frequency=1).until(
                lambda d: re.search(r'apiUrl\s*:\s*"[^"]+"', d.page_source)
            )
        except TimeoutException as exc:
            html = driver.page_source

            if "Human Verification" in html:
                raise Exception(
                    "Wizz Air / AWS WAF human verification did not complete "
                    "within 60 seconds"
                ) from exc

            raise Exception(
                "Wizz Air apiUrl was not found within 60 seconds "
                f"(title={driver.title!r}, url={driver.current_url!r})"
            ) from exc

        html = driver.page_source

        match = re.search(r'apiUrl\s*:\s*"([^"]+)"', html)

        if not match:
            raise Exception("Wizz Air apiUrl not found in page source")

        api_base_url = match.group(1).rstrip("/")

        return f"{api_base_url}/search/timetable"

    finally:
        if driver:
            driver.quit()

        shutil.rmtree(user_data_dir, ignore_errors=True)



