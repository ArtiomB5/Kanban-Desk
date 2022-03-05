import { createStore, combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { inputVisibilityReducer } from "./inputVisibilityReducer";

export const rootReducer = combineReducers({
  tasksReducer,
  inputVisibilityReducer
});

export type rootReducerType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools());
