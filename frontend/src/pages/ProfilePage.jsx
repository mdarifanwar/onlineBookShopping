import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  // ✅ Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders/myorders`,
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        setOrders(data);
      } catch (error) {
        console.error(error);
        setOrders([]);
      }
      setLoadingOrders(false);
    };

    if (userInfo?.token) fetchOrders();
  }, [userInfo]);

  // ✅ Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/profile`,
        {
          name: form.name,
          email: form.email,
          password: form.password || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      setMessage("Profile updated successfully!");
      setForm((f) => ({ ...f, password: "" }));
    } catch (error) {
      console.error(error);
      setMessage("Could not update profile.");
    }

    setUpdating(false);
  };

  // ✅ Get Order Detail
  const handleOrderDetail = async (orderId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      setOrderDetail(data);
    } catch (error) {
      console.error(error);
      setOrderDetail(null);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", marginTop: 32 }}>
      <div style={{ display: "flex", gap: 32 }}>
        
        {/* Profile Section */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px #0001",
            padding: 32,
          }}
        >
          <h2 style={{ marginBottom: 24 }}>
            Welcome, {form.name || "User"}!
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <div>
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              style={{
                background: "#388e3c",
                color: "#fff",
                border: "none",
                padding: "10px 28px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>

            {message && (
              <div style={{ marginTop: 8 }}>{message}</div>
            )}
          </form>
        </div>

        {/* Orders Section */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px #0001",
            padding: 32,
          }}
        >
          <h3>My Orders</h3>

          {loadingOrders ? (
            <div>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div>No orders found.</div>
          ) : (
            <table style={{ width: "100%", marginTop: 16 }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <button
                        onClick={() => handleOrderDetail(order._id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#1976d2",
                          cursor: "pointer",
                        }}
                      >
                        #{order._id.slice(-7)}
                      </button>
                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td>₹{order.totalPrice}</td>

                    <td>
                      <OrderStatusBadge
                        status={
                          order.isDelivered
                            ? "Delivered"
                            : "Pending"
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {orderDetail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0008",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 10,
              minWidth: 350,
            }}
          >
            <button onClick={() => setOrderDetail(null)}>Close</button>
            <h3>Order #{orderDetail._id.slice(-7)}</h3>
            <p>Total: ₹{orderDetail.totalPrice}</p>

            <OrderStatusBadge
              status={
                orderDetail.isDelivered
                  ? "Delivered"
                  : "Pending"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;