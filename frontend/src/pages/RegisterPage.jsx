import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/userSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        { name, email, password }
      );

      dispatch(setUser(data));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f7f9",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "36px 32px 28px 32px",
          borderRadius: 16,
          boxShadow: "0 4px 24px #0001",
          minWidth: 340,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Register
        </h2>

        {error && (
          <div
            style={{
              color: "#d32f2f",
              marginBottom: 14,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <label style={{ fontWeight: 500 }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: 16,
            }}
          />

          <label style={{ fontWeight: 500 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: 16,
            }}
          />

          <label style={{ fontWeight: 500 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: 16,
            }}
          />

          <button
            type="submit"
            style={{
              marginTop: 8,
              padding: "12px 0",
              borderRadius: 8,
              border: "none",
              background:
                "linear-gradient(90deg, #1976d2 60%, #43a047 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer",
              boxShadow: "0 2px 8px #0002",
              letterSpacing: 0.1,
              transition: "background 0.2s",
            }}
          >
            Register
          </button>
        </form>

        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 15,
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;