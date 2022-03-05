import { payloadType } from "../../../store/tasksReducer";
import { TasksRender } from "../../utils/TasksRender";
import List from "@mui/material/List";

type propsType = {
  tasks: payloadType[];
  visibility: boolean;
  status: "todo" | "doing" | "done" | "bin";
};

export const ReadinessStage = (props: propsType) => {
  return (
    <List
      sx={{ width: "80vw", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      style={{ margin: "0 auto" }}
    >
      <TasksRender tasks={props.tasks} status={props.status} />
    </List>
  );
};
