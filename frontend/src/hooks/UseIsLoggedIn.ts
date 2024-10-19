import useLocalStorage from "./UseLocalStorage";

const useIsLoggedIn = () => {
  const { value: flag, setter } = useLocalStorage<string>("isLoggedIn");
  const isLoggedIn = flag !== null;
  const setIsLoggedIn = (val: boolean) => {
    if (val) {
      setter("true");
    } else {
      setter(null);
    }
  };

  return { isLoggedIn, setIsLoggedIn };
};

export default useIsLoggedIn;
