import React, { useState } from 'react';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import './CommentItem.css';

const CommentItem = ({ comment, postId, onCommentAdded, depth = 0 }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleReplyClick = () => {
        setShowReplyForm(!showReplyForm);
    };

    const handleReplyAdded = () => {
        setShowReplyForm(false);
        onCommentAdded();
    };

    // Calculate indentation based on depth
    const indentStyle = {
        marginLeft: depth > 0 ? `${Math.min(depth * 40, 160)}px` : '0',
    };

    const authorName = comment.author?.username || 'Anonymous';

    return (
        <div className="comment-item" style={indentStyle}>
            <div className={`comment-card ${depth > 0 ? 'nested' : ''}`}>
                <div className="comment-header">
                    <Avatar username={authorName} size="medium" />
                    <div className="comment-author-info">
                        <span className="comment-author">{authorName}</span>
                        <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>

                <div className="comment-content">
                    <p>{comment.content}</p>
                </div>

                <div className="comment-actions">
                    <button
                        className="reply-button"
                        onClick={handleReplyClick}
                    >
                        💬 {showReplyForm ? 'Cancel' : 'Reply'}
                    </button>
                </div>

                {showReplyForm && (
                    <div className="reply-form-container">
                        <p className="replying-to">Replying to {authorName}</p>
                        <CommentForm
                            postId={postId}
                            parentCommentId={comment._id}
                            onCommentAdded={handleReplyAdded}
                            onCancel={() => setShowReplyForm(false)}
                        />
                    </div>
                )}
            </div>

            {/* Recursively render replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="comment-replies">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply._id}
                            comment={reply}
                            postId={postId}
                            onCommentAdded={onCommentAdded}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
