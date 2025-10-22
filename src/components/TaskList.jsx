import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, setTasks }) {
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  if (tasks.length === 0) {
    return (
      <motion.p
        className="empty"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Brak zadań 🎯
      </motion.p>
    );
  }

  return (
    <motion.ul
      className="task-list"
      layout
      transition={{ type: "spring", damping: 18, stiffness: 120 }}
    >
      <AnimatePresence>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default TaskList;