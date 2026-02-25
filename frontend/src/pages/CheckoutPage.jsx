import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCartAPI } from "../redux/cartApiSlice";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cartApi.cartItems) || [];
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Only show items with valid book data
  const validItems = cartItems.filter(item => item.book && item.book.price != null);
  const subtotal = validItems.reduce(
    (sum, item) => sum + (item.qty * item.book.price),
    0
  );
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
  });
  const [step, setStep] = useState(1); // 1: address, 2: payment
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Save order to backend
      const orderItems = validItems.map(item => ({
        name: item.book.title,
        qty: item.qty,
        price: item.book.price,
        book: item.book._id,
      }));
      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems,
          totalPrice: subtotal,
          shippingAddress: address,
        },
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      dispatch(clearCartAPI());
      navigate("/order-confirmation", { state: { orderId: data._id } });
    } catch (err) {
      setError("Could not place order. Try again.");
    }
    setLoading(false);
  };
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001", padding: 32 }}>
      <h2>Checkout</h2>
      <h3 style={{ marginTop: 24 }}>Order Summary</h3>
      {validItems.length === 0 ? (
        <div style={{ color: '#d32f2f', margin: '16px 0' }}>No valid items in your cart. Please add books again.</div>
      ) : (
        <>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {validItems.map((item, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <img src={item.book.image || item.book.cover || "https://via.placeholder.com/40x60?text=Book"} alt={item.book.title} style={{ width: 32, height: 48, objectFit: "cover", borderRadius: 4, marginRight: 16 }} />
                <div style={{ flex: 1 }}>{item.book.title} <span style={{ color: "#888", fontSize: 14 }}>x{item.qty}</span></div>
                <div style={{ fontWeight: 500 }}>₹{item.book.price * item.qty}</div>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: "right", fontWeight: 600, fontSize: 18, margin: "16px 0" }}>Subtotal: ₹{subtotal}</div>
        </>
      )}
      {step === 1 && (
        <>
          <h3 style={{ marginTop: 32 }}>Shipping Address</h3>
          <form onSubmit={handleAddressSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 400 }}>
            <input name="name" value={address.name} onChange={handleChange} placeholder="Full Name" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <input name="street" value={address.street} onChange={handleChange} placeholder="Street Address" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <input name="city" value={address.city} onChange={handleChange} placeholder="City" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <input name="zip" value={address.zip} onChange={handleChange} placeholder="ZIP Code" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <button type="submit" style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 10 }}>Continue to Payment</button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h3 style={{ marginTop: 32 }}>Payment</h3>
          <form onSubmit={handlePaymentSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 400 }}>
            <input name="number" value={card.number} onChange={handleCardChange} placeholder="Card Number" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <input name="expiry" value={card.expiry} onChange={handleCardChange} placeholder="Expiry (MM/YY)" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <input name="cvc" value={card.cvc} onChange={handleCardChange} placeholder="CVC" required style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
            <button type="submit" disabled={loading} style={{ background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 10 }}>{loading ? "Placing Order..." : "Place Order"}</button>
            {error && <div style={{ color: '#d32f2f', marginTop: 8 }}>{error}</div>}
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
