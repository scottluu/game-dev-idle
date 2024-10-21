import useLocalStorage from "./UseLocalStorage";

const useLastSave = () => {
  const { value, setter } = useLocalStorage<string>("lastSave");
  const lastSave = value === null ? 0 : Number.parseFloat(value);
  const setLastSave = (val: number) => {
    setter(val.toString());
  };

  return { lastSave, setLastSave };
};
export default useLastSave;
