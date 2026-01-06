# API Examples and Schema Documentation

## Sample API Requests and Responses

### 1. Create a Post

**Request:**
```bash
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Understanding Nested Comments",
    "content": "In this post, we will discuss how nested comments work in discussion systems like Reddit and GitHub."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6789abcdef1234567890abcd",
    "title": "Understanding Nested Comments",
    "content": "In this post, we will discuss how nested comments work in discussion systems like Reddit and GitHub.",
    "createdAt": "2026-01-06T18:30:00.000Z",
    "__v": 0
  }
}
```

---

### 2. Get a Post by ID

**Request:**
```bash
curl http://localhost:5000/posts/6789abcdef1234567890abcd
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6789abcdef1234567890abcd",
    "title": "Understanding Nested Comments",
    "content": "In this post, we will discuss how nested comments work in discussion systems like Reddit and GitHub.",
    "createdAt": "2026-01-06T18:30:00.000Z",
    "__v": 0
  }
}
```

---

### 3. Create a Top-Level Comment

**Request:**
```bash
curl -X POST http://localhost:5000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "6789abcdef1234567890abcd",
    "content": "Great explanation! I learned a lot from this."
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "comment1111111111111111111",
    "postId": "6789abcdef1234567890abcd",
    "content": "Great explanation! I learned a lot from this.",
    "parentCommentId": null,
    "createdAt": "2026-01-06T18:35:00.000Z",
    "__v": 0
  }
}
```

---

### 4. Create a Reply to a Comment

**Request:**
```bash
curl -X POST http://localhost:5000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "postId": "6789abcdef1234567890abcd",
    "content": "I agree! The tree structure makes it easy to follow conversations.",
    "parentCommentId": "comment1111111111111111111"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "comment2222222222222222222",
    "postId": "6789abcdef1234567890abcd",
    "content": "I agree! The tree structure makes it easy to follow conversations.",
    "parentCommentId": "comment1111111111111111111",
    "createdAt": "2026-01-06T18:36:00.000Z",
    "__v": 0
  }
}
```

---

### 5. Get All Comments for a Post (Nested Tree)

**Request:**
```bash
curl http://localhost:5000/comments/posts/6789abcdef1234567890abcd/comments
```

