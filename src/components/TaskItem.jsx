import React from "react";
import { motion } from "framer-motion";

function TaskItem({ task, toggleTask, deleteTask }) {
  const today = new Date();
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;

  //  ustal kolor statusu
  let statusColor = "";
  if (deadlineDate) {
    if (deadlineDate.toDateString() === today.toDateString()) {
      statusColor = "today"; // 🟠 dziś
    } else if (deadlineDate < today) {
      statusColor = "overdue"; // 🔴 po terminie
    } else {
      statusColor = "upcoming"; // 🟢 przed terminem
    }
  }

  return (
    <motion.li
      className={`task-item ${task.completed ? "done" : ""} ${statusColor}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      <button
        className="checkbox"
        aria-pressed={task.completed}
        onClick={() => toggleTask(task.id)}
      >
        {task.completed ? "✔" : ""}
      </button>

      <div className="text-area">
        <span className="text" onClick={() => toggleTask(task.id)}>
          {task.text}
        </span>

        {/* pokazujemy datę, jeśli istnieje */}
        {task.deadline && (
          <small className="deadline">
            Termin: {new Date(task.deadline).toLocaleDateString()}
          </small>
        )}
      </div>

      <motion.button
        className="remove"
        onClick={() => deleteTask(task.id)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        ✕
      </motion.button>
    </motion.li>
  );
}

export default TaskItem;
