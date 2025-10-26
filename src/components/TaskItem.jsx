// ============================================================
//  TaskItem – Pojedyncze zadanie na liście
// Opis: Wyświetla zadanie z możliwością edycji, ukończenia,
//       usunięcia oraz kolorowym oznaczeniem terminu (deadline).
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function TaskItem({ task, toggleTask, deleteTask, updateTask }) {
  // ==========================================================
  //  Stan lokalny (edycja tekstu)
  // ==========================================================
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  // ==========================================================
  //  Preload audio (raz na komponent)
  // ==========================================================
  const completeSound = useRef(new Audio("/sounds/complete.wav"));
  const deadlineSound = useRef(new Audio("/sounds/deadline.wav"));

  // Ustawienia audio (niski volume, bez opóźnień)
  useEffect(() => {
    completeSound.current.volume = 0.4;
    deadlineSound.current.volume = 0.35;
  }, []);

  // ==========================================================
  //  Status terminu (deadline)
  // ==========================================================
  const today = new Date();
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;

  let statusColor = "";
  if (deadlineDate) {
    if (deadlineDate.toDateString() === today.toDateString()) {
      statusColor = "today"; // 🟠 Dzisiaj
    } else if (deadlineDate < today) {
      statusColor = "overdue"; // 🔴 Po terminie
    } else {
      statusColor = "upcoming"; // 🟢 Nadchodzące
    }
  }

  // ==========================================================
  //  Efekt dźwiękowy przy przekroczeniu terminu
  // ==========================================================
  useEffect(() => {
    if (statusColor === "overdue" && !task.completed) {
      // tylko raz na wejście w stan "po terminie"
      if (!task.alertPlayed) {
        try {
          deadlineSound.current.currentTime = 0;
          deadlineSound.current.play();
        } catch (e) {
          console.warn("🔇 Brak dostępu do audio autoplay:", e);
        }
        task.alertPlayed = true; // znacznik, by nie grało w pętli
      }
    }
  }, [statusColor, task]);

  // ==========================================================
  //  Zapis edycji zadania
  // ==========================================================
  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed !== "") updateTask(task.id, trimmed);
    setIsEditing(false);
  };

  // ==========================================================
  //  Checkbox ukończenia z dźwiękiem
  // ==========================================================
  const handleToggle = () => {
    if (!task.completed) {
      // tylko przy pierwszym oznaczeniu jako ukończone
      try {
        completeSound.current.currentTime = 0;
        completeSound.current.play();
      } catch (e) {
        console.warn("🔇 Nie udało się odtworzyć dźwięku ukończenia:", e);
      }
    }
    toggleTask(task.id);
  };

  // ==========================================================
  //  RENDER
  // ==========================================================
  return (
    <motion.li
      className={`task-item ${task.completed ? "done" : ""} ${statusColor}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      {/*  Checkbox ukończenia */}
      <button
        className="checkbox"
        aria-pressed={task.completed}
        onClick={handleToggle}
        title={task.completed ? "Oznacz jako nieukończone" : "Oznacz jako ukończone"}
      >
        {task.completed ? "✔" : ""}
      </button>

      {/*  Tekst lub pole edycji */}
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

        {/*  Wyświetlanie terminu */}
        {task.deadline && (
          <span className="deadline">
            Termin:{" "}
            {new Date(task.deadline).toLocaleString("pl-PL", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        )}
      </div>

      {/*  Usuń zadanie */}
      <motion.button
        className="remove"
        onClick={() => deleteTask(task.id)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        title="Usuń zadanie"
      >
        ✕
      </motion.button>
    </motion.li>
  );
}

export default TaskItem;