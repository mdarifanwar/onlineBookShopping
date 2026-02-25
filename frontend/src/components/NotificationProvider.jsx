import React, { useState, useCallback } from "react";
import NotificationContext from "./NotificationContext";

export const NotificationProvider = ({ children }) => {
  const [notification, setNotificationState] = useState({ show: false, message: "", type: "info" });

  const setNotification = useCallback((message, type = "info") => {
    setNotificationState({ show: true, message, type });
    setTimeout(() => setNotificationState({ show: false, message: "", type }), 1800);
  }, []);

  return (
    <NotificationContext.Provider value={{ ...notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
