import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 32, textAlign: "center" }}>
      <h2>Thank you for your order!</h2>
      {orderId && <div style={{ margin: "18px 0", fontSize: 18 }}>Your order ID: <b>#{orderId.slice(-7)}</b></div>}
      <p>Your order has been placed successfully. You will receive an email confirmation soon.</p>
      <Link to="/" style={{ display: "inline-block", marginTop: 24, background: "#1976d2", color: "#fff", borderRadius: 4, padding: "10px 28px", fontWeight: 600, fontSize: 16, textDecoration: "none" }}>Back to Home</Link>
    </div>
  );
};

export default OrderConfirmationPage;
