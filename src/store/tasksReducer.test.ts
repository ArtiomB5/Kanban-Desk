import {
  RemoveTask,
  stateType,
  taskFilter,
  REMOVE_TASK,
  TASK_TRANSFER_DOING,
  TASK_TRANSFER_DONE,
  TASK_TRANSFER_TODO,
  tasksReducer,
  TaskTransferDoing,
  TaskTransferDone,
  TaskTransferToDo,
  UpdateTodoTask,
  UPDATE_TODO_TASK,
  TaskTransferBin,
  TASK_TRANSFER_BIN
} from "./tasksReducer";

let initialState: stateType = { todo: [], doing: [], done: [], bin: [] };

beforeEach(() => {
  initialState.todo = [
    {
      status: "todo",
      content: "Todo Task 1",
      taskId: "id001",
      color: "lightgreen"
    },
    {
      status: "todo",
      content: "Todo Task 2",
      taskId: "id003",
      color: "lightgreen"
    },
    {
      status: "todo",
      content: "Todo Task 3",
      taskId: "id004",
      color: "lightgreen"
    }
  ];
  initialState.doing = [
    {
      status: "doing",
      content: "Doing Task 2",
      taskId: "id002",
      color: "lightgreen"
    }
  ];
  initialState.bin = [
    {
      status: "bin",
      content: "Removed Task 1",
      taskId: "idrt001",
      color: "lightgreen"
    }
  ];
});

test("should return task remove action", () => {
  expect(
    RemoveTask({ status: "todo", taskId: "id001", color: "lightgreen" })
  ).toEqual({
    type: REMOVE_TASK,
    payload: { status: "todo", taskId: "id001", color: "lightgreen" }
  });
});

test("taskFilter should remove task by taskId from array", () => {
  expect(taskFilter(initialState, "todo", "id001").length).toBe(2);
  expect(taskFilter(initialState, "todo", "id001")[0]).toEqual({
    status: "todo",
    content: "Todo Task 2",
    taskId: "id003",
    color: "lightgreen"
  });
  expect(taskFilter(initialState, "todo", "id001")[1]).toEqual({
    status: "todo",
    content: "Todo Task 3",
    taskId: "id004",
    color: "lightgreen"
  });
  expect(initialState.doing[0]).toEqual({
    status: "doing",
    content: "Doing Task 2",
    taskId: "id002",
    color: "lightgreen"
  });
});

test("should remove task with 'id001' from 'todo' task list", () => {
  const resultState = tasksReducer(initialState, {
    type: REMOVE_TASK,
    payload: { status: "todo", taskId: "id001", color: "lightgreen" }
  });
  expect(resultState.todo.length).toBe(2);
  expect(resultState.doing.length).toBe(1);
  expect(resultState.done.length).toBe(0);
  expect(resultState.todo[0]).toEqual({
    status: "todo",
    content: "Todo Task 2",
    taskId: "id003",
    color: "lightgreen"
  });
  expect(resultState.todo[1]).toEqual({
    status: "todo",
    content: "Todo Task 3",
    taskId: "id004",
    color: "lightgreen"
  });
  expect(resultState.doing[0]).toEqual({
    status: "doing",
    content: "Doing Task 2",
    taskId: "id002",
    color: "lightgreen"
  });
});

test("sholud return action for transfering from 'todo' list to 'doing' list", () => {
  expect(
    TaskTransferDoing({
      status: "todo",
      taskId: "id001",
      content: "Todo Task 1",
      color: "lightgreen"
    })
  ).toEqual({
    type: TASK_TRANSFER_DOING,
    payload: {
      status: "todo",
      taskId: "id001",
      destinationStatus: "doing",
      content: "Todo Task 1",
      color: "lightgreen"
    }
  });
});

test("sholud transfer task from 'todo' list to 'doing' list", () => {
  const resultState = tasksReducer(initialState, {
    type: TASK_TRANSFER_DOING,
    payload: {
      status: "todo",
      taskId: "id001",
      destinationStatus: "doing",
      content: "Todo Task 1",
      color: "lightgreen"
    }
  });
  expect(resultState.todo.length).toBe(2);
  expect(resultState.doing.length).toBe(2);
  expect(resultState.doing[1]).toEqual({
    status: "doing",
    content: "Todo Task 1",
    taskId: "id001",
    color: "lightgreen"
  });
});

test("sholud return action for transfering from 'doing' list to 'done' list", () => {
  expect(
    TaskTransferDone({
      status: "doing",
      taskId: "id002",
      content: "Doing Task 2",
      color: "lightgreen"
    })
  ).toEqual({
    type: TASK_TRANSFER_DONE,
    payload: {
      status: "doing",
      taskId: "id002",
      destinationStatus: "done",
      content: "Doing Task 2",
      color: "lightgreen"
    }
  });
});

test("sholud transfer task from 'doing' list to 'done' list", () => {
  const resultState = tasksReducer(initialState, {
    type: TASK_TRANSFER_DONE,
    payload: {
      status: "doing",
      taskId: "id002",
      destinationStatus: "done",
      content: "Doing Task 2",
      color: "lightgreen"
    }
  });
  expect(resultState.todo.length).toBe(3);
  expect(resultState.doing.length).toBe(0);
  expect(resultState.done.length).toBe(1);
  expect(resultState.done[0]).toEqual({
    status: "done",
    content: "Doing Task 2",
    destinationStatus: "done",
    taskId: "id002",
    color: "lightgreen"
  });
});
test("sholud return action for transfering from 'doing' list to 'todo' list", () => {
  expect(
    TaskTransferToDo({
      status: "doing",
      content: "Doing Task 2",
      taskId: "id002",
      color: "lightgreen"
    })
  ).toEqual({
    type: TASK_TRANSFER_TODO,
    payload: {
      status: "doing",
      content: "Doing Task 2",
      taskId: "id002",
      color: "lightgreen"
    }
  });
});
test("sholud return action for task updating", () => {
  expect(
    UpdateTodoTask({
      status: "todo",
      newTaskContent: "Updated Todo Task 1",
      taskId: "id001",
      color: "lightgreen"
    })
  ).toEqual({
    type: UPDATE_TODO_TASK,
    payload: {
      status: "todo",
      newTaskContent: "Updated Todo Task 1",
      taskId: "id001",
      color: "lightgreen"
    }
  });
});
test("sholud return action for task transfer to recycle bin", () => {
  expect(
    TaskTransferBin({
      status: "todo",
      content: "Updated Todo Task 1",
      taskId: "id001",
      color: "lightgreen"
    })
  ).toEqual({
    type: TASK_TRANSFER_BIN,
    payload: {
      status: "todo",
      taskId: "id001",
      destinationStatus: "bin",
      content: "Updated Todo Task 1",
      color: "lightgreen"
    }
  });
});
test("sholud transfer task from 'doing' list to 'recycle bin'", () => {
  const resultState = tasksReducer(initialState, {
    type: TASK_TRANSFER_BIN,
    payload: {
      status: "doing",
      taskId: "id002",
      destinationStatus: "bin",
      content: "Doing Task 2",
      color: "lightgreen"
    }
  });
  expect(resultState.doing.length).toBe(0);
  expect(resultState.bin.length).toBe(2);
  expect(resultState.bin[1]).toEqual({
    status: "bin",
    content: "Doing Task 2",
    taskId: "id002",
    color: "lightgreen"
  });
});
