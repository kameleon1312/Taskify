import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskStats from "./components/TaskStats.jsx";
import DataControls from "./components/DataControls.jsx";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    });

  const clearCompleted = () =>
    setTasks((prev) => prev.filter((task) => !task.completed));

  return (
    <div className="app">
      <ThemeToggle />
      <h1>Taskify</h1>
      <TaskInput setTasks={setTasks} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <TaskStats tasks={tasks} clearCompleted={clearCompleted} />
      {tasks.length > 0 && <ProgressBar tasks={tasks} />}
      <DataControls tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;

