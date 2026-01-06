const express = require('express');
const { createPost, getPostById } = require('../controllers/postController');

const router = express.Router();

// POST /posts - Create a new post
router.post('/', createPost);

// GET /posts/:id - Get a single post by ID
router.get('/:id', getPostById);

module.exports = router;
