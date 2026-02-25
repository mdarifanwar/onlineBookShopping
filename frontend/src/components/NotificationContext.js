import React from "react";

const NotificationContext = React.createContext({
  show: false,
  message: "",
  type: "info",
  setNotification: () => {},
});

export default NotificationContext;
