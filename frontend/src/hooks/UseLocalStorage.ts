import ls, { set, get } from "local-storage";
import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string) => {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(get<T>(key));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const setter = (val: T | null) => {
    set(key, val);
    setValue(val);
  };
  return { value, setter };
};

export default useLocalStorage;
