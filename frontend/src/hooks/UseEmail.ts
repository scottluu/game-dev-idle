import UserSchema from "../schemas/UserSchema";
import useLocalStorage from "./UseLocalStorage";
import { useEffect } from "react";
import useIsLoggedIn from "./UseIsLoggedIn";

const getEmail = async () => {
  const response = await fetch("/api/users/me");
  if (response.status !== 200) throw new Error(response.statusText);
  const jsonValue: UserSchema = await response.json();
  return jsonValue.email;
};

const useEmail = () => {
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const { value: email, setter: setEmail } = useLocalStorage<string>("email");

  useEffect(() => {
    if (!isLoggedIn) {
      setEmail(null);
      return;
    }
    const blah = async () => {
      try {
        const temp = await getEmail();
        setEmail(temp);
      } catch {
        setIsLoggedIn(false);
      }
    };
    void blah();
  }, [isLoggedIn]);
  return { email };
};

export default useEmail;
