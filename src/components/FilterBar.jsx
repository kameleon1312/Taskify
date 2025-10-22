import React from "react";
import { motion } from "framer-motion";

function FilterBar({ filter, setFilter }) {
  return (
    <motion.div
      className="filter-bar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {["all", "active", "completed"].map((type) => (
        <button
          key={type}
          className={filter === type ? "active" : ""}
          onClick={() => setFilter(type)}
        >
          {type === "all"
            ? "Wszystkie"
            : type === "active"
            ? "Aktywne"
            : "Ukończone"}
        </button>
      ))}
    </motion.div>
  );
}

export default FilterBar;
