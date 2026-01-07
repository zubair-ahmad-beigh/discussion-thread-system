# 💬 Discussion Thread System

A modern discussion platform with **real-time updates**, **nested comments**, and **dark mode** built with the MERN stack.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- � **Dark Mode** - Toggle with localStorage persistence
- ⚡ **Real-time Updates** - Socket.io for instant comment notifications
- 💬 **Nested Comments** - Unlimited depth with visual hierarchy
- 🎨 **Modern UI** - Gradients, animations, and responsive design
- 👤 **User Avatars** - Auto-generated colorful avatars
- 🔐 **JWT Auth** - Secure authentication (backend ready)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account

### Installation

```bash
# Clone repository
git clone https://github.com/zubair-ahmad-beigh/discussion-thread-system.git
cd discussion-thread-system

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure backend/.env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key

# Run application
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm start

# Open http://localhost:3000
```

## �️ Tech Stack

**Backend:** Node.js, Express, MongoDB, Socket.io, JWT  
**Frontend:** React, Context API, CSS3

## 📡 API Endpoints

```
GET  /posts/:id                      - Get post
POST /posts                          - Create post
GET  /comments/posts/:postId/comments - Get comments
POST /comments                       - Create comment
POST /auth/register                  - Register user
POST /auth/login                     - Login user
GET  /auth/me                        - Get current user
```

## 📁 Project Structure

```
discussion-thread-system/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── socket/          # Socket.io handlers
│   └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── components/  # React components
        ├── context/     # Auth & Theme context
        ├── hooks/       # Custom hooks
        └── App.js       # Main app
```

## � Key Features

### Dark Mode
- Seamless light/dark theme switching
- CSS variables for dynamic theming
- Preference saved to localStorage

### Real-time Updates
- Socket.io WebSocket connection
- Post-based rooms for efficiency
- Instant comment notifications

### Nested Comments
- Unlimited nesting depth
- Visual indentation up to 160px
- Recursive rendering algorithm

## 🚀 Deployment

### Backend (Render)

**Live URL:** https://discussion-thread-system.onrender.com

1. Push code to GitHub
2. Create new **Web Service** on Render
3. Connect your repository
4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
5. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `FRONTEND_URL` - Your frontend URL (add after frontend deployment)
   - `NODE_ENV=production`
6. Deploy

### Frontend (Render)

1. Create new **Static Site** on Render
2. Connect your repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Add environment variable:
   - `REACT_APP_API_URL=https://discussion-thread-system.onrender.com`
5. Deploy
6. **Important:** After deployment, update backend's `FRONTEND_URL` environment variable with your frontend URL

📖 **Detailed Guide:** See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions



## 👨‍💻 Author

**Zubair Ahmad Beigh**  
Full-Stack Developer | 

- GitHub: [@zubair-ahmad-beigh](https://github.com/zubair-ahmad-beigh)

### 💡 Project Highlights
- 🌙 Dark Mode with persistence
- ⚡ Real-time WebSocket updates
- 💬 Unlimited nested threads
- 🎨 Modern UI with animations
- 📱 Fully responsive

---

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 🙏 Acknowledgments

Design inspiration from Reddit and GitHub Discussions

---

**⭐ Star this repo if you found it helpful!**

*Crafted with ❤️ and lots of ☕*
