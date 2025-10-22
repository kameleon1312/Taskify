import React from "react";

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <button className="checkbox" onClick={() => toggleTask(task.id)}>
        {task.completed ? "✔" : ""}
      </button>
      <span className="text" onClick={() => toggleTask(task.id)}>
        {task.text}
      </span>
      <button className="remove" onClick={() => deleteTask(task.id)}>
        ✕
      </button>
    </li>
  );
}

export default TaskItem;