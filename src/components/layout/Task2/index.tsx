import { useState } from "react";
import { MoveToToDo } from "../../utils/MoveToToDo";
import { MoveToDoing } from "../../utils/MoveToDoing";
import { MoveToDone } from "../../utils/MoveToDone";
import { MoveToBin } from "../../utils/MoveToBin";
import { DeleteForever } from "../../utils/DeleteForever";
import { UpdateTask } from "../../UpdateTask";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

type propsType = {
  moveToToDo?: boolean;
  moveToDoing?: boolean;
  moveToDone?: boolean;
  status: "todo" | "doing" | "done" | "bin";
  taskId: string;
  content: string;
  color: string;
};

export const Task2 = (props: propsType) => {
  let [updateInputVisibility, setUpdateInputVisibility] = useState(false);

  let changeTaskClickHandler = () => {
    setUpdateInputVisibility(!updateInputVisibility);
  };

  return (
    <>
      <Card
        style={{
          margin: "15px auto",
          textAlign: "left",
          background: `${props.color}`
        }}
      >
        <CardContent>
          {!updateInputVisibility && (
            <Typography variant="body2" color="text.secondary">
              {props.content}
            </Typography>
          )}
          {updateInputVisibility && (
            <UpdateTask taskId={props.taskId} color={props.color} />
          )}
        </CardContent>
        <CardActions disableSpacing>
          {props.status === "todo" && (
            <Button onClick={changeTaskClickHandler} size="small">
              Edit Task
            </Button>
          )}
          {props.moveToToDo && (
            <MoveToToDo
              status={props.status}
              taskId={props.taskId}
              content={props.content}
              color={props.color}
            />
          )}
          {props.moveToDoing && (
            <MoveToDoing
              status={props.status}
              taskId={props.taskId}
              content={props.content}
              color={props.color}
            />
          )}
          {props.moveToDone && (
            <MoveToDone
              status={props.status}
              taskId={props.taskId}
              content={props.content}
              color={props.color}
            />
          )}
          {props.status === "bin" && (
            <>
              <MoveToToDo
                status={props.status}
                taskId={props.taskId}
                content={props.content}
                color={props.color}
              />
              <MoveToDoing
                status={props.status}
                taskId={props.taskId}
                content={props.content}
                color={props.color}
              />
              <MoveToDone
                status={props.status}
                taskId={props.taskId}
                content={props.content}
                color={props.color}
              />
            </>
          )}
          {props.status === "bin" ? (
            <DeleteForever status={props.status} taskId={props.taskId} />
          ) : (
            <MoveToBin
              status={props.status}
              taskId={props.taskId}
              content={props.content}
              color={props.color}
            />
          )}
        </CardActions>
      </Card>
    </>
  );
};
