import { payloadType } from "../../../store/tasksReducer";
import { Task2 } from "../../layout/Task2";
import { v4 as uuidv4 } from "uuid";
import List from "@mui/material/List";

type propsType = {
  tasks: payloadType[];
  status: "todo" | "doing" | "done" | "bin";
};

export const TasksRender = (props: propsType) => {
  return (
    <List>
      {props.tasks.map((task: payloadType) => {
        return (
          <Task2
            moveToToDo={props.status === "doing"}
            moveToDoing={props.status === "todo" || props.status === "done"}
            moveToDone={props.status === "doing"}
            status={task.status}
            taskId={task.taskId}
            content={task.content as string}
            color={task.color as string}
            key={uuidv4()}
          />
        );
      })}
    </List>
  );
};
