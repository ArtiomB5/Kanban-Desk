import "./styles.css";
import { Kanban3 } from "./components/Kanban3";
import { useSelector } from "react-redux";
import { rootReducerType } from "./store";

export default function App() {
  const state = useSelector((state: rootReducerType) => state.tasksReducer);
  const inputVisibility = useSelector(
    (state: rootReducerType) => state.inputVisibilityReducer
  );
  return (
    <div className="App">
      <Kanban3 kanbanState={state} inputVisibility={inputVisibility} />
    </div>
  );
}
