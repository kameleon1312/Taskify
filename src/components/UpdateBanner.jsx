import React from "react";

export default function UpdateBanner({ onUpdate }) {
  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "linear-gradient(135deg, #4D9FFF, #37D67A)",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: "12px",
      fontWeight: "600",
      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      cursor: "pointer",
      animation: "fadeIn 0.4s ease",
      zIndex: 9999
    }}
    onClick={onUpdate}>
      🔄 Nowa wersja Taskiner — kliknij, by odświeżyć
    </div>
  );
}