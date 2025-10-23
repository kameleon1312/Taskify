// ============================================================
//  FilterBar – Pasek filtrów zadań
// Opis: Pozwala użytkownikowi przełączać widok między
//       wszystkimi, aktywnymi i ukończonymi zadaniami.
// ============================================================

import React from "react";
import { motion } from "framer-motion";

function FilterBar({ filter, setFilter }) {
  // ==========================================================
  // Definicja dostępnych filtrów
  // ==========================================================
  const filters = [
    { type: "all", label: "Wszystkie" },
    { type: "active", label: "Aktywne" },
    { type: "completed", label: "Ukończone" },
  ];

  // ==========================================================
  //  RENDER
  // ==========================================================
  return (
    <motion.div
      className="filter-bar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {filters.map(({ type, label }) => (
        <button
          key={type}
          className={filter === type ? "active" : ""}
          onClick={() => setFilter(type)}
          aria-pressed={filter === type}
        >
          {label}
        </button>
      ))}
    </motion.div>
  );
}

export default FilterBar;
