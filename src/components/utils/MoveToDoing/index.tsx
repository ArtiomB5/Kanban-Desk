import { useDispatch } from "react-redux";
import { TaskTransferDoing } from "../../../store/tasksReducer";
import Button from "@mui/material/Button";

type propsType = {
  status: "todo" | "doing" | "done" | "bin";
  taskId: string;
  content: string;
  color: string;
};

export const MoveToDoing = (props: propsType) => {
  let dispatch = useDispatch();

  let onClickHandler = () => {
    dispatch(
      TaskTransferDoing({
        status: props.status,
        taskId: props.taskId,
        content: props.content,
        color: props.color
      })
    );
  };

  return (
    <Button onClick={onClickHandler} size="small">
      Task in progress
    </Button>
  );
};
