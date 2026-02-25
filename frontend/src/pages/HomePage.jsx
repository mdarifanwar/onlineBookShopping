import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, resetBooks } from '../redux/bookSlice';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { books, loading, page, pageSize, totalPages } = useSelector((state) => state.books);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(resetBooks());
    dispatch(fetchBooks({ page: 1, pageSize }));
    // eslint-disable-next-line
  }, [dispatch]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(fetchBooks({ page: page + 1, pageSize }));
    }
  };

  // Filter books by search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      (book.author && book.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '0 32px',
      minHeight: '100vh',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '48px 0 24px 0' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Latest Books</h1>
        <div style={{ position: 'relative', width: 320, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 22, boxShadow: '0 2px 12px #0002', border: '1.5px solid #e0e0e0', height: 44 }}>
          <span style={{
            position: 'absolute',
            left: 18,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#1976d2',
            fontSize: 20,
            pointerEvents: 'none',
            opacity: 0.85,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#1976d2" strokeWidth="2" />
              <line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search for books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 18px 10px 44px',
              borderRadius: 22,
              border: 'none',
              fontSize: 17,
              background: 'transparent',
              outline: 'none',
              color: '#232946',
              fontWeight: 500,
              boxShadow: 'none',
            }}
          />
        </div>
      </div>
      <div className="book-grid" style={{
        display: 'flex',
        gap: 40,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 8,
      }}>
        {filteredBooks && filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id || book.id} book={book} />)
        ) : (
          <p style={{ marginLeft: 12, color: '#888', fontSize: 18 }}>No books found.</p>
        )}
      </div>
      {page < totalPages && (
        <div style={{ textAlign: 'center', margin: '40px 0 0 0' }}>
          <button
            onClick={handleLoadMore}
            style={{
              background: 'linear-gradient(90deg, #1976d2 60%, #43a047 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 44px',
              fontWeight: 600,
              fontSize: 20,
              cursor: 'pointer',
              marginTop: 16,
              minWidth: 200,
              boxShadow: '0 2px 8px #0002',
              letterSpacing: 0.2,
            }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
