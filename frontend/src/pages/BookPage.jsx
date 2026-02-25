import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAPI } from '../redux/cartApiSlice';
import NotificationContext from '../components/NotificationContext';

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const dispatch = useDispatch();
  const { setNotification } = useContext(NotificationContext);
  const userInfo = useSelector((state) => state.user.userInfo);


  const fetchBook = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(data);
    } catch {
      setBook(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBook();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    const checkPurchase = async () => {
      if (!userInfo) {
        setHasPurchased(false);
        return;
      }
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        // Check if any order contains this book
        const purchased = data.some(order =>
          order.orderItems.some(item => (item.book === (book?._id || book?.id)))
        );
        setHasPurchased(purchased);
      } catch {
        setHasPurchased(false);
      }
    };
    if (book && userInfo) {
      checkPurchase();
    } else {
      setHasPurchased(false);
    }
  }, [book, userInfo]);
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review.rating || !review.comment) {
      setNotification('Please provide a rating and comment.', 'warning');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(
        `http://localhost:5000/api/books/${book._id || book.id}/reviews`,
        { rating: review.rating, comment: review.comment },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setNotification('Review submitted!', 'success');
      setReview({ rating: 0, comment: '' });
      fetchBook();
    } catch (err) {
      setNotification(
        err.response?.data?.message || 'Could not submit review.',
        'error'
      );
    }
    setSubmitting(false);
  };

  const handleAddToCart = () => {
    dispatch(addToCartAPI({ bookId: book._id || book.id, qty: 1 }));
    setNotification('Added to cart!', 'success');
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Online Book Shop</h2>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <img src={book.image || book.cover} alt={book.title} style={{ width: 180, height: 260, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #0002' }} />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0 }}>{book.title}</h3>
          <div style={{ color: '#444', fontWeight: 500, marginBottom: 8 }}>{book.author}</div>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>{book.category} &middot; {book.year || ''}</div>
          <div style={{ margin: '8px 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#fbc02d', fontSize: 18 }}>
              {'★'.repeat(Math.round(book.rating || 0))}
              {'☆'.repeat(5 - Math.round(book.rating || 0))}
            </span>
            <span style={{ color: '#888', fontSize: 15 }}>
              {book.rating ? book.rating.toFixed(1) : '0.0'} / 5
              {book.numReviews ? ` (${book.numReviews} reviews)` : ''}
            </span>
          </div>
          <div style={{ margin: '16px 0', fontSize: 16 }}>{book.description}</div>
          <div style={{ fontWeight: 600, fontSize: 22, margin: '16px 0' }}>₹ {book.price}.00</div>
          <button onClick={handleAddToCart} style={{ marginTop: 8, padding: '10px 32px', borderRadius: 6, border: 'none', background: '#1976d2', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Add to Cart</button>
          <div style={{ marginTop: 24, color: '#666', fontSize: 15 }}>
            <div>Category: <b>{book.category}</b></div>
            <div>in stock: <b>{book.countInStock}</b></div>
          </div>
        </div>
      </div>
      {/* Book Sample Section */}
      {book.sample && (
        <div style={{ marginTop: 36, background: '#f9f9f9', borderRadius: 8, padding: 20, border: '1px solid #eee' }}>
          <h3 style={{ marginBottom: 10, fontSize: 20 }}>Read a Sample</h3>
          <div style={{ fontStyle: 'italic', color: '#444', fontSize: 16, whiteSpace: 'pre-line' }}>{book.sample}</div>
        </div>
      )}
      {/* Reviews Section */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ marginBottom: 12 }}>Reviews</h3>
        {book.reviews && book.reviews.length > 0 ? (
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {book.reviews.map((r, idx) => (
              <li key={idx} style={{ marginBottom: 18, background: '#f7f7f7', borderRadius: 6, padding: 12 }}>
                <div style={{ fontWeight: 500 }}>{r.name} <span style={{ color: '#fbc02d', fontSize: 15 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></div>
                <div style={{ color: '#555', fontSize: 15 }}>{r.comment}</div>
                <div style={{ color: '#aaa', fontSize: 13 }}>{new Date(r.createdAt).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ color: '#888' }}>No reviews yet.</div>
        )}
        <div style={{ marginTop: 28 }}>
          <h4>Write a Review</h4>
          {userInfo ? (
            hasPurchased ? (
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
                <label>
                  Rating:{' '}
                  <select name="rating" value={review.rating} onChange={handleReviewChange} style={{ marginLeft: 8 }}>
                    <option value={0}>Select...</option>
                    <option value={1}>1 - Poor</option>
                    <option value={2}>2 - Fair</option>
                    <option value={3}>3 - Good</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={5}>5 - Excellent</option>
                  </select>
                </label>
                <textarea
                  name="comment"
                  value={review.comment}
                  onChange={handleReviewChange}
                  rows={3}
                  placeholder="Write your review here..."
                  style={{ resize: 'vertical', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
                <button type="submit" disabled={submitting} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div style={{ color: '#888' }}>You can only review this book after purchasing it.</div>
            )
          ) : (
            <div style={{ color: '#888' }}>Please log in to write a review.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
