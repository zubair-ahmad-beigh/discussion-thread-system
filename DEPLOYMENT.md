# 🚀 Deployment Guide

This guide covers deploying both the backend and frontend to Render.

## Prerequisites

- GitHub account
- Render account (free tier available)
- MongoDB Atlas database
- Project pushed to GitHub

## Backend Deployment (Already Deployed)

Your backend is live at: **https://discussion-thread-system.onrender.com**

## Frontend Deployment to Render

### Option 1: Using Render Blueprint (Recommended)

1. **Push render.yaml to GitHub**
   ```bash
   git add render.yaml
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Deploy via Render Dashboard**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New"** → **"Blueprint"**
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and create both services
   - Review the configuration and click **"Apply"**

3. **Verify Environment Variables**
   - Navigate to the frontend service
   - Check that `REACT_APP_API_URL` is set to your backend URL
   - If not, add it manually in the Environment tab

### Option 2: Manual Static Site Deployment

1. **Create New Static Site**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New"** → **"Static Site"**
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Name**: `discussion-thread-frontend` (or your preferred name)
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

3. **Set Environment Variables**
   - Click **"Environment"** tab
   - Add variable:
     - **Key**: `REACT_APP_API_URL`
     - **Value**: `https://discussion-thread-system.onrender.com`

4. **Deploy**
   - Click **"Create Static Site"**
   - Wait for the build to complete (5-10 minutes)
   - Your frontend will be available at `https://your-app-name.onrender.com`

## Backend CORS Configuration

Ensure your backend allows requests from your frontend domain:

1. Open `backend/server.js`
2. Update CORS configuration:
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:3000',
       'https://your-frontend-url.onrender.com'  // Add your frontend URL
     ],
     credentials: true
   };
   ```
3. Commit and push changes
4. Render will auto-deploy the backend

## Post-Deployment Verification

### 1. Check Build Logs
- Navigate to your static site in Render dashboard
- Click **"Logs"** to view build output
- Ensure no errors during `npm install` or `npm run build`

### 2. Test Frontend
- Open your deployed frontend URL
- Verify the app loads correctly
- Test dark mode toggle

### 3. Test Backend Connection
- Create a new post
- Add comments to verify API connectivity
- Check browser console for any CORS errors

### 4. Test Real-time Features
- Open the app in two browser tabs
- Add a comment in one tab
- Verify it appears in the other tab (Socket.io)

## Troubleshooting

### Build Fails

**Error**: `npm install` fails
- **Solution**: Clear build cache in Render dashboard and retry

**Error**: `npm run build` fails
- **Solution**: Run `npm run build` locally to identify issues
- Check that all dependencies are in `package.json` (not `devDependencies`)

### API Connection Issues

**Error**: API calls fail with CORS errors
- **Solution**: Update backend CORS configuration to include frontend URL
- Redeploy backend after changes

**Error**: 404 on API calls
- **Solution**: Verify `REACT_APP_API_URL` is set correctly
- Ensure it points to backend URL (not frontend URL)

### Socket.io Not Working

**Error**: Real-time updates don't work
- **Solution**: Check that backend WebSocket is enabled on Render
- Verify Socket.io client connects to correct URL
- Check browser console for connection errors

### Static Files Not Loading

**Error**: CSS/JS files return 404
- **Solution**: Verify `Publish Directory` is set to `build`
- Check that build completed successfully
- Clear browser cache and retry

## Environment Variables Reference

### Frontend
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://discussion-thread-system.onrender.com` |

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |

## Automatic Deployments

Render automatically deploys when you push to GitHub:

1. Make changes locally
2. Commit and push to `main` branch
3. Render detects changes and rebuilds
4. New version goes live automatically

To disable auto-deploy:
- Go to service settings
- Toggle **"Auto-Deploy"** off

## Custom Domain (Optional)

1. Go to service **"Settings"**
2. Scroll to **"Custom Domain"**
3. Click **"Add Custom Domain"**
4. Follow DNS configuration instructions
5. Wait for SSL certificate provisioning

## Monitoring

- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor bandwidth and build times
- **Alerts**: Set up email notifications for failed deployments

## Cost Optimization

Free tier limitations:
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month of runtime

To keep services always on:
- Upgrade to paid plan ($7/month per service)
- Or use a cron job to ping your app every 10 minutes

---

**Need Help?**
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- Check backend logs for API errors
- Check browser console for frontend errors
