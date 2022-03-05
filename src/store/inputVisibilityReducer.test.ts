import {
  ShowTaskInput,
  HideTaskInput,
  SHOW_TASK_INPUT,
  HIDE_TASK_INPUT,
  stateType,
  inputVisibilityReducer
} from "./inputVisibilityReducer";

let initialState: stateType = { addTaskVisibility: false };

test("should return action", () => {
  expect(ShowTaskInput()).toEqual({ type: SHOW_TASK_INPUT });
});

test("should return action", () => {
  expect(HideTaskInput()).toEqual({ type: HIDE_TASK_INPUT });
});

test("", () => {
  expect(
    inputVisibilityReducer(initialState, { type: SHOW_TASK_INPUT })
  ).toEqual({
    addTaskVisibility: true
  });
});
