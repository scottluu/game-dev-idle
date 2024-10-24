import { useEffect, useState } from "react";

const getValFromLocalStorage = <T>(key: string) => {
  const temp = localStorage.getItem(key);
  if (temp === null) {
    return null;
  } else {
    return JSON.parse(temp) as T;
  }
};

const useLocalStorage = <T>(key: string, initialState: T | null = null) => {
  const fromLocalStorage = getValFromLocalStorage<T>(key);
  const valInitialState = fromLocalStorage === null ? initialState : null;
  const [value, setValue] = useState<T | null>(valInitialState);
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
