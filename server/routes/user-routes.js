const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { requireAuth } = require('../middleware/require-auth');

// Public route for creating/getting user (e.g., after Clerk webhook or initial login)
router.post('/create-or-get', userController.createOrGetUser);

// All routes below this will require authentication
router.use(requireAuth);

// Get user profile
router.get('/profile', userController.getUserProfile);

// Update user profile
router.put('/profile', userController.updateUserProfile);

// Delete user
router.delete('/profile', userController.deleteUser);

module.exports = router;
