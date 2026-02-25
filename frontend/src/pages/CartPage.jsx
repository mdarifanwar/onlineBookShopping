// CartPage

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateCartItemAPI, removeCartItemAPI, clearCartAPI } from '../redux/cartApiSlice';


const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = (useSelector((state) => state.cartApi.cartItems) || []).filter(item => item.book && item.book.title && item.book.price != null);
  const loading = useSelector((state) => state.cartApi.loading);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQtyChange = (bookId, qty) => {
    if (qty < 1) return;
    dispatch(updateCartItemAPI({ bookId, qty }));
  };

  const handleRemove = (bookId) => {
    dispatch(removeCartItemAPI(bookId));
  };

  const handleClear = () => {
    dispatch(clearCartAPI());
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.qty * (item.book?.price || item.price || 0)),
    0
  );

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>Cart</h2>
      {loading ? <p>Loading...</p> : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
          {cartItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', borderBottom: idx !== cartItems.length - 1 ? '1px solid #eee' : 'none', padding: '16px 0' }}>
              <img
                src={item.book?.image || item.book?.cover || 'https://via.placeholder.com/80x120?text=Book'}
                alt={item.book?.title || item.title}
                style={{ width: 60, height: 90, objectFit: 'cover', borderRadius: 4, marginRight: 24 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 18 }}>{item.book?.title || item.title}</div>
                <div style={{ color: '#555', fontSize: 15 }}>{item.book?.author || item.author}</div>
                <div style={{ color: '#888', fontSize: 13, margin: '4px 0' }}>{item.book?.category || ''}</div>
              </div>
              <div style={{ fontWeight: 500, fontSize: 18, width: 80 }}>₹{item.book?.price || item.price}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button onClick={() => handleQtyChange(item.book?._id || item._id, item.qty - 1)} style={{ width: 28, height: 28, fontSize: 18, border: '1px solid #ccc', borderRadius: 4, background: '#f5f5f5' }}>-</button>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={e => handleQtyChange(item.book?._id || item._id, Number(e.target.value))}
                  style={{ width: 40, textAlign: 'center', border: '1px solid #ccc', borderRadius: 4 }}
                />
                <button onClick={() => handleQtyChange(item.book?._id || item._id, item.qty + 1)} style={{ width: 28, height: 28, fontSize: 18, border: '1px solid #ccc', borderRadius: 4, background: '#f5f5f5' }}>+</button>
                <button onClick={() => handleRemove(item.book?._id || item._id)} style={{ marginLeft: 12, color: '#fff', background: '#d32f2f', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontWeight: 500 }}>×</button>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 24 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginRight: 32 }}>Subtotal:</div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>₹{subtotal}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button
              style={{ background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default CartPage;
