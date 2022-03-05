import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { AddTask } from "../../store/tasksReducer";
import { useDispatch } from "react-redux";
import { HideTaskInput } from "../../store/inputVisibilityReducer";
import { ColorGenerator } from "../utils/ColorGenerator";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as CONSTS from "../../constants";

export const AddNewTask = () => {
  let dispatch = useDispatch();

  let [textAreaState, setTextAreaState] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaState(event.currentTarget.value);
  };

  const clickHandler = () => {
    if (textAreaState.trim() === "") {
      alert("Please fill in text area");
    } else {
      dispatch(
        AddTask({
          status: "todo",
          content: textAreaState,
          taskId: uuidv4(),
          color: ColorGenerator()
        })
      );
      setTextAreaState("");
      dispatch(HideTaskInput());
    }
    setOpen(false);
  };
  return (
    <div>
      <div
        style={{
          cursor: "pointer"
        }}
        onClick={handleOpen}
      >
        <ListItem button>
          <ListItemText primary={"Add Task"} />
        </ListItem>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50vh",
            left: "50vw",
            transform: "translate(-50%, -50%)",
            width: "75vw",
            height: "75vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Typography gutterBottom component="div">
            {CONSTS.TYPORGAPHY_CONSTANTS.ADD_A_NEW_TASK}
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="New Task"
            multiline
            rows={6}
            value={textAreaState}
            onChange={onChangeHandler}
            style={{ width: "90%" }}
          />
          <Button
            variant="contained"
            onClick={clickHandler}
            style={{ marginTop: "10px" }}
          >
            {CONSTS.TYPORGAPHY_CONSTANTS.ADD_TASK}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
