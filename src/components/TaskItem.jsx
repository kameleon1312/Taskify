import React from "react";
import { motion } from "framer-motion";

function TaskItem({ task, toggleTask, deleteTask }) {
  
  return (
    <motion.li
      className={`task-item ${task.completed ? "done" : ""}`}
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <button
        className="checkbox"
        aria-pressed={task.completed}
        onClick={() => toggleTask(task.id)}
      >
        {task.completed ? "✔" : ""}
      </button>

      <span className="text" onClick={() => toggleTask(task.id)}>
        {task.text}
      </span>

      <motion.button
        className="remove"
        onClick={() => deleteTask(task.id)}
        whileHover={{ scale: 1.2, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
      >
        ✕
      </motion.button>
    </motion.li>
  );
}

export default TaskItem;
