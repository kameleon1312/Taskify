// ============================================================
//  SplashScreen – Ekran startowy aplikacji Taskiner
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import "../styles/splash.scss";

export default function SplashScreen() {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.h1
        className="splash-logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        Taskiner<span>™</span>
      </motion.h1>

      <motion.p
        className="splash-tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        Organize smarter. Work cleaner.
      </motion.p>

      <motion.div
        className="splash-loader"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.5, duration: 1.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
