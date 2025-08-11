const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'Test123'
};

const testLogin = {
  email: 'test@example.com',
  password: 'Test123'
};

async function testAPI() {
  console.log('🧪 Testing Expense Tracker API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health Check:', healthResponse.data.message);
    console.log('📊 Database Status:', healthResponse.data.database);
    console.log('');

    // Test 2: User Registration
    console.log('2️⃣ Testing User Registration...');
    try {
      const registerResponse = await axios.post(`${API_BASE}/auth/register`, testUser);
      console.log('✅ Registration Successful:', registerResponse.data.message);
      console.log('👤 User ID:', registerResponse.data.user.id);
      console.log('🔑 Token received:', registerResponse.data.token ? 'Yes' : 'No');
      console.log('');
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️ User already exists, continuing with login test...');
        console.log('');
      } else {
        console.log('❌ Registration failed:', error.response?.data?.message || error.message);
        console.log('');
      }
    }

    // Test 3: User Login
    console.log('3️⃣ Testing User Login...');
    try {
      const loginResponse = await axios.post(`${API_BASE}/auth/login`, testLogin);
      console.log('✅ Login Successful:', loginResponse.data.message);
      console.log('👤 User:', loginResponse.data.user.name);
      console.log('🔑 Token received:', loginResponse.data.token ? 'Yes' : 'No');
      console.log('');

      // Test 4: Get User Data (with token)
      console.log('4️⃣ Testing Get User Data...');
      const token = loginResponse.data.token;
      const userResponse = await axios.get(`${API_BASE}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ User Data Retrieved:', userResponse.data.user.name);
      console.log('📧 Email:', userResponse.data.user.email);
      console.log('');

      // Test 5: Logout
      console.log('5️⃣ Testing Logout...');
      const logoutResponse = await axios.post(`${API_BASE}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Logout Successful:', logoutResponse.data.message);
      console.log('');

    } catch (error) {
      console.log('❌ Login failed:', error.response?.data?.message || error.message);
      console.log('');
    }

    console.log('🎉 API Testing Complete!');
    
  } catch (error) {
    console.error('❌ API Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the server is running on port 5000');
    }
  }
}

// Run the test
testAPI();
