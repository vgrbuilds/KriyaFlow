const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { clerkMiddleware } = require('@clerk/express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error-handler'); // New: Error handling middleware

// Import your route files
const taskRoutes = require('./routes/task-routes');
const goalRoutes = require('./routes/goal-routes');
const eventRoutes = require('./routes/event-routes');
const bucketlistItemRoutes = require('./routes/bucketlist-routes');
const habitRoutes = require('./routes/habit-routes');
const userRoutes = require('./routes/user-routes'); // New: User routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Apply the Clerk middleware globally to all routes
// This populates the `req.auth` object with user details
app.use(clerkMiddleware());

// Use your protected API routes
app.use('/api/tasks', taskRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bucketlist-items', bucketlistItemRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/users', userRoutes);

// Simple public route (for testing)
app.get('/api/public', (req, res) => {
  res.status(200).json({ message: 'This is a public endpoint.' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
