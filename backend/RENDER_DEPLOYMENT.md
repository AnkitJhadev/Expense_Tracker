# 🚀 Render Deployment Guide - Backend

## **Step-by-Step Deployment to Render**

### **Prerequisites:**
- ✅ MongoDB Atlas database set up
- ✅ Backend code ready
- ✅ Render account created

---

## **Step 1: Prepare Your Code**

### **1.1 Update CORS Configuration**
In `server.js`, update the `allowedOrigins` array with your actual frontend URL:

```javascript
const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://your-actual-frontend-url.com', // Your production frontend
  'https://expense-tracker-frontend.onrender.com', // If using Render for frontend
  'https://expense-tracker.netlify.app', // If using Netlify
  'https://expense-tracker.vercel.app' // If using Vercel
];
```

### **1.2 Verify Environment Variables**
Make sure your `.env` file has:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

---

## **Step 2: Deploy to Render**

### **2.1 Connect Your Repository**
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing your backend code

### **2.2 Configure the Service**

#### **Basic Settings:**
- **Name:** `expense-tracker-backend` (or your preferred name)
- **Environment:** `Node`
- **Region:** Choose closest to your users
- **Branch:** `main` (or your default branch)
- **Root Directory:** Leave empty (if backend is in root)

#### **Build & Deploy Settings:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** `Free` (for testing) or `Starter` (for production)

### **2.3 Environment Variables**
Click **"Environment"** tab and add these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB connection string |
| `JWT_SECRET` | `your-secret-key` | JWT signing secret |
| `PORT` | `10000` | Render's default port |

**⚠️ Important:** 
- Copy your MongoDB URI from your `.env` file
- Generate a strong JWT secret for production
- Never commit sensitive values to your repository

### **2.4 Advanced Settings**
- **Auto-Deploy:** ✅ Enable (deploys on every push)
- **Health Check Path:** `/api/health`

---

## **Step 3: Deploy and Test**

### **3.1 Deploy**
1. Click **"Create Web Service"**
2. Wait for build to complete (2-5 minutes)
3. Your service will be available at: `https://your-app-name.onrender.com`

### **3.2 Test Your API**
Test these endpoints:
```bash
# Health check
curl https://your-app-name.onrender.com/api/health

# Root endpoint
curl https://your-app-name.onrender.com/

# Test registration (replace with your actual URL)
curl -X POST https://your-app-name.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

---

## **Step 4: Update Frontend Configuration**

### **4.1 Update Frontend API URL**
In your frontend's `.env.production`:
```env
REACT_APP_API_URL=https://your-app-name.onrender.com
```

### **4.2 Update CORS in Backend**
Add your frontend URL to the allowed origins in `server.js`.

---

## **Step 5: Monitor and Maintain**

### **5.1 Check Logs**
- Go to your service dashboard
- Click **"Logs"** tab
- Monitor for errors or issues

### **5.2 Health Monitoring**
- Render automatically checks `/api/health`
- Service restarts if health check fails

### **5.3 Scaling (Optional)**
- Upgrade to **Starter** plan for better performance
- Enable **Auto-Scaling** for high traffic

---

## **🔧 Troubleshooting**

### **Common Issues:**

#### **1. Build Fails**
- Check if all dependencies are in `package.json`
- Verify `start` script exists
- Check build logs for specific errors

#### **2. MongoDB Connection Fails**
- Verify `MONGODB_URI` is correct
- Check if IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

#### **3. CORS Errors**
- Update `allowedOrigins` with your frontend URL
- Check browser console for specific CORS errors

#### **4. Environment Variables Not Working**
- Verify variables are set in Render dashboard
- Check variable names match your code
- Restart service after adding variables

### **Useful Commands:**
```bash
# Check service status
curl https://your-app-name.onrender.com/api/health

# View logs
# Go to Render dashboard → Logs tab

# Restart service
# Go to Render dashboard → Manual Deploy
```

---

## **📊 Performance Tips**

### **Free Plan Limitations:**
- ⏰ Service sleeps after 15 minutes of inactivity
- 🔄 Cold start takes 30-60 seconds
- 📊 Limited bandwidth and compute

### **Production Recommendations:**
- Upgrade to **Starter** plan ($7/month)
- Use **Auto-Scaling** for traffic spikes
- Set up **Custom Domain** for better branding
- Enable **SSL** (automatic with Render)

---

## **🔐 Security Checklist**

- [ ] Strong JWT secret generated
- [ ] MongoDB user has minimal required permissions
- [ ] CORS configured properly
- [ ] Environment variables set securely
- [ ] No sensitive data in code repository
- [ ] Health check endpoint working
- [ ] Error handling implemented

---

## **📞 Support**

If you encounter issues:
1. Check Render logs for error messages
2. Verify all environment variables are set
3. Test API endpoints manually
4. Check MongoDB Atlas connection
5. Review CORS configuration

**Render Documentation:** [docs.render.com](https://docs.render.com) 