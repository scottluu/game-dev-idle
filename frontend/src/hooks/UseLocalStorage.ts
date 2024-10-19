import { useEffect, useState } from "react";

const getValFromLocalStorage = <T>(key: string) => {
  const temp = localStorage.getItem(key);
  if (temp === null) {
    return null;
  } else {
    return JSON.parse(temp) as T;
  }
};

const useLocalStorage = <T>(key: string) => {
  const [value, setValue] = useState<T | null>(getValFromLocalStorage(key));
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(getValFromLocalStorage(key));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const setter = (val: T | null) => {
    localStorage.setItem(key, JSON.stringify(val));
  };
  return { value, setter };
};

export default useLocalStorage;
