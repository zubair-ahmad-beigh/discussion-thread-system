require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const { initSocket } = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Initialize socket handler
initSocket(io);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: 'Discussion Thread System API',
        version: '2.0.0',
        features: ['Authentication', 'Real-time Updates', 'Nested Comments'],
        endpoints: {
            auth: {
                register: 'POST /auth/register',
                login: 'POST /auth/login',
                me: 'GET /auth/me'
            },
            posts: {
                create: 'POST /posts',
                getById: 'GET /posts/:id'
            },
            comments: {
                create: 'POST /comments',
                getByPostId: 'GET /comments/posts/:postId/comments'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Socket.io ready for real-time updates`);
});
