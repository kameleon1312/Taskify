// ============================================================
//  TASKINER™ APP v3.1
// Autor: Szymon Pochopień
// Główna struktura aplikacji – zarządzanie stanem i logiką UI
// Styl: Ultra Glassmorphism / Neon Productivity
// ============================================================

import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskStats from "./components/TaskStats.jsx";
import DataControls from "./components/DataControls.jsx";

// ============================================================
//  APP COMPONENT
// ============================================================
function App() {
  // ------------------------------------------------------------
  //  Stan: lista zadań (z LocalStorage)
  // ------------------------------------------------------------
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // ------------------------------------------------------------
  //  Stan: aktywny filtr (all / active / completed)
  // ------------------------------------------------------------
  const [filter, setFilter] = useState("all");

  // ------------------------------------------------------------
  //  Synchronizacja zadań z LocalStorage
  // ------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ------------------------------------------------------------
  //  Filtrowanie i sortowanie (priorytet: najbliższy deadline)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  //  Usuwanie ukończonych zadań
  // ------------------------------------------------------------
  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // ============================================================
  //  RENDER APLIKACJI
  // ============================================================
  return (
    <div className="app">
      {/*  Przełącznik motywu */}
      <ThemeToggle />

      {/*  Tytuł aplikacji */}
      <h1>Taskiner</h1>

      {/*  Pole dodawania zadań */}
      <TaskInput setTasks={setTasks} />

      {/*  Filtry zadań */}
      <FilterBar filter={filter} setFilter={setFilter} />

      {/*  Statystyki zadań */}
      <TaskStats tasks={tasks} clearCompleted={clearCompleted} />

      {/*  Pasek postępu produktywności */}
      {tasks.length > 0 && <ProgressBar tasks={tasks} />}

      {/*  Eksport /  Import danych */}
      <DataControls tasks={tasks} setTasks={setTasks} />

      {/*  Lista zadań */}
      <TaskList tasks={filteredTasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
