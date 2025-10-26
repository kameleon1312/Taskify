// ============================================================
//  TaskInput – Dodawanie nowych zadań z terminem i godziną
//  Autor: Szymon Pochopień
//  Opis: Pozwala użytkownikowi wprowadzić treść zadania oraz
//         opcjonalny termin z godziną wykonania.
// ============================================================

import React, { useState } from "react";

function TaskInput({ setTasks }) {
  // ==========================================================
  //  Stan komponentu
  // ==========================================================
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // ==========================================================
  //  Dodawanie nowego zadania
  // ==========================================================
  const addTask = () => {
    const value = text.trim();
    if (!value) return;

    // Jeśli użytkownik wybrał datę i godzinę → łączymy w pełny ISO string
    let deadline = null;
    if (date) {
      deadline = time ? `${date}T${time}` : `${date}T00:00`;
    }

    const newTask = {
      id: Date.now(),
      text: value,
      completed: false,
      deadline: deadline ? new Date(deadline).toISOString() : null,
    };

    setTasks((prev) => [...prev, newTask]);
    setText("");
    setDate("");
    setTime("");
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

      {/*  Sekcja daty i godziny */}
      <div className="datetime-inputs">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Wybierz datę zadania"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-label="Wybierz godzinę zadania"
        />
      </div>

      {/*  Przycisk dodania */}
      <button onClick={addTask} aria-label="Dodaj zadanie">
        ➕ Dodaj
      </button>
    </div>
  );
}

export default TaskInput;
