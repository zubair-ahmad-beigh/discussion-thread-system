import React from 'react';
import CommentItem from './CommentItem';
import './CommentList.css';

const CommentList = ({ comments, postId, onCommentAdded, depth = 0 }) => {
    if (!comments || comments.length === 0) {
        return <div className="no-comments">No comments yet. Be the first to comment!</div>;
    }

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={postId}
                    onCommentAdded={onCommentAdded}
                    depth={depth}
                />
            ))}
        </div>
    );
};

export default CommentList;
