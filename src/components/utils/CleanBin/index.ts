import { CleanBin as CleanBinAC } from "../../../store/tasksReducer";
import { useDispatch } from "react-redux";

export const CleanBin = () => {
  let dispatch = useDispatch();

  let cleanBinClickHandler = () => {
    dispatch(CleanBinAC());
  };

  return cleanBinClickHandler;
};
