import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
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

  // Filtracja zadań
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filteredTasks.sort((a, b) => {
  if (!a.deadline) return 1;
  if (!b.deadline) return -1;
  return new Date(a.deadline) - new Date(b.deadline);
});

  // Usuwanie ukończonych
  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="app">
      <ThemeToggle />
      <h1>Taskify</h1>

      {/* Pole dodawania zadań */}
      <TaskInput setTasks={setTasks} />

      {/* Pasek filtrów */}
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

      {/* Statystyki produktywności */}
      {tasks.length > 0 && (
        <motion.div
          className="progress-section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <ProgressBar tasks={tasks} />
        </motion.div>
      )}

      {/* Eksport / Import */}
      <motion.div
        className="data-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <button
          className="export-btn"
          onClick={() => {
            const blob = new Blob([JSON.stringify(tasks, null, 2)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "taskify-tasks.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          📤 Eksportuj
        </button>

        <label className="import-label">
          📥 Importuj
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (event) => {
                try {
                  const imported = JSON.parse(event.target.result);
                  if (Array.isArray(imported)) {
                    setTasks(imported);
                  } else {
                    alert("Nieprawidłowy format pliku JSON 😕");
                  }
                } catch {
                  alert("Błąd przy wczytywaniu pliku!");
                }
              };
              reader.readAsText(file);
            }}
          />
        </label>
      </motion.div>

      {/* Lista zadań */}
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
