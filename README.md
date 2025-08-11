# Expense Tracker App

A full-stack expense tracking application built with React.js frontend and Node.js backend, featuring user authentication, expense management, and data visualization.

## Features

- 🔐 **User Authentication**: Secure login and signup with JWT
- 💰 **Expense Management**: Create, read, update, and delete expenses
- 📊 **Data Visualization**: Interactive charts showing expense breakdown by category and daily trends
- 📅 **Monthly Tracker**: Real-time tracking of current month's expenses
- 🎯 **Category Management**: Organize expenses by predefined categories
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **React Hook Form** - Form management
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons

## Project Structure

```
ExpenseTrackerApp/
├── backend/
│   ├── config.env
│   ├── server.js
│   ├── package.json
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expenses.js
│   └── middleware/
│       └── auth.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── App.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── layout/
│   │   │   │   └── Navbar.js
│   │   │   ├── expenses/
│   │   │   │   ├── ExpenseForm.js
│   │   │   │   ├── ExpenseList.js
│   │   │   │   ├── ExpenseCharts.js
│   │   │   │   └── MonthlyTracker.js
│   │   │   └── Dashboard.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd ExpenseTrackerApp
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user (protected)

### Expenses
- `GET /api/expenses` - Get all expenses (protected)
- `GET /api/expenses/monthly` - Get monthly summary (protected)
- `GET /api/expenses/analytics` - Get analytics data (protected)
- `POST /api/expenses` - Create expense (protected)
- `PUT /api/expenses/:id` - Update expense (protected)
- `DELETE /api/expenses/:id` - Delete expense (protected)

## Usage

1. **Register/Login**: Create an account or sign in to access the dashboard
2. **Add Expenses**: Use the "Add Expense" button to create new expense entries
3. **View Analytics**: Check the charts tab to see spending patterns
4. **Monthly Tracking**: Monitor your current month's spending in the tracker section
5. **Manage Expenses**: Edit or delete expenses from the expense list

## Features in Detail

### Monthly Tracker
- Shows current month's total expenses
- Displays daily average and projected monthly total
- Highlights top spending categories
- Visual progress bar for month completion

### Expense Charts
- **Category Chart**: Pie chart showing expense distribution by category
- **Daily Chart**: Bar chart displaying daily spending trends
- Interactive tooltips and legends

### Expense Management
- Sort expenses by title, amount, category, or date
- Filter expenses by category
- Edit existing expenses inline
- Delete expenses with confirmation

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start    # Starts development server
npm run build # Builds for production
```

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.
