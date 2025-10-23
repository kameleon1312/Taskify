// ============================================================
//  DataControls – Eksport i import zadań
// Opis: Umożliwia zapisanie lub wczytanie listy zadań w formacie JSON
// ============================================================

import React from "react";
import { motion } from "framer-motion";

function DataControls({ tasks, setTasks }) {
  // ==========================================================
  //  Funkcja eksportu – tworzy plik JSON z aktualnymi zadaniami
  // ==========================================================
  const handleExport = () => {
    try {
      const blob = new Blob([JSON.stringify(tasks, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "taskify-tasks.json";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("❌ Błąd podczas eksportowania danych!");
    }
  };

  // ==========================================================
  //  Funkcja importu – wczytuje plik JSON i aktualizuje stan aplikacji
  // ==========================================================
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setTasks(imported);
        } else {
          alert("⚠️ Nieprawidłowy format pliku JSON.");
        }
      } catch (error) {
        console.error("Import failed:", error);
        alert("❌ Błąd przy wczytywaniu pliku.");
      }
    };
    reader.readAsText(file);
  };

  // ==========================================================
  //  RENDER
  // ==========================================================
  return (
    <motion.div
      className="data-controls"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {/* Eksport przycisk */}
      <button className="export-btn" onClick={handleExport}>
        📤 Eksportuj
      </button>

      {/* Import przycisk */}
      <label className="import-label">
        📥 Importuj
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
        />
      </label>
    </motion.div>
  );
}

export default DataControls;
