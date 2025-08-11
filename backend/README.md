# Expense Tracker Backend

A Node.js/Express backend for the Expense Tracker application with MongoDB Atlas integration.

## 🚀 Features

- User authentication with JWT
- Expense management (CRUD operations)
- Monthly expense tracking
- Expense analytics and charts
- Secure password hashing
- Input validation
- CORS enabled for frontend integration

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   The app is already configured with your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://ankit:Ankit%401234@cluster0.booozup.mongodb.net/expense-tracker?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

## 🗄️ MongoDB Atlas Setup

Your MongoDB Atlas cluster is already configured with:
- **Cluster**: cluster0.booozup.mongodb.net
- **Database**: expense-tracker
- **User**: ankit
- **Connection**: mongodb+srv protocol

## 🧪 Testing the Connection

Before running the main server, test your MongoDB Atlas connection:

```bash
node test-connection.js
```

This will:
- Connect to MongoDB Atlas
- List available collections
- Test User and Expense models
- Verify database operations

## 🚀 Running the Application

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on port 5000 (or the port specified in your environment variables).

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Expenses
- `GET /api/expenses` - Get all expenses (authenticated)
- `POST /api/expenses` - Create new expense (authenticated)
- `PUT /api/expenses/:id` - Update expense (authenticated)
- `DELETE /api/expenses/:id` - Delete expense (authenticated)
- `GET /api/expenses/monthly` - Monthly summary (authenticated)
- `GET /api/expenses/analytics` - Analytics data (authenticated)

### Health Check
- `GET /` - API status
- `GET /api/health` - Health check with database status

## 🔧 Configuration Options

The MongoDB connection includes optimized settings for Atlas:
- **Connection Pool**: Max 10 connections
- **Timeout**: 5 seconds for server selection
- **Socket Timeout**: 45 seconds
- **Buffer Management**: Optimized for production

## 🚨 Troubleshooting

### Connection Issues
1. **Check your internet connection**
2. **Verify MongoDB Atlas cluster is running**
3. **Ensure IP whitelist includes your current IP**
4. **Check username/password in connection string**

### Common Errors
- **ECONNREFUSED**: Check if MongoDB Atlas is accessible
- **Authentication failed**: Verify username/password
- **Network timeout**: Check firewall/network settings

## 📊 Database Collections

The app will automatically create these collections:
- **users**: User accounts and authentication
- **expenses**: Expense records with categories

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration for frontend
- Environment variable protection

## 🌐 Frontend Integration

The backend is configured with CORS to work with your React frontend. Make sure your frontend is making requests to:
```
http://localhost:5000/api/*
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `PORT` | Server port | 5000 |

## 🎯 Next Steps

1. Test the connection: `node test-connection.js`
2. Start the server: `npm run dev`
3. Test API endpoints with Postman or similar tool
4. Integrate with your React frontend

## 📞 Support

If you encounter any issues:
1. Check the console logs for detailed error messages
2. Verify your MongoDB Atlas cluster status
3. Test the connection script first
4. Check network connectivity and firewall settings
