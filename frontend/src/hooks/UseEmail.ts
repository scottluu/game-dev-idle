import UserSchema from "../schemas/UserSchema";
import useLocalStorage from "./UseLocalStorage";
import { useEffect, useRef, useState } from "react";

const useEmail = () => {
  const [cache, setCache] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    fetch("/api/users/me").then((value) => {
      if (value.status !== 200) return;
      value.json().then((value: UserSchema) => setCache(value.email));
    });
  }, []);
  const cacheResetter = () => setCache(null);
  return { email: cache, cacheResetter: cacheResetter };
};

export default useEmail;
