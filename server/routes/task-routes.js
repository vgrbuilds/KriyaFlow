const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task-controller');
const { requireAuth } = require('../middleware/require-auth');

// Protect all task routes with the requireAuth middleware
router.use(requireAuth);

// Get all tasks for the authenticated user
router.get('/', taskController.getTasks);

// Create a new task
router.post('/', taskController.createTask);

// Update a task by its ID
router.put('/:id', taskController.updateTask);

// Delete a task by its ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
