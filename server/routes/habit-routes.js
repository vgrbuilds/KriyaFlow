const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit-controller');
const { requireAuth } = require('../middleware/require-auth');

// Protect all habit routes with the requireAuth middleware
router.use(requireAuth);

// Get all habits for the authenticated user
router.get('/', habitController.getHabits);

// Create a new habit
router.post('/', habitController.createHabit);

// Update a habit by its ID
router.put('/:id', habitController.updateHabit);

// Delete a habit by its ID
router.delete('/:id', habitController.deleteHabit);

module.exports = router;
