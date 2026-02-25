import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: 20,
        marginTop: 40,
        background: "#f1f1f1",
      }}
    >
      © {new Date().getFullYear()} Online Book Shopping
    </footer>
  );
};

export default Footer;