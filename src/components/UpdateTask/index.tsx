import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { UpdateTodoTask } from "../../store/tasksReducer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type propsType = {
  taskId: string;
  color: string;
};

export const UpdateTask = (props: propsType) => {
  let dispatch = useDispatch();

  let [inputValue, setInputValue] = useState("");

  let changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  let clickHandler = () => {
    dispatch(
      UpdateTodoTask({
        status: "todo",
        taskId: props.taskId,
        newTaskContent: inputValue,
        color: props.color
      })
    );
  };

  return (
    <>
      <TextField
        variant="outlined"
        value={inputValue}
        onChange={changeHandler}
      />
      <br />
      <Button variant="contained" onClick={clickHandler}>
        Accept Сhanges
      </Button>
    </>
  );
};
