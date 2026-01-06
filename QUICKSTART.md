# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Setup (5 minutes)

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start MongoDB
```bash
mongod
```

### 3. Start Backend
```bash
cd backend
npm start
```
✓ Backend running on http://localhost:5000

### 4. Create Demo Data
Open a new terminal:
```bash
cd backend
node createDemoData.js
```
✓ Copy the Post ID from the output

### 5. Update Frontend
Edit `frontend/src/App.js` and replace the `demoPostId` with your Post ID:
```javascript
const demoPostId = 'YOUR_POST_ID_HERE';
```

### 6. Start Frontend
```bash
cd frontend
npm start
```
✓ App opens at http://localhost:3000

## You're Done! 🎉

Try:
- Adding a comment
- Replying to a comment
- Replying to a reply (test nesting!)

## API Testing

Test the API directly:
```bash
# Create a post
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"Post content"}'

# Add a comment (replace POST_ID)
curl -X POST http://localhost:5000/comments \
  -H "Content-Type: application/json" \
  -d '{"postId":"POST_ID","content":"My comment"}'
```

See [API_EXAMPLES.md](API_EXAMPLES.md) for more examples.
