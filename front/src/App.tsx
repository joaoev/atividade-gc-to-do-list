import React from "react";
import { TaskForm } from "./components/task-form";
import { TaskList } from "./components/task-list";

const App: React.FC = () => {
  const [refresh, setRefresh] = React.useState(false);

  const refreshTasks = () => setRefresh(!refresh);

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm onTaskAdded={refreshTasks} />
      <TaskList key={refresh.toString()} />
    </div>
  );
};


export default App
