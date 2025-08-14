const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

console.log('🔍 Testing MongoDB Atlas connection...');
console.log(`📡 Connection string: ${process.env.MONGODB_URI.replace(/\/\/ankit:Ankit%401234@/, '//***:***@')}`);

// MongoDB Connection Options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Test connection
mongoose.connect(process.env.MONGODB_URI, mongoOptions)
.then(async () => {
  console.log('✅ Successfully connected to MongoDB Atlas!');
  
  // Test database operations
  try {
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    // Test User model
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    console.log(`👥 Users in database: ${userCount}`);
    
    // Test Expense model
    const Expense = require('./models/Expense');
    const expenseCount = await Expense.countDocuments();
    console.log(`💰 Expenses in database: ${expenseCount}`);
    
    console.log('🎉 All tests passed! MongoDB Atlas connection is working perfectly.');
  } catch (error) {
    console.error('❌ Error during database operations:', error.message);
  }
  
  // Close connection
  await mongoose.connection.close();
  console.log('🔌 Connection closed.');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});