**Response:**
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "_id": "comment1111111111111111111",
      "postId": "6789abcdef1234567890abcd",
      "content": "Great explanation! I learned a lot from this.",
      "parentCommentId": null,
      "createdAt": "2026-01-06T18:35:00.000Z",
      "__v": 0,
      "replies": [
        {
          "_id": "comment2222222222222222222",
          "postId": "6789abcdef1234567890abcd",
          "content": "I agree! The tree structure makes it easy to follow conversations.",
          "parentCommentId": "comment1111111111111111111",
          "createdAt": "2026-01-06T18:36:00.000Z",
          "__v": 0,
          "replies": [
            {
              "_id": "comment3333333333333333333",
              "postId": "6789abcdef1234567890abcd",
              "content": "Exactly! It's much better than flat comment threads.",
              "parentCommentId": "comment2222222222222222222",
              "createdAt": "2026-01-06T18:37:00.000Z",
              "__v": 0,
              "replies": []
            }
          ]
        },
        {
          "_id": "comment4444444444444444444",
          "postId": "6789abcdef1234567890abcd",
          "content": "Thanks for sharing your thoughts!",
          "parentCommentId": "comment1111111111111111111",
          "createdAt": "2026-01-06T18:38:00.000Z",
          "__v": 0,
          "replies": []
        }
      ]
    },
    {
      "_id": "comment5555555555555555555",
      "postId": "6789abcdef1234567890abcd",
      "content": "This is another top-level comment.",
      "parentCommentId": null,
      "createdAt": "2026-01-06T18:39:00.000Z",
      "__v": 0,
      "replies": [
        {
          "_id": "comment6666666666666666666",
          "postId": "6789abcdef1234567890abcd",
          "content": "Reply to the second top-level comment.",
          "parentCommentId": "comment5555555555555555555",
          "createdAt": "2026-01-06T18:40:00.000Z",
          "__v": 0,
          "replies": []
        }
      ]
    },
    {
      "_id": "comment7777777777777777777",
      "postId": "6789abcdef1234567890abcd",
      "content": "Third top-level comment with no replies.",
      "parentCommentId": null,
      "createdAt": "2026-01-06T18:41:00.000Z",
      "__v": 0,
      "replies": []
    }
  ]
}
```

---

## MongoDB Schema Details

### Post Collection

**Collection Name:** `posts`

**Schema:**
```javascript
{
  _id: ObjectId,              // Auto-generated by MongoDB
  title: String,              // Required, max 200 characters
  content: String,            // Required, no max length
  createdAt: Date,            // Auto-generated, default: Date.now
  __v: Number                 // Version key (Mongoose)
}
```

**Example Document:**
```json
{
  "_id": "6789abcdef1234567890abcd",
  "title": "Understanding Nested Comments",
  "content": "In this post, we will discuss how nested comments work...",
  "createdAt": "2026-01-06T18:30:00.000Z",
  "__v": 0
}
```

---

### Comment Collection

**Collection Name:** `comments`

**Schema:**
```javascript
{
  _id: ObjectId,              // Auto-generated by MongoDB
  postId: ObjectId,           // Required, references Post._id
  content: String,            // Required, max 1000 characters
  parentCommentId: ObjectId,  // Optional, references Comment._id (null for top-level)
  createdAt: Date,            // Auto-generated, default: Date.now
  __v: Number                 // Version key (Mongoose)
}
```

**Indexes:**
```javascript
{
  postId: 1,
  parentCommentId: 1
}
```

**Example Documents:**

Top-level comment:
```json
{
  "_id": "comment1111111111111111111",
  "postId": "6789abcdef1234567890abcd",
  "content": "Great explanation! I learned a lot from this.",
  "parentCommentId": null,
  "createdAt": "2026-01-06T18:35:00.000Z",
  "__v": 0
}
```

Reply comment:
```json
{
  "_id": "comment2222222222222222222",
  "postId": "6789abcdef1234567890abcd",
  "content": "I agree! The tree structure makes it easy to follow conversations.",
  "parentCommentId": "comment1111111111111111111",
  "createdAt": "2026-01-06T18:36:00.000Z",
  "__v": 0
}
```

---

## Nested Comment Tree Structure

### How It Works

1. **Flat Storage**: Comments are stored flat in MongoDB with a `parentCommentId` reference
2. **Tree Building**: The backend builds the tree structure using a two-pass algorithm
3. **Response Format**: The API returns a nested tree with `replies` arrays

### Visual Representation

**Database (Flat):**
```
Comment 1 (parentCommentId: null)
Comment 2 (parentCommentId: Comment 1)
Comment 3 (parentCommentId: Comment 2)
Comment 4 (parentCommentId: Comment 1)
Comment 5 (parentCommentId: null)
```

**API Response (Nested Tree):**
```
Comment 1
├── Comment 2
│   └── Comment 3
└── Comment 4
Comment 5
```

### Tree Building Algorithm

```javascript
// Simplified version of the algorithm
function buildCommentTree(comments) {
  const commentMap = {};
  const tree = [];

  // First pass: Create map
  comments.forEach(comment => {
    comment.replies = [];
    commentMap[comment._id] = comment;
  });

  // Second pass: Build tree
  comments.forEach(comment => {
    if (comment.parentCommentId) {
      // Add to parent's replies
      commentMap[comment.parentCommentId].replies.push(comment);
    } else {
      // Top-level comment
      tree.push(comment);
    }
  });

  return tree;
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide both title and content"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Post not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error while creating post",
  "error": "Detailed error message (in development mode)"
}
```

---

## Testing the API

### Using curl

```bash
# Create a post
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Test content"}'

# Get the post (replace ID)
curl http://localhost:5000/posts/YOUR_POST_ID

# Add a comment
curl -X POST http://localhost:5000/comments \
  -H "Content-Type: application/json" \
  -d '{"postId":"YOUR_POST_ID","content":"Test comment"}'

# Get comments
curl http://localhost:5000/comments/posts/YOUR_POST_ID/comments
```

### Using Postman

1. Import the endpoints as a new collection
2. Set the base URL to `http://localhost:5000`
3. Use the JSON examples above as request bodies
4. Test the nested comment structure by creating multiple levels of replies
