import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useCookies = (names: string[]) => {
  const [cookies, setCookies] = useState<Map<string, string | undefined>>(
    new Map(),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const newCookies = new Map();
      names.forEach((name) => {
        newCookies.set(name, Cookies.get(name));
      });
      setCookies(newCookies);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return cookies;
};

export default useCookies;
