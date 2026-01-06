const axios = require('axios');

const API_URL = 'http://localhost:5000';

async function createDemoData() {
    try {
        console.log('Creating demo post...');

        // Create a post
        const postResponse = await axios.post(`${API_URL}/posts`, {
            title: 'Welcome to the Discussion Thread System!',
            content: 'This is a demonstration of a Reddit-style discussion platform with unlimited nested comments. Try adding comments and replies to see how the nesting works!'
        });

        const postId = postResponse.data.data._id;
        console.log(`✓ Post created with ID: ${postId}`);

        // Create top-level comments
        console.log('\nCreating comments...');

        const comment1 = await axios.post(`${API_URL}/comments`, {
            postId,
            content: 'This is amazing! The nested comment system works perfectly.'
        });
        console.log(`✓ Comment 1 created`);

        const comment2 = await axios.post(`${API_URL}/comments`, {
            postId,
            content: 'I love how clean the UI is. Great job!'
        });
        console.log(`✓ Comment 2 created`);

        // Create replies
        const reply1 = await axios.post(`${API_URL}/comments`, {
            postId,
            content: 'I agree! The visual indentation makes it easy to follow conversations.',
            parentCommentId: comment1.data.data._id
        });
        console.log(`✓ Reply to Comment 1 created`);

        const reply2 = await axios.post(`${API_URL}/comments`, {
            postId,
            content: 'Exactly! And you can nest replies infinitely.',
            parentCommentId: reply1.data.data._id
        });
        console.log(`✓ Nested reply created`);

        const reply3 = await axios.post(`${API_URL}/comments`, {
            postId,
            content: 'Thanks! The design is inspired by Reddit and GitHub Discussions.',
            parentCommentId: comment2.data.data._id
        });
        console.log(`✓ Reply to Comment 2 created`);

        // Fetch and display the comment tree
        console.log('\nFetching comment tree...');
        const commentsResponse = await axios.get(`${API_URL}/comments/posts/${postId}/comments`);

        console.log(`\n✓ Successfully fetched ${commentsResponse.data.count} comments`);
        console.log('\nComment Tree Structure:');
        console.log(JSON.stringify(commentsResponse.data.data, null, 2));

        console.log('\n' + '='.repeat(60));
        console.log('DEMO DATA CREATED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log(`\nPost ID: ${postId}`);
        console.log('\nNext steps:');
        console.log('1. Update the postId in frontend/src/App.js');
        console.log(`   Replace the demoPostId with: "${postId}"`);
        console.log('2. Start the frontend: cd frontend && npm start');
        console.log('3. Open http://localhost:3000 in your browser');
        console.log('\n' + '='.repeat(60));

    } catch (error) {
        console.error('Error creating demo data:');
        if (error.response) {
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            console.error('Request error: No response received');
            console.error('Make sure the backend server is running on http://localhost:5000');
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

createDemoData();
