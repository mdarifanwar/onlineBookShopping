import React from "react";

const Message = ({ children }) => {
  return (
    <div style={{ color: "red", marginTop: 10 }}>
      {children}
    </div>
  );
};

export default Message;