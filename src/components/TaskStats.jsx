import React from "react";
import { motion } from "framer-motion";

function TaskStats({ tasks, clearCompleted }) {
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
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

      {tasks.some((t) => t.completed) && (
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
