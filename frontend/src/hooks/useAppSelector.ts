import { useSelector } from "react-redux";
import { RootState } from "../stores";

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
