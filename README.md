# User Management System - MERN Stack with MySQL

A full-stack user management application built with MySQL, Express.js, React (with Redux), and Node.js. Features TypeScript integration, JWT authentication, and image upload capabilities.

## Tech Stack

### Backend
- Express.js
- MySQL (with Sequelize ORM)
- JWT for authentication
- Multer for file uploads
- TypeScript

### Frontend
- React.js
- Redux (with Redux Toolkit)
- Material-UI
- TypeScript
- Vite
- React Router v6
- Formik & Yup for form handling

## Features

- User Authentication (JWT)
- User CRUD Operations
- Profile Image Upload (Camera/Gallery)
- Third-party API Integration (reqres.in)
- Responsive Material-UI Design
- TypeScript Implementation
- Protected Routes
- Form Validation

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   ├── uploads/          # Image uploads directory
│   ├── .env             # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/          # Redux store setup
    │   ├── components/   # React components
    │   ├── features/     # Redux slices
    │   ├── services/     # API services
    │   └── types/        # TypeScript interfaces
    ├── .env            # Frontend environment variables
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/bhavinc8787/MERN-Mysql-.git
   cd MERN-Mysql-
   ```

2. Backend Setup
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Update .env with your MySQL credentials
   
   # Start the server
   npm run dev
   ```

3. Frontend Setup
   ```bash
   cd frontend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   
   # Start the development server
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=caliboart_db
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h
REQRES_API_URL=https://reqres.in/api
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Public Routes
- POST /api/login - User authentication
- POST /api/users - Create new user

### Protected Routes (requires JWT)
- GET /api/users - Get all users
- GET /api/profile - Get user profile
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user
- POST /api/users/import - Import users from reqres.in

## Features Implementation

### User Authentication
- JWT-based authentication
- Token expiration
- Protected routes in both frontend and backend

### User Management
- Create new users with profile images
- Update user information
- Delete users
- View user list with pagination
- Import users from external API (reqres.in)

### Profile Management
- Upload profile images
- Camera/gallery integration
- View and edit profile information

### Security Features
- Password hashing with bcrypt
- JWT token validation
- Protected API routes
- Form validation
- File upload validation

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Deployment

### Backend Deployment
1. Set up production MySQL database
2. Configure production environment variables
3. Build and start the server:
   ```bash
   npm run build
   npm start
   ```

### Frontend Deployment
1. Set up environment variables for production API URL
2. Build the frontend:
   ```bash
   npm run build
   ```
3. Deploy the `dist` directory to your hosting service

## Best Practices Implemented

- TypeScript for type safety
- Redux for state management
- JWT authentication
- Error handling
- Input validation
- File upload security
- Code organization
- API error handling
- Database indexing
- Responsive design
- Code splitting
- Environment configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details