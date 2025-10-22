import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { motion } from "framer-motion";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // nowa funkcja do czyszczenia ukończonych zadań
  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="app">
      <ThemeToggle />
      <h1>Taskify</h1>
      <TaskInput setTasks={setTasks} />

      {/*  Pasek filtrów */}
      <motion.div
        className="filter-bar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Wszystkie
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Aktywne
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Ukończone
        </button>
      </motion.div>

      {/* Licznik + przycisk czyszczenia */}
      <motion.div
        className="task-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="task-counter">
          {activeCount === 0
            ? "Brak aktywnych zadań 🎉"
            : `${activeCount} aktywn${activeCount === 1 ? "e" : "ych"} zadań`}
        </span>

        {tasks.some(t => t.completed) && (
          <button
            className="clear-btn"
            onClick={clearCompleted}
            title="Usuń ukończone zadania"
          >
            Usuń ukończone ✕
          </button>
        )}
      </motion.div>

      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
