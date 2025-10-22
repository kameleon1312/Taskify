import React, { useState } from "react";

function TaskInput({ setTasks }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState(""); // 🔹 nowy stan

  const addTask = () => {
    const value = text.trim();
    if (!value) return;

    const newTask = {
      id: Date.now(),
      text: value,
      completed: false,
      deadline: deadline || null, // jeśli brak daty, zostaje null
    };

    setTasks(prev => [...prev, newTask]);
    setText("");
    setDeadline("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Dodaj nowe zadanie..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && addTask()}
        aria-label="Wpisz treść zadania"
      />

      {/* 🔹 nowe pole wyboru daty */}
      <input
        type="date"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        aria-label="Wybierz termin"
      />

      <button onClick={addTask} aria-label="Dodaj zadanie">
        Dodaj
      </button>
    </div>
  );
}

export default TaskInput;
