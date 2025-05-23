# 📚 Book Review API

A RESTful API for managing book reviews, built with Node.js, Express, and MongoDB. This API allows users to create accounts, manage books, and write reviews with ratings.

## ✨ Features

- 🔐 User authentication (signup/login) with JWT
- 📖 CRUD operations for books
- Book review system with ratings
- Search functionality for books
- Pagination for books and reviews
- Author and genre filtering

## 🚀 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/book-review-api.git
   cd book-review-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```
4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔗 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login user |

### 📚 Books
- POST /api/books - Add a new book (Auth required)
- GET /api/books - Get all books (with pagination)
- GET /api/books/:id - Get book details by ID
- GET /api/books/search - Search books by title or author

### Reviews
- POST /api/books/:bookId/reviews - Add a review (Auth required)
- GET /api/books/:bookId/reviews - Get book reviews (with pagination)
- PUT /api/books/reviews/:id - Update review (Auth required)
- DELETE /api/books/reviews/:id - Delete review (Auth required)

## Example API Requests

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "email": "john@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Add a new book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "description": "A story of decadence and excess."
  }'
```

### Get books with pagination and filters
```bash
curl "http://localhost:3000/api/books?page=1&limit=10&genre=Classic&author=Fitzgerald"
```

### Search books
```bash
curl "http://localhost:3000/api/books/search?q=Gatsby"
```

## Database Schema

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)

## Book
- title (String, required)
- author (String, required)
- genre (String, required)
- description (String, required)
- publishedYear (Number)
- averageRating (Number)
- reviewCount (Number)

### Review
- book (ObjectId, ref: 'Book')
- user (ObjectId, ref: 'User')
- rating (Number, 1-5)
- comment (String)
