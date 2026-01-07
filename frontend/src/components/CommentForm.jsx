import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './CommentForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CommentForm = ({ postId, parentCommentId = null, onCommentAdded, onCancel }) => {
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

            await axios.post(`${API_URL}/comments`, {
                postId,
                content: content.trim(),
                parentCommentId
            }, { headers });

            setContent('');
            onCommentAdded();
        } catch (err) {
            setError('Failed to post comment. Please try again.');
            console.error('Error posting comment:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                className="comment-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={parentCommentId ? "Write a reply..." : "Write a comment..."}
                rows="3"
                disabled={submitting}
            />

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
                <button
                    type="submit"
                    className="submit-button"
                    disabled={submitting || !content.trim()}
                >
                    {submitting ? 'Posting...' : (parentCommentId ? '📤 Post Reply' : '📤 Post Comment')}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CommentForm;
