import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";

function ProgressBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const [displayPercent, setDisplayPercent] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ width: `${percent}%` });
    let current = displayPercent;

    const interval = setInterval(() => {
      if (current < percent) {
        current += 1;
        setDisplayPercent(current);
      } else if (current > percent) {
        current -= 1;
        setDisplayPercent(current);
      } else clearInterval(interval);
    }, 10);

    // wystrzał konfetti tylko gdy osiągniesz 100%
    if (percent === 100 && total > 0) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    return () => clearInterval(interval);
  }, [percent, total]);

  return (
    <>
      <div className="progress-header">
        <span>Postęp dnia</span>
        <motion.span
          key={displayPercent}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {displayPercent}%
        </motion.span>
      </div>

      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* zachowujemy Twoje 3 statystyki */}
      <div className="progress-stats">
        <span>🧩 Wszystkie: <strong>{total}</strong></span>
        <span>✅ Ukończone: <strong>{completed}</strong></span>
        <span>🚀 Aktywne: <strong>{active}</strong></span>
      </div>
    </>
  );
}

export default ProgressBar;
