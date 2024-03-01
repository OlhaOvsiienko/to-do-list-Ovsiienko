import React from "react";
import TaskList from "./Components/TaskList";
import TaskItem from "./Components/TaskItem";
import "./App.css";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <TaskList />
      <TaskItem />
    </div>
  );
};

export default App;
