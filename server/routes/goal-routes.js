const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal-controller');
const { requireAuth } = require('../middleware/require-auth');

// Protect all goal routes with the requireAuth middleware
router.use(requireAuth);

// Get all goals for the authenticated user
router.get('/', goalController.getGoals);

// Create a new goal
router.post('/', goalController.createGoal);

// Update a goal by its ID
router.put('/:id', goalController.updateGoal);

// Delete a goal by its ID
router.delete('/:id', goalController.deleteGoal);

module.exports = router;
