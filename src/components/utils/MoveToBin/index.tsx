import { useDispatch } from "react-redux";
import { TaskTransferBin } from "../../../store/tasksReducer";
import Button from "@mui/material/Button";

type propsType = {
  status: "todo" | "doing" | "done" | "bin";
  taskId: string;
  content: string;
  color: string;
};

export const MoveToBin = (props: propsType) => {
  let dispatch = useDispatch();

  let onClickHandler = () => {
    dispatch(
      TaskTransferBin({
        status: props.status,
        taskId: props.taskId,
        content: props.content,
        color: props.color
      })
    );
  };

  return (
    <Button onClick={onClickHandler} size="small" style={{ color: "red" }}>
      Delete
    </Button>
  );
};
