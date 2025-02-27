import React from "react";
import TaskList from "./Components/TaskList";

import "./App.css";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <div className='root'>
      <TaskList tasks={[]}/>
    </div>
  );
};

export default App;
