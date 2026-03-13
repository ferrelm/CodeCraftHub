# User Management Service

A Node.js RESTful API for managing users, featuring authentication and authorization. Built with Express and MongoDB (Mongoose), this service provides endpoints for user registration, login, and user management, with secure password hashing and JWT-based authentication.

## Features
- User registration and login
- Password hashing with bcrypt
- JWT authentication
- User CRUD operations (extendable)
- Centralized error handling
- Logging with Winston and Morgan
- Environment configuration with dotenv
- Unit and integration tests with Jest and Supertest

## Project Structure
```
CodeCraftHub/
├── package.json
├── README.md
├── scripts/
│   └── seedUsers.js
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
```

## Getting Started

### Prerequisites
- Node.js >= 16.x
- MongoDB instance (local or cloud)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd CodeCraftHub
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file (see below).

### Environment Variables
Create a `.env` file in the root directory with the following:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codecrafthub
JWT_SECRET=your_jwt_secret
```

### Running the App
- Start the server:
  ```bash
  npm start
  ```
- For development with auto-reload:
  ```bash
  npm run dev
  ```

### Seeding Users
To seed initial users:
```bash
npm run seed:users
```

### Running Tests
```bash
npm test
```

## API Endpoints
- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Login and receive a JWT

## License
MIT
