import {useEffect, useState} from "react";
import {checkServerHealth} from "@/api/health.ts";

export const useServerHealth = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let isMounted = true;

    const checkStatus = async () => {
      const online = await checkServerHealth();

      if (isMounted) {
        setIsOnline(online);
        setIsChecking(false);

        if (!online) {
          intervalId = setInterval(async () => {
            const status = await checkServerHealth();
            if (isMounted) {
              setIsOnline(status);
              if (status) clearInterval(intervalId);
            }
          }, 3000);
        }
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return { isOnline, isChecking };
};