import { useDispatch } from "react-redux";
import { AppDispatch } from "../stores";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
