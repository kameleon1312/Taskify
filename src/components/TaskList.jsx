// ============================================================
//  TaskList – Lista wszystkich zadań
// Opis: Renderuje kolekcję zadań, pozwala na ich edycję,
//       usuwanie oraz oznaczanie jako ukończone.
// ============================================================

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, setTasks }) {
  // ==========================================================
  //  Zmiana statusu ukończenia zadania
  // ==========================================================
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ==========================================================
  //  Usuwanie zadania
  // ==========================================================
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ==========================================================
  //  Edycja tekstu zadania (inline editing)
  // ==========================================================
  const updateTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // ==========================================================
  //  Widok pustej listy
  // ==========================================================
  if (tasks.length === 0) {
    return (
      <motion.p
        className="empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Brak zadań 🎯
      </motion.p>
    );
  }

  // ==========================================================
  //  RENDER LISTY
  // ==========================================================
  return (
    <motion.ul
      className="task-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default TaskList;
