import * as React from "react";
import { useDispatch } from "react-redux";
import { AddNewTask } from "../AddNewTask";
import { stateType as tasksStateType } from "../../store/tasksReducer";
import { stateType as visibilityStateType } from "../../store/inputVisibilityReducer";
import { ReadinessStage } from "../utils/ReadinessStage";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SaveTasks } from "../utils/SaveTasks";
import { SetTasks } from "../utils/SetTasks";
import Badge from "@mui/material/Badge";
import { CleanBin as CleanBinAC } from "../../store/tasksReducer";
import * as CONSTS from "../../constants";

type propsType = {
  kanbanState: tasksStateType;
  inputVisibility: visibilityStateType;
};

const drawerWidth = 240;

export const Kanban3 = (props: propsType) => {
  let [visibility, setVisibility] = React.useState({
    todo: true,
    doing: false,
    done: false,
    bin: false,
  });

  let onClickHandler = (status: "todo" | "doing" | "done" | "bin") => {
    if (status === "todo") {
      setVisibility({
        todo: true,
        doing: false,
        done: false,
        bin: false,
      });
    }
    if (status === "doing") {
      setVisibility({
        todo: false,
        doing: true,
        done: false,
        bin: false,
      });
    }
    if (status === "done") {
      setVisibility({
        todo: false,
        doing: false,
        done: true,
        bin: false,
      });
    }
    if (status === "bin") {
      setVisibility({
        todo: false,
        doing: false,
        done: false,
        bin: true,
      });
    }
  };

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let dispatch = useDispatch();

  let cleanBinClickHandler = () => {
    dispatch(CleanBinAC());
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Typography variant="h6" noWrap component="div">
        {CONSTS.TYPORGAPHY_CONSTANTS.TASK_STATUS}
      </Typography>
      <List>
        <ListItem button onClick={() => onClickHandler("todo")}>
          <Badge badgeContent={props.kanbanState.todo.length} color="secondary">
            <ListItemText primary={"To Do"} />
          </Badge>
        </ListItem>
        <ListItem button onClick={() => onClickHandler("doing")}>
          <Badge
            badgeContent={props.kanbanState.doing.length}
            color="secondary"
          >
            <ListItemText primary={"Doing"} />
          </Badge>
        </ListItem>
        <ListItem button onClick={() => onClickHandler("done")}>
          <Badge badgeContent={props.kanbanState.done.length} color="secondary">
            <ListItemText primary={"Done"} />
          </Badge>
        </ListItem>
        <ListItem button onClick={() => onClickHandler("bin")}>
          <Badge badgeContent={props.kanbanState.bin.length} color="secondary">
            <ListItemText primary={"Recycle Bin"} />
          </Badge>
        </ListItem>
      </List>
      <Divider />
      <Typography variant="h6" noWrap component="div">
        {CONSTS.TYPORGAPHY_CONSTANTS.ADDING_A_TASK}
      </Typography>
      <AddNewTask />
      <Divider />
      <Typography variant="h6" noWrap component="div">
        {CONSTS.TYPORGAPHY_CONSTANTS.TASKS_MANAGEMENT}
      </Typography>
      <List>
        <SaveTasks />
        <SetTasks />
        {visibility.bin && (
          <ListItem button onClick={cleanBinClickHandler}>
            <Badge
              badgeContent={props.kanbanState.bin.length}
              color="secondary"
            >
              <ListItemText primary={"Empty Recycle Bin"} />
            </Badge>
          </ListItem>
        )}
      </List>
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `100% ` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {"Menu"}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {CONSTS.TYPORGAPHY_CONSTANTS.KANBAN_DESK}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 0 }}
        aria-label="mailbox folders"
      >
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 0,
          p: 1,
        }}
      >
        <Toolbar />
        {visibility.todo && (
          <ReadinessStage
            tasks={props.kanbanState.todo}
            visibility={props.inputVisibility.addTaskVisibility}
            status={"todo"}
          />
        )}
        {visibility.doing && (
          <ReadinessStage
            tasks={props.kanbanState.doing}
            visibility={props.inputVisibility.addTaskVisibility}
            status={"doing"}
          />
        )}
        {visibility.done && (
          <ReadinessStage
            tasks={props.kanbanState.done}
            visibility={props.inputVisibility.addTaskVisibility}
            status={"done"}
          />
        )}
        {visibility.bin && (
          <ReadinessStage
            tasks={props.kanbanState.bin}
            visibility={props.inputVisibility.addTaskVisibility}
            status={"bin"}
          />
        )}
      </Box>
    </Box>
  );
};
