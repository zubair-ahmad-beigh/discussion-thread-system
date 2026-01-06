const express = require('express');
const { createComment, getCommentsByPostId } = require('../controllers/commentController');

const router = express.Router();

// POST /comments - Create a new comment (top-level or reply)
router.post('/', createComment);

// GET /posts/:postId/comments - Get all comments for a post (nested tree)
router.get('/posts/:postId/comments', getCommentsByPostId);

module.exports = router;
