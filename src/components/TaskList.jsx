import React from "react";
import TaskItem from "./TaskItem.jsx";
import { AnimatePresence, motion } from "framer-motion";

function TaskList({ tasks, setTasks }) {
  // 🔹 Zmienianie statusu ukończenia
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 🔹 Usuwanie zadania
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 🔹 Edycja tekstu zadania (inline editing)
  const updateTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

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
            updateTask={updateTask} // 🔹 przekazujemy funkcję do edycji
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default TaskList;