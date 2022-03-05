import { useDispatch } from "react-redux";
import {
  ShowTaskInput,
  HideTaskInput
} from "../../../store/inputVisibilityReducer";
import Fab from "@mui/material/Fab";

type propsType = {
  visibility: boolean;
};

export const ShowInput = (props: propsType) => {
  let dispatch = useDispatch();

  let clickHandler = () => {
    if (props.visibility) {
      dispatch(HideTaskInput());
    }
    if (!props.visibility) {
      dispatch(ShowTaskInput());
    }
  };

  return (
    <Fab
      style={{
        position: "fixed",
        right: "1vw",
        top: "20vh"
      }}
      onClick={clickHandler}
      size={"small"}
    >
      {'Add New Task'}
    </Fab>
  );
};
