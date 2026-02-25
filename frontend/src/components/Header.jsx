import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cartApi?.cartItems || []);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSignOut = () => {
    setDropdownOpen(false);
    dispatch({ type: "user/signOut" });
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #232946 60%, #1976d2 100%)",
        color: "#fff",
        padding: "0 36px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 56,
        boxShadow: "0 2px 8px #0001",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 30, marginRight: 8, display: 'flex', alignItems: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="28" height="20" rx="5" fill="#fff" stroke="#232946" strokeWidth="2" />
            <rect x="6" y="10" width="20" height="12" rx="2" fill="#fbc02d" />
            <rect x="8" y="12" width="16" height="8" rx="1.5" fill="#fff" />
          </svg>
        </span>
        <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: 0.5 }}>Book Store</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 500 }}>Home</Link>
        <Link to="/cart" style={{ color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 500, position: 'relative', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 20c.828 0 1.5.672 1.5 1.5S7.828 23 7 23s-1.5-.672-1.5-1.5S6.172 20 7 20zm10 0c.828 0 1.5.672 1.5 1.5S17.828 23 17 23s-1.5-.672-1.5-1.5S16.172 20 17 20zM7.16 17h9.72c.7 0 1.32-.46 1.48-1.13l2.1-8.41A1.5 1.5 0 0 0 19 6H6.21l-.94-2.36A1 1 0 0 0 4.34 3H2.5a.5.5 0 0 0 0 1h1.54l3.6 9.19-1.35 2.44A1.5 1.5 0 0 0 7 18h10a.5.5 0 0 0 0-1H7.16zm12.24-9l-2.1 8.41c-.09.36-.41.59-.77.59H7.16c-.36 0-.68-.23-.77-.59L4.29 8h15.11z" fill="#fff"/>
            </svg>
          </span>
          Cart
          {cartItems.length > 0 && (
            <span style={{
              position: 'absolute',
              top: -10,
              right: -18,
              background: '#d32f2f',
              color: '#fff',
              borderRadius: '50%',
              fontSize: 13,
              fontWeight: 700,
              minWidth: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 7px',
              border: '2px solid #fff',
              boxShadow: '0 1px 4px #0002',
              zIndex: 2,
            }}>{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none',
                padding: 0,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '50%', width: 32, height: 32, justifyContent: 'center', marginRight: 2 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" fill="#1976d2" />
                  <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" fill="#1976d2" />
                  <circle cx="12" cy="12" r="11.5" stroke="#e0e0e0" strokeWidth="1" fill="none" />
                </svg>
              </span>
              <span>{userInfo.name || "user"}</span>
              <span style={{ fontSize: 18, marginLeft: 2 }}>▼</span>
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 44,
                right: 0,
                background: 'linear-gradient(90deg, #1976d2 60%, #43a047 100%)',
                borderRadius: 10,
                boxShadow: '0 4px 16px #0002',
                padding: '10px 0',
                minWidth: 140,
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}>
                <button
                  onClick={handleSignOut}
                  style={{
                    background: '#fff',
                    color: '#1976d2',
                    border: 'none',
                    borderRadius: 6,
                    padding: '10px 0',
                    margin: '0 12px',
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px #0001',
                    transition: 'background 0.2s',
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '50%', width: 28, height: 28, justifyContent: 'center', marginRight: 2 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="8" r="4" fill="#1976d2" />
                  <ellipse cx="11" cy="16" rx="7" ry="4" fill="#1976d2" />
                </svg>
              </span>
              <Link to="/login" style={{ color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 500, marginRight: 8 }}>Login</Link>
              <Link to="/register" style={{ color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 500 }}>Register</Link>
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;