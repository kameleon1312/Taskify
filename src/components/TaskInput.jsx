import React, { useState } from "react";

function TaskInput({ setTasks }) {
  const [text, setText] = useState("");

  const addTask = () => {
    const value = text.trim();
    if (!value) return;
    setTasks(prev => [...prev, { id: Date.now(), text: value, completed: false }]);
    setText("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Dodaj nowe zadanie..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && addTask()}
      />
      <button onClick={addTask}>Dodaj</button>
    </div>
  );
}

export default TaskInput;