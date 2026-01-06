let io;

const initSocket = (socketIO) => {
    io = socketIO;

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Join a post room
        socket.on('join:post', (postId) => {
            socket.join(`post:${postId}`);
            console.log(`Client ${socket.id} joined post room: ${postId}`);
        });

        // Leave a post room
        socket.on('leave:post', (postId) => {
            socket.leave(`post:${postId}`);
            console.log(`Client ${socket.id} left post room: ${postId}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

const emitNewComment = (postId, comment) => {
    if (io) {
        io.to(`post:${postId}`).emit('comment:created', comment);
    }
};

const emitCommentUpdate = (postId, comment) => {
    if (io) {
        io.to(`post:${postId}`).emit('comment:updated', comment);
    }
};

module.exports = {
    initSocket,
    emitNewComment,
    emitCommentUpdate
};
