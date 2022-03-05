export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const TASK_TRANSFER_DOING = "TASK_TRANSFER_DOING";
export const TASK_TRANSFER_DONE = "TASK_TRANSFER_DONE";
export const TASK_TRANSFER_TODO = "TASK_TRANSFER_TODO";
export const TASK_TRANSFER_BIN = "TASK_TRANSFER_BIN";
export const UPDATE_TODO_TASK = "UPDATE_TODO_TASK";
export const SET_TASKS = "SET_TASKS";
export const CLEAN_BIN = "CLEAN_BIN";

export type payloadType = {
  status: "todo" | "doing" | "done" | "bin";
  destinationStatus?: "todo" | "doing" | "done" | "bin";
  content?: string;
  taskId: string;
  color?: string;
  newTaskContent?: string;
};

export type stateType = {
  todo: payloadType[];
  doing: payloadType[];
  done: payloadType[];
  bin: payloadType[];
};

const initialState: stateType = {
  todo: [] as payloadType[],
  doing: [] as payloadType[],
  done: [] as payloadType[],
  bin: [] as payloadType[]
};

export const taskFilter = (
  state: stateType,
  status: "todo" | "doing" | "done" | "bin",
  taskId: string
) => {
  return state[status].filter((task: payloadType) => {
    return task.taskId !== taskId;
  });
};

export const tasksReducer = (
  state: stateType = initialState,
  action: actionType
) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, todo: [...state.todo, action.payload] };
    case REMOVE_TASK:
      let filteredTasksRemoving = taskFilter(
        state,
        action.payload.status,
        action.payload.taskId
      );
      switch (action.payload.status) {
        case "todo":
          return { ...state, todo: [...filteredTasksRemoving] };
        case "doing":
          return { ...state, doing: [...filteredTasksRemoving] };
        case "done":
          return { ...state, done: [...filteredTasksRemoving] };
        case "bin":
          return { ...state, bin: [...filteredTasksRemoving] };
        default:
          return state;
      }
    case TASK_TRANSFER_DOING:
      let newDoingTask = {
        status: "doing",
        content: action.payload.content,
        taskId: action.payload.taskId,
        color: action.payload.color
      };
      switch (action.payload.status) {
        case "todo":
          return {
            ...state,
            todo: taskFilter(
              state,
              action.payload.status,
              action.payload.taskId
            ),
            doing: [...state.doing, { ...newDoingTask }] as payloadType[]
          };
        case "done":
          return {
            ...state,
            doing: [...state.doing, { ...newDoingTask }] as payloadType[],
            done: taskFilter(
              state,
              action.payload.status,
              action.payload.taskId
            )
          };
        case "bin":
          return {
            ...state,
            doing: [...state.doing, { ...newDoingTask }] as payloadType[],
            bin: taskFilter(state, action.payload.status, action.payload.taskId)
          };
        default:
          return state;
      }
    case TASK_TRANSFER_DONE:
      let newDoneTask = {
        ...action.payload,
        status: "done"
      };
      switch (action.payload.status) {
        case "doing":
          return {
            ...state,
            doing: taskFilter(
              state,
              action.payload.status,
              action.payload.taskId
            ),
            done: [...state.done, { ...newDoneTask }] as payloadType[]
          };
        case "bin":
          return {
            ...state,
            bin: taskFilter(
              state,
              action.payload.status,
              action.payload.taskId
            ),
            done: [...state.done, { ...newDoneTask }] as payloadType[]
          };
        default:
          return state;
      }
    case TASK_TRANSFER_TODO:
      let newToDoTask = {
        status: "todo",
        content: action.payload.content,
        taskId: action.payload.taskId,
        color: action.payload.color
      };
      switch (action.payload.status) {
        case "doing":
          return {
            ...state,
            todo: [...state.todo, { ...newToDoTask }] as payloadType[],
            doing: taskFilter(
              state,
              action.payload.status,
              action.payload.taskId
            )
          };
        case "bin":
          return {
            ...state,
            todo: [...state.todo, { ...newToDoTask }] as payloadType[],
            bin: taskFilter(state, action.payload.status, action.payload.taskId)
          };
        default:
          return state;
      }
    case TASK_TRANSFER_BIN:
      let newBinTask = {
        status: "bin",
        content: action.payload.content,
        taskId: action.payload.taskId,
        color: action.payload.color
      };

      if (action.payload.status === "todo") {
        return {
          ...state,
          bin: [...state.bin, { ...newBinTask }] as payloadType[],
          todo: taskFilter(state, action.payload.status, action.payload.taskId)
        };
      }
      if (action.payload.status === "doing") {
        return {
          ...state,
          bin: [...state.bin, { ...newBinTask }] as payloadType[],
          doing: taskFilter(state, action.payload.status, action.payload.taskId)
        };
      }
      if (action.payload.status === "done") {
        return {
          ...state,
          bin: [...state.bin, { ...newBinTask }] as payloadType[],
          done: taskFilter(state, action.payload.status, action.payload.taskId)
        };
      }
      break;
    case UPDATE_TODO_TASK:
      let updatedTask = {
        status: "todo",
        content: action.payload.newTaskContent,
        taskId: action.payload.taskId,
        color: action.payload.color
      };
      let filteredTasksUpdateTask = taskFilter(
        state,
        "todo",
        action.payload.taskId
      );
      return {
        ...state,
        todo: [...filteredTasksUpdateTask, { ...updatedTask }] as payloadType[]
      };
    case SET_TASKS:
      if (localStorage.getItem("state")) {
        let localStorageState = JSON.parse(
          localStorage.getItem("state") as string
        );
        return localStorageState;
      } else {
        return state;
      }
    case CLEAN_BIN:
      return {
        ...state,
        bin: []
      };
    default:
      return state;
  }
};

