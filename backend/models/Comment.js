const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post ID is required']
    },
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        trim: true,
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for backward compatibility with existing comments
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
commentSchema.index({ postId: 1, parentCommentId: 1 });

module.exports = mongoose.model('Comment', commentSchema);
