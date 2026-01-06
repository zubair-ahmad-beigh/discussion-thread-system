const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /posts
// @access  Public
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Validation
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both title and content'
            });
        }

        const post = await Post.create({
            title,
            content
        });

        res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating post',
            error: error.message
        });
    }
};

// @desc    Get a single post by ID
// @route   GET /posts/:id
// @access  Public
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error('Error fetching post:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching post',
            error: error.message
        });
    }
};

module.exports = {
    createPost,
    getPostById
};
