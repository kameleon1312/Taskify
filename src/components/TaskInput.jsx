// ============================================================
//  TaskInput – Dodawanie nowych zadań
// Opis: Pozwala użytkownikowi wprowadzić treść zadania i opcjonalny termin.
// ============================================================

import React, { useState } from "react";

function TaskInput({ setTasks }) {
  // ==========================================================
  //  Stan komponentu
  // ==========================================================
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");

  // ==========================================================
  //  Dodawanie nowego zadania
  // ==========================================================
  const addTask = () => {
    const value = text.trim();
    if (!value) return;

    const newTask = {
      id: Date.now(),
      text: value,
      completed: false,
      deadline: deadline || null,
    };

    setTasks((prev) => [...prev, newTask]);
    setText("");
    setDeadline("");
  };

  // ==========================================================
  //  RENDER
  // ==========================================================
  return (
    <div className="task-input">
      {/*  Pole tekstowe */}
      <input
        type="text"
        placeholder="Dodaj nowe zadanie..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        aria-label="Wpisz treść zadania"
      />

      {/* n Pole wyboru daty */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        aria-label="Wybierz termin zadania"
      />

      {/*  Przycisk dodania */}
      <button onClick={addTask} aria-label="Dodaj zadanie">
        ➕ Dodaj
      </button>
    </div>
  );
}

export default TaskInput;
