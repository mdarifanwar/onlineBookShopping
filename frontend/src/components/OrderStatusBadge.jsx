import React from "react";

const OrderStatusBadge = ({ status }) => {
  let color = "#888";
  let label = status;
  if (status === "Delivered") {
    color = "#388e3c";
  } else if (status === "Paving") {
    color = "#fbc02d";
  }
  return (
    <span style={{ color, fontWeight: 600, background: "#f5f5f5", borderRadius: 4, padding: "2px 10px", fontSize: 14 }}>{label}</span>
  );
};

export default OrderStatusBadge;
