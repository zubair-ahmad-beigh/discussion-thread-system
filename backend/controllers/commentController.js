const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { emitNewComment } = require('../socket/socketHandler');

// @desc    Create a new comment (top-level or reply)
// @route   POST /comments
// @access  Public
const createComment = async (req, res) => {
    try {
        const { postId, content, parentCommentId } = req.body;

        // Validation
        if (!postId || !content) {
            return res.status(400).json({
                success: false,
                message: 'Please provide postId and content'
            });
        }

        // Verify post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // If replying to a comment, verify parent comment exists
        if (parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({
                    success: false,
                    message: 'Parent comment not found'
                });
            }
        }

        const comment = await Comment.create({
            postId,
            content,
            parentCommentId: parentCommentId || null,
            author: req.user?._id || null
        });

        // Populate author before sending response
        await comment.populate('author', 'username email');

        // Emit socket event for real-time update
        emitNewComment(postId, comment);

        res.status(201).json({
            success: true,
            data: comment
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating comment',
            error: error.message
        });
    }
};

// @desc    Get all comments for a post (nested tree structure)
// @route   GET /posts/:postId/comments
// @access  Public
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;

        // Verify post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Fetch all comments for this post with author populated
        const allComments = await Comment.find({ postId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 }); // -1 for newest first

        // Build nested tree structure
        const commentTree = buildCommentTree(allComments);

        res.status(200).json({
            success: true,
            count: allComments.length,
            data: commentTree
        });
    } catch (error) {
        console.error('Error fetching comments:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching comments',
            error: error.message
        });
    }
};

/**
 * Build nested comment tree from flat array
 * @param {Array} comments - Flat array of all comments
 * @returns {Array} - Nested tree structure
 */
const buildCommentTree = (comments) => {
    // Create a map for quick lookup
    const commentMap = {};
    const tree = [];

    // First pass: Create map of all comments
    comments.forEach(comment => {
        const commentObj = comment.toObject();
        commentObj.replies = [];
        commentMap[commentObj._id] = commentObj;
    });

    // Second pass: Build tree structure
    comments.forEach(comment => {
        const commentObj = commentMap[comment._id];

        if (comment.parentCommentId) {
            // This is a reply, add it to parent's replies array
            const parent = commentMap[comment.parentCommentId];
            if (parent) {
                parent.replies.push(commentObj);
            }
        } else {
            // This is a top-level comment
            tree.push(commentObj);
        }
    });

    return tree;
};

module.exports = {
    createComment,
    getCommentsByPostId
};
