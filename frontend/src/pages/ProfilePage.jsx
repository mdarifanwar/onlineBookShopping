
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import OrderStatusBadge from "../components/OrderStatusBadge";

const ProfilePage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [form, setForm] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    password: "",
  });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        setOrders(data);
      } catch {
        setOrders([]);
      }
      setLoadingOrders(false);
    };
    if (userInfo?.token) fetchOrders();
  }, [userInfo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: form.name,
          email: form.email,
          password: form.password || undefined,
        },
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      setMessage("Profile updated!");
      setForm(f => ({ ...f, password: "" }));
    } catch {
      setMessage("Could not update profile.");
    }
    setUpdating(false);
  };

  const handleOrderDetail = async (orderId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      setOrderDetail(data);
    } catch {
      setOrderDetail(null);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", marginTop: 32 }}>
      <div style={{ display: "flex", gap: 32 }}>
        <div style={{ flex: 1, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 32 }}>
          <h2 style={{ marginBottom: 24 }}>Welcome, {form.name || "User"}!</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontWeight: 500 }}>Name</label>
              <input name="name" value={form.name} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 500 }}>Email Address</label>
              <input name="email" value={form.email} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc", marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 500 }}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc", marginTop: 4 }} placeholder="Leave blank to keep current password" />
            </div>
            <button type="submit" disabled={updating} style={{ background: "#388e3c", color: "#fff", border: "none", borderRadius: 4, padding: "10px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 10 }}>
              {updating ? "Updating..." : "Update Profile"}
            </button>
            {message && <div style={{ color: "#388e3c", marginTop: 8 }}>{message}</div>}
          </form>
        </div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 32 }}>
          <h3 style={{ marginBottom: 18 }}>My Orders</h3>
          {loadingOrders ? (
            <div>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div>No orders found.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                  <th style={{ textAlign: "left", padding: 8 }}>DATE</th>
                  <th style={{ textAlign: "left", padding: 8 }}>TOTAL</th>
                  <th style={{ textAlign: "left", padding: 8 }}>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 8 }}>
                      <button
                        style={{ color: "#1976d2", background: "none", border: "none", textDecoration: "underline", cursor: "pointer", fontSize: 15 }}
                        onClick={() => handleOrderDetail(order._id)}
                      >
                        #{order._id.slice(-7)}
                      </button>
                    </td>
                          {/* Order Details Modal */}
                          {orderDetail && (
                            <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#0008", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ background: "#fff", borderRadius: 10, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: "0 2px 16px #0003", position: "relative" }}>
                                <button onClick={() => setOrderDetail(null)} style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>&times;</button>
                                <h3>Order #{orderDetail._id.slice(-7)}</h3>
                                <div style={{ margin: "10px 0 18px 0", color: "#888" }}>Placed: {new Date(orderDetail.createdAt).toLocaleString()}</div>
                                <div style={{ marginBottom: 10, fontWeight: 600 }}>Total: ₹{orderDetail.totalPrice}</div>
                                <div style={{ marginBottom: 10 }}>
                                  <OrderStatusBadge status={orderDetail.isDelivered ? "Delivered" : "Paving"} />
                                </div>
                                <h4 style={{ margin: "18px 0 8px 0" }}>Items</h4>
                                <ul style={{ padding: 0, listStyle: "none" }}>
                                  {orderDetail.orderItems.map((item, idx) => (
                                    <li key={idx} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                                      <span style={{ flex: 1 }}>{item.name}</span>
                                      <span style={{ color: "#888", marginLeft: 8 }}>x{item.qty}</span>
                                      <span style={{ fontWeight: 500, marginLeft: 12 }}>₹{item.price}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                    <td style={{ padding: 8 }}>{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td style={{ padding: 8 }}>₹{order.totalPrice}</td>
                    <td style={{ padding: 8 }}>
                      <OrderStatusBadge status={order.isDelivered ? "Delivered" : "Paving"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
