import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useSocket = (postId, onNewComment) => {
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(SOCKET_URL, {
            transports: ['websocket', 'polling']
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
            // Join the post room
            socket.emit('join:post', postId);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        socket.on('comment:created', (comment) => {
            console.log('New comment received:', comment);
            if (onNewComment) {
                onNewComment(comment);
            }
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        // Cleanup on unmount
        return () => {
            if (socket) {
                socket.emit('leave:post', postId);
                socket.disconnect();
            }
        };
    }, [postId, onNewComment]);

    return socketRef.current;
};
