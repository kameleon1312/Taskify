import React from "react";
import { motion } from "framer-motion";

function DataControls({ tasks, setTasks }) {
  return (
    <motion.div
      className="data-controls"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <button
        className="export-btn"
        onClick={() => {
          const blob = new Blob([JSON.stringify(tasks, null, 2)], {
            type: "application/json",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "taskify-tasks.json";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        📤 Eksportuj
      </button>

      <label className="import-label">
        📥 Importuj
        <input
          type="file"
          accept="application/json"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
              try {
                const imported = JSON.parse(event.target.result);
                if (Array.isArray(imported)) {
                  setTasks(imported);
                } else {
                  alert("Nieprawidłowy format pliku JSON 😕");
                }
              } catch {
                alert("Błąd przy wczytywaniu pliku!");
              }
            };
            reader.readAsText(file);
          }}
        />
      </label>
    </motion.div>
  );
}

export default DataControls;
