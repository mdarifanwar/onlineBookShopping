import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, resetBooks } from "../redux/bookSlice";
import BookCard from "../components/BookCard";

const HomePage = () => {
  const dispatch = useDispatch();

  const {
    books,
    loading,
    page,
    pageSize,
    totalPages,
  } = useSelector((state) => state.books);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(resetBooks());
    dispatch(fetchBooks({ page: 1, pageSize }));
  }, [dispatch, pageSize]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(fetchBooks({ page: page + 1, pageSize }));
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      (book.author &&
        book.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 32px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "48px 0 24px 0",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
          Latest Books
        </h1>

        <div
          style={{
            position: "relative",
            width: 320,
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: 22,
            boxShadow: "0 2px 12px #0002",
            border: "1.5px solid #e0e0e0",
            height: 44,
          }}
        >
          <input
            type="text"
            placeholder="Search for books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 18px",
              borderRadius: 22,
              border: "none",
              fontSize: 17,
              background: "transparent",
              outline: "none",
              fontWeight: 500,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          justifyContent: "flex-start",
          marginTop: 8,
        }}
      >
        {loading && books.length === 0 ? (
          <p>Loading books...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p style={{ color: "#888", fontSize: 18 }}>
            No books found.
          </p>
        )}
      </div>

      {page < totalPages && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            onClick={handleLoadMore}
            disabled={loading}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "14px 44px",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;