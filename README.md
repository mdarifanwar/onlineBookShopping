# Book Store App

A full-stack MERN (MongoDB, Express, React, Node.js) online book store application. Users can browse, search, and purchase books, manage their cart, view orders, and more. Admins can manage books and view analytics.

## Features
- User registration and login (JWT authentication)
- Browse, search, and filter books
- Add books to cart and checkout
- Order management and order history
- Leave reviews (only after purchase)
- Responsive, modern UI
- Admin panel (manage books, view analytics)
- Wishlist and recommendations (planned)

## Tech Stack
- **Frontend:** React, Redux Toolkit, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Deployment:** Vercel (frontend), Render (backend)

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas account

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/mdarifanwar/book-store-app.git
   cd book-store-app
   ```
2. **Install dependencies:**
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in `/backend`:
     ```env
     MONGO_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
4. **Seed the database (optional):**
   ```sh
   cd backend
   node seedBooks.js
   ```
5. **Run the backend:**
   ```sh
   npm run dev
   ```
6. **Run the frontend:**
   ```sh
   cd ../frontend
   npm start
   ```

## Deployment
- **Frontend:** Deploy `/frontend` to Vercel.
- **Backend:** Deploy `/backend` to Render. Set environment variables in the Render dashboard.

## Folder Structure
```
backend/
  models/
  routes/
  controllers/
  seedBooks.js
  ...
frontend/
  src/
    components/
    pages/
    redux/
    ...
```

## License
MIT

---

**Enjoy your online book shopping experience!**
