import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAPI } from '../redux/cartApiSlice';
import NotificationContext from './NotificationContext';
import { Link, useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setNotification } = useContext(NotificationContext);
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleAddToCart = () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    dispatch(addToCartAPI({ bookId: book._id, qty: 1 }));
    setNotification('Added to cart!', 'success');
  };
  return (
    <div className="book-card" style={{
      border: '1.5px solid #e0e0e0',
      borderRadius: 16,
      width: 260,
      padding: 24,
      background: '#fff',
      position: 'relative',
      boxShadow: '0 4px 16px #0002',
      transition: 'box-shadow 0.2s, transform 0.2s',
      marginBottom: 28,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Link to={`/book/${book._id || book.id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
        <img src={book.image || book.cover} alt={book.title} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px #0001' }} />
        <h3 style={{ margin: '18px 0 4px 0', fontWeight: 700, fontSize: 20 }}>{book.title}</h3>
        <p style={{ margin: 0, color: '#444', fontWeight: 500 }}>{book.author}</p>
        <p style={{ margin: '8px 0 0 0', fontWeight: 600, color: '#1976d2', fontSize: 17 }}>₹{book.price}</p>
      </Link>
      <button onClick={handleAddToCart} style={{
        marginTop: 18,
        padding: '12px 0',
        borderRadius: 8,
        border: 'none',
        background: 'linear-gradient(90deg, #1976d2 60%, #43a047 100%)',
        color: '#fff',
        cursor: 'pointer',
        width: '100%',
        fontWeight: 700,
        fontSize: 17,
        boxShadow: '0 2px 8px #0002',
        letterSpacing: 0.1,
        transition: 'background 0.2s',
      }}>Add to Cart</button>
    </div>
  );
};

export default BookCard;
