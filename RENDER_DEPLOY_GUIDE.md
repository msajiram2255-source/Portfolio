# Render Deployment Guide

## Quick Deploy Commands

### 1. Connect Your Repository to Render
```bash
# Create a new Web Service on Render Dashboard at https://dashboard.render.com
# Connect your GitHub repository
```

### 2. Render CLI Deploy (if using CLI)
```bash
# Install Render CLI (optional)
npm install -g @render/cli

# Login to Render
render login

# Deploy from command line
render deploy
```

## Manual Deployment Steps

### Step 1: Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub account

### Step 2: Create New Web Service
1. Click **New+** → **Web Service**
2. Connect your GitHub repository
3. Select the repository: `Portfolio_Midhun`
4. Set the following:
   - **Name**: `midhun-portfolio-server`
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node
   - **Plan**: Free (or Starter if production)

### Step 3: Set Environment Variables
In Render Dashboard → Environment:

```
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
NODE_ENV=production
```

### Step 4: Deploy
- Render will automatically deploy on every push to main branch
- Or click **Deploy** button manually on Render dashboard

## Useful Render Commands

```bash
# View logs
render logs --service=midhun-portfolio-server

# Restart service
render restart --service=midhun-portfolio-server

# List all services
render services list

# Get service details
render service info --service=midhun-portfolio-server
```

## Important Notes

1. **Free Plan Limitations**:
   - Services spin down after 15 minutes of inactivity
   - Use `keepalive.js` to prevent spinning down
   - Limited resources (512MB RAM)

2. **MongoDB Connection**:
   - Use MongoDB Atlas for cloud database
   - Add Render IP to MongoDB Atlas whitelist
   - Or use `0.0.0.0/0` for anywhere

3. **File Uploads**:
   - Free plan has ephemeral storage
   - Uploads will be lost on restart
   - Consider using Cloudinary for file storage (already configured)

4. **Node Version**:
   - Render uses Node 18.x by default
   - Update in `package.json` if needed:
     ```json
     "engines": {
       "node": "18.x"
     }
     ```

## Post-Deployment

Once deployed:
- Your API will be available at: `https://midhun-portfolio-server.onrender.com`
- Update client `.env` to use this URL
- Test health endpoint: `https://midhun-portfolio-server.onrender.com/api/health`

## Troubleshooting

### Build fails
```bash
# Check logs in Render dashboard
# Common issues:
# - Missing dependencies: run npm install locally
# - Node version mismatch: update package.json engines
```

### Server crashes
```bash
# Check for uncaught errors in logs
# Verify all env variables are set
# Test locally: npm run dev
```

### Database connection fails
```bash
# Verify MONGO_URI is correct
# Check MongoDB Atlas network access rules
# Ensure database user has correct permissions
```
