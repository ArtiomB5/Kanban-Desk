import { SetTasks as SetTasksAC } from "../../../store/tasksReducer";
import { useDispatch } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export const SetTasks = () => {
  let dispatch = useDispatch();

  let onClickHandler = () => {
    dispatch(SetTasksAC());
  };

  return (
    <ListItem button onClick={onClickHandler}>
      <ListItemText primary={"Set Saved Tasks"} />
    </ListItem>
  );
};
