import React, { useState } from "react";
import { motion } from "framer-motion";

function TaskItem({ task, toggleTask, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const today = new Date();
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;

  // 🔹 Ustal status koloru (deadline)
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

  // 🔹 Zapis edycji
  const handleSave = () => {
    if (editText.trim() !== "") {
      updateTask(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  return (
    <motion.li
      className={`task-item ${task.completed ? "done" : ""} ${statusColor}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      {/* Checkbox */}
      <button
        className="checkbox"
        aria-pressed={task.completed}
        onClick={() => toggleTask(task.id)}
      >
        {task.completed ? "✔" : ""}
      </button>

      {/* Tekst lub pole edycji */}
      <div className="text-area">
        {isEditing ? (
          <motion.input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.span
            className="text"
            onClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15 }}
          >
            {task.text}
          </motion.span>
        )}

        {/* 🔹 Termin (jeśli ustawiony) */}
        {task.deadline && (
          <small className="deadline">
            Termin: {new Date(task.deadline).toLocaleDateString()}
          </small>
        )}
      </div>

      {/* Usuń zadanie */}
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