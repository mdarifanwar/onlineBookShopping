import React, { useContext, useState, useEffect } from "react";
import NotificationContext from "./NotificationContext";

const notificationColors = {
  info: "#1976d2",
  success: "#43a047",
  error: "#d32f2f",
  warning: "#fbc02d"
};

const notificationIcons = {
  info: 'ℹ️',
  success: '✔️',
  error: '❌',
  warning: '⚠️'
};

const GlobalNotification = () => {
  const { show, message, type, setNotification } = useContext(NotificationContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 400); // match transition duration
    }
  }, [show]);

  if (!show && !visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: show ? 32 : -120,
        left: "50%",
        transform: "translateX(-50%)",
        background: notificationColors[type] || notificationColors.info,
        color: "#fff",
        padding: "18px 44px 18px 26px",
        borderRadius: 18,
        fontSize: 18,
        zIndex: 9999,
        boxShadow: "0 8px 32px #0005, 0 2px 8px #0002",
        minWidth: 280,
        maxWidth: '90vw',
        textAlign: "center",
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontWeight: 500,
        opacity: show ? 1 : 0,
        transition: 'top 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1)',
        border: '1.5px solid #fff3',
        backdropFilter: 'blur(2px)',
      }}
    >
      <span style={{
        fontSize: 26,
        marginRight: 10,
        background: '#fff2',
        borderRadius: 8,
        padding: '2px 8px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 4px #0001',
      }}>{notificationIcons[type] || notificationIcons.info}</span>
      <span style={{ flex: 1, textAlign: 'left', letterSpacing: 0.1 }}>{message}</span>
      <button
        onClick={() => setNotification("", type)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 22,
          cursor: 'pointer',
          marginLeft: 12,
          opacity: 0.6,
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s, opacity 0.2s',
        }}
        aria-label="Close notification"
        onMouseOver={e => e.currentTarget.style.opacity = 1}
        onMouseOut={e => e.currentTarget.style.opacity = 0.6}
      >
        ×
      </button>
    </div>
  );
};

export default GlobalNotification;
