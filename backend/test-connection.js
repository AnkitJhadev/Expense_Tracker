const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env' });

console.log('🔍 Testing MongoDB connection...');
console.log('📋 Environment variables loaded:');
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('   PORT:', process.env.PORT || '5000');

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in .env file');
  process.exit(1);
}

// MongoDB Connection Options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000, // Increased timeout
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
};

console.log('\n🔌 Attempting to connect to MongoDB...');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, mongoOptions)
.then(() => {
  console.log('✅ Connected to MongoDB Atlas successfully!');
  console.log(`📊 Database: ${process.env.MONGODB_URI.split('/').pop().split('?')[0]}`);
  console.log('🔄 Connection state:', mongoose.connection.readyState);
  
  // Test a simple operation
  return mongoose.connection.db.admin().ping();
})
.then(() => {
  console.log('✅ Database ping successful!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection error:');
  console.error('   Error name:', err.name);
  console.error('   Error message:', err.message);
  console.error('   Error code:', err.code);
  
  if (err.name === 'MongoNetworkError') {
    console.log('\n💡 Possible solutions:');
    console.log('   1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('   2. Verify your connection string is correct');
    console.log('   3. Check if your MongoDB Atlas cluster is running');
    console.log('   4. Ensure your username/password are correct');
  }
  
  process.exit(1);
});

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('🔄 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Timeout after 15 seconds
setTimeout(() => {
  console.log('⏰ Connection timeout reached');
  process.exit(1);
}, 15000);
