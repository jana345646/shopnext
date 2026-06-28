"use client";

import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline = () => setOffline(false);

    setOffline(!navigator.onLine); // this gets the state of the network when the page reloads then save it in the state

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return {
    offline,
  };
}
