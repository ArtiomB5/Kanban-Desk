export type stateType = {
  addTaskVisibility: boolean;
};

export const SHOW_TASK_INPUT = "SHOW_TASK_INPUT";
export const HIDE_TASK_INPUT = "HIDE_TASK_INPUT";

const inintialState = {
  addTaskVisibility: false
};

export const inputVisibilityReducer = (
  state: stateType = inintialState,
  action: actionType
): stateType => {
  switch (action.type) {
    case SHOW_TASK_INPUT:
      return { addTaskVisibility: true };
    case HIDE_TASK_INPUT:
      return { addTaskVisibility: false };
    default:
      return state;
  }
};

export const ShowTaskInput = () => {
  return {
    type: SHOW_TASK_INPUT
  } as const;
};

export const HideTaskInput = () => {
  return {
    type: HIDE_TASK_INPUT
  } as const;
};

type actionType =
  | ReturnType<typeof ShowTaskInput>
  | ReturnType<typeof HideTaskInput>;
