import { RemoveTask } from "../../../store/tasksReducer";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

type propsType = {
  status: "todo" | "doing" | "done";
  taskId: string;
};

export const DeleteForever = (props: propsType) => {
  let dispatch = useDispatch();

  let onClickHandler = () => {
    dispatch(
      RemoveTask({
        status: props.status,
        taskId: props.taskId
      })
    );
  };

  return (
    <Button onClick={onClickHandler} size="small">
      Delete Forever
    </Button>
  );
};
