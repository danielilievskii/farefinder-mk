export const API_BASE = 'https://wizz-scraper.onrender.com';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | string []>;
}

export const apiClient = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([key, val]) => [key, String(val)])
    );
    url += `?${searchParams}`;
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed [${endpoint}]:`, error);
    throw error;
  }
};