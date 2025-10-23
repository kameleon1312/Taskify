// ============================================================
//  TaskStats – Statystyki i kontrola zadań
// Opis: Pokazuje liczbę aktywnych zadań oraz przycisk
//       do usuwania ukończonych.
// ============================================================

import React from "react";
import { motion } from "framer-motion";

function TaskStats({ tasks, clearCompleted }) {
  // ==========================================================
  //  Obliczenia
  // ==========================================================
  const activeCount = tasks.filter((t) => !t.completed).length;
  const hasCompleted = tasks.some((t) => t.completed);

  // ==========================================================
  //  RENDER
  // ==========================================================
  return (
    <motion.div
      className="task-stats"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/*  Licznik aktywnych zadań */}
      <span className="task-counter">
        {activeCount === 0
          ? "Brak aktywnych zadań 🎉"
          : `${activeCount} aktywn${activeCount === 1 ? "e" : "ych"} zadań`}
      </span>

      {/*  Przycisk usuwania ukończonych */}
      {hasCompleted && (
        <button
          className="clear-btn"
          onClick={clearCompleted}
          title="Usuń ukończone zadania"
        >
          Usuń ukończone ✕
        </button>
      )}
    </motion.div>
  );
}

export default TaskStats;
