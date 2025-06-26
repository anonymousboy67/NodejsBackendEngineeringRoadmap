# Professional Task Manager API

A robust, enterprise-ready REST API built with Node.js and Express.js for managing tasks with user authentication, input validation, and comprehensive security features.

## 🚀 Features

- **User Authentication** - JWT-based authentication system
- **Task Management** - Full CRUD operations for tasks
- **Security** - Helmet, CORS, rate limiting, password hashing
- **Validation** - Comprehensive input validation
- **Error Handling** - Centralized error management
- **Logging** - HTTP request logging with Morgan
- **Environment Configuration** - Secure configuration management
- **API Documentation** - Self-documenting endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Morgan
- **Environment**: dotenv

## 📁 Project Structure

```
professional-task-api/
├── src/
│   ├── controllers/     # Route handlers (future implementation)
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js      # Authentication middleware
│   │   ├── validation.js # Input validation
│   │   ├── errorHandler.js # Global error handler
│   │   └── notFound.js  # 404 handler
│   ├── models/         # Data models
│   │   ├── User.js     # User model
│   │   └── Task.js     # Task model
│   ├── routes/         # Route definitions
│   │   ├── auth.js     # Authentication routes
│   │   ├── tasks.js    # Task routes
│   │   └── users.js    # User routes
│   └── app.js          # Express app setup
├── .env                # Environment variables
├── .gitignore
├── server.js           # Entry point
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd professional-task-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **For production**
   ```bash
   npm start
   ```

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication

All endpoints except authentication routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### 🔐 Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |
| GET | `/auth/me` | Get current user | Private |

#### 📝 Task Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/tasks` | Get all user tasks | Private |
| POST | `/tasks` | Create new task | Private |
| GET | `/tasks/:id` | Get specific task | Private |
| PUT | `/tasks/:id` | Update task | Private |
| DELETE | `/tasks/:id` | Delete task | Private |

#### 👤 User Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/users/profile` | Get user profile | Private |
| PUT | `/users/profile` | Update user profile | Private |

#### 🏥 Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/health` | Server health status | Public |

## 📋 API Usage Examples

### 1. User Registration

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. User Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create Task

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Learn Express.js",
    "description": "Study Express.js middleware and routing",
    "priority": "high"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Learn Express.js",
    "description": "Study Express.js middleware and routing",
    "completed": false,
    "priority": "high",
    "userId": 1,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

### 4. Get All Tasks

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/v1/tasks
```

### 5. Filter Tasks

```bash
# Get completed tasks
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/api/v1/tasks?completed=true"

# Get high priority tasks
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/api/v1/tasks?priority=high"

# Search tasks
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:3000/api/v1/tasks?search=express"
```

### 6. Update Task

```bash
curl -X PUT http://localhost:3000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "completed": true,
    "title": "Learn Express.js - Completed"
  }'
```

### 7. Delete Task

```bash
curl -X DELETE http://localhost:3000/api/v1/tasks/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Security Features

- **JWT Authentication** - Stateless authentication with configurable expiration
- **Password Hashing** - Secure password storage using bcrypt
- **Rate Limiting** - Prevents abuse (100 requests per 15 minutes per IP)
- **CORS Protection** - Configurable cross-origin resource sharing
- **Helmet Security** - Sets various HTTP headers for security
- **Input Validation** - Comprehensive validation using express-validator
- **Error Handling** - Secure error responses without sensitive data leakage

## 🚦 Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10  // For list responses
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": [ ... ]  // For validation errors
}
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3001` |

## 📊 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto-reload |
| `npm test` | Run tests (to be implemented) |

## 🎯 Task Model

```javascript
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "priority": "medium", // low, medium, high
  "userId": 1,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "dueDate": "2024-01-20T00:00:00.000Z" // optional
}
```

## 👤 User Model

```javascript
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
  // password field is excluded from responses
}
```

## ✅ Validation Rules

### User Registration/Login
- **Name**: 2-50 characters (registration only)
- **Email**: Valid email format, normalized
- **Password**: Minimum 6 characters

### Task Creation/Update
- **Title**: 3-100 characters, required
- **Description**: Maximum 500 characters, optional
- **Priority**: Must be 'low', 'medium', or 'high'

## 🐛 Error Handling

The API includes comprehensive error handling for:
- **Validation Errors** (400) - Invalid input data
- **Authentication Errors** (401) - Invalid or missing token
- **Authorization Errors** (403) - Insufficient permissions
- **Not Found Errors** (404) - Resource not found
- **Server Errors** (500) - Internal server errors

## 🔮 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- File upload capabilities
- Task categories and tags
- Task sharing and collaboration
- Email notifications
- Task reminders
- Advanced filtering and sorting
- Pagination
- API rate limiting per user
- Comprehensive test suite
- Docker containerization
- CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

**Made with ❤️ using Node.js and Express.js**
