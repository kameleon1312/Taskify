// ============================================================
//  TASKINER™ APP v4.1
//  Autor: Szymon Pochopień
//  Funkcja: główna struktura aplikacji + SplashScreen component
//  Styl: Ultra Glassmorphism / Neon Productivity
// ============================================================

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen.jsx";
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
  //  🧠 Splash screen state
  // ------------------------------------------------------------
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2,5 sekundy
    return () => clearTimeout(timer);
  }, []);

  // ------------------------------------------------------------
  //  📲 PWA Install Prompt (Android)
  // ------------------------------------------------------------
  useEffect(() => {
    let deferredPrompt;
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const installBtn = document.createElement("button");
      installBtn.textContent = "📲 Zainstaluj Taskiner";
      installBtn.className = "install-btn";
      document.body.appendChild(installBtn);

      installBtn.addEventListener("click", async () => {
        installBtn.remove();
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install: ${outcome}`);
        deferredPrompt = null;
      });
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // ------------------------------------------------------------
  //  🗂️ Lista zadań (LocalStorage)
  // ------------------------------------------------------------
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

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // ============================================================
  //  RENDER APLIKACJI
  // ============================================================
  return (
    <>
      {/* 🔷 SPLASH SCREEN (z komponentu) */}
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>

      {/* 🔹 APP UI */}
      {!loading && (
        <div className="app">
          <ThemeToggle />
          <h1>Taskiner</h1>
          <TaskInput setTasks={setTasks} />
          <FilterBar filter={filter} setFilter={setFilter} />
          <TaskStats tasks={tasks} clearCompleted={clearCompleted} />
          {tasks.length > 0 && <ProgressBar tasks={tasks} />}
          <DataControls tasks={tasks} setTasks={setTasks} />
          <TaskList tasks={filteredTasks} setTasks={setTasks} />
        </div>
      )}
    </>
  );
}

export default App;