export type kandanReducerType = ReturnType<typeof tasksReducer>;

export const AddTask = (payload: payloadType) => {
  return { type: ADD_TASK, payload: payload } as const;
};
export const RemoveTask = (payload: payloadType) => {
  return { type: REMOVE_TASK, payload: payload } as const;
};
export const TaskTransferDoing = (payload: payloadType) => {
  return {
    type: TASK_TRANSFER_DOING,
    payload: {
      status: payload.status,
      taskId: payload.taskId,
      destinationStatus: "doing",
      content: payload.content,
      color: payload.color
    }
  } as const;
};
export const TaskTransferDone = (payload: payloadType) => {
  return {
    type: TASK_TRANSFER_DONE,
    payload: {
      status: payload.status,
      taskId: payload.taskId,
      destinationStatus: "done",
      content: payload.content,
      color: payload.color
    }
  } as const;
};
export const TaskTransferToDo = (payload: payloadType) => {
  return {
    type: TASK_TRANSFER_TODO,
    payload: payload
  } as const;
};
export const TaskTransferBin = (payload: payloadType) => {
  return {
    type: TASK_TRANSFER_BIN,
    payload: {
      status: payload.status,
      taskId: payload.taskId,
      destinationStatus: "bin",
      content: payload.content,
      color: payload.color
    }
  } as const;
};
export const CleanBin = () => {
  return {
    type: CLEAN_BIN
  } as const;
};
export const UpdateTodoTask = (payload: payloadType) => {
  return {
    type: UPDATE_TODO_TASK,
    payload: payload
  } as const;
};
export const SetTasks = () => {
  return {
    type: SET_TASKS
  } as const;
};

type actionType =
  | ReturnType<typeof AddTask>
  | ReturnType<typeof RemoveTask>
  | ReturnType<typeof TaskTransferDoing>
  | ReturnType<typeof TaskTransferDone>
  | ReturnType<typeof TaskTransferToDo>
  | ReturnType<typeof TaskTransferBin>
  | ReturnType<typeof CleanBin>
  | ReturnType<typeof UpdateTodoTask>
  | ReturnType<typeof SetTasks>;
