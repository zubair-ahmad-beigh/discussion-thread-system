import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './PostView.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PostView = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts/${postId}`);
                setPost(response.data.data);
            } catch (err) {
                setError('Failed to load post');
                console.error('Error fetching post:', err);
            }
        };

        fetchPost();
    }, [postId]);

    // Fetch comments
    const fetchComments = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/comments/posts/${postId}/comments`);
            setComments(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load comments');
            setLoading(false);
            console.error('Error fetching comments:', err);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // Handle real-time comment updates
    const handleNewComment = useCallback((newComment) => {
        console.log('New comment received via socket:', newComment);
        // Refresh comments to get the updated tree structure
        fetchComments();
    }, [fetchComments]);

    // Initialize Socket.io connection
    useSocket(postId, handleNewComment);

    const handleCommentAdded = () => {
        // Refresh comments after adding a new one
        fetchComments();
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!post) {
        return <div className="loading">Loading post...</div>;
    }

    return (
        <div className="post-view">
            <div className="post-card">
                <div className="post-header">
                    <h1>{post.title}</h1>
                    <p className="post-date">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>

                <div className="post-content">
                    <p>{post.content}</p>
                </div>
            </div>

            <div className="comments-section">
                <h2>💬 Comments ({comments.length})</h2>

                <div className="add-comment">
                    <h3>Add a Comment</h3>
                    <CommentForm
                        postId={postId}
                        onCommentAdded={handleCommentAdded}
                    />
                </div>

                {loading ? (
                    <div className="loading">Loading comments...</div>
                ) : comments.length > 0 ? (
                    <CommentList comments={comments} postId={postId} onCommentAdded={handleCommentAdded} />
                ) : (
                    <div className="no-comments">
                        <p>No comments yet. Be the first to comment!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostView;
