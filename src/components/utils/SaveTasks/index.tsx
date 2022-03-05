import { useSelector } from "react-redux";
import { rootReducerType } from "../../../store";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export const SaveTasks = () => {
  const state = useSelector((state: rootReducerType) => state.tasksReducer);

  let onClickHandler = () => {
    let strState = JSON.stringify(state);
    localStorage.setItem("state", strState);
    console.log(localStorage.getItem("state"));
  };

  return (
    <ListItem button onClick={onClickHandler}>
      <ListItemText primary={"Save Tasks"} />
    </ListItem>
  );
};
