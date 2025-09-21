const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event-controller');
const { requireAuth } = require('../middleware/require-auth');

// Protect all event routes with the requireAuth middleware
router.use(requireAuth);

// Get all events for the authenticated user
router.get('/', eventController.getEvents);

// Create a new event
router.post('/', eventController.createEvent);

// Update an event by its ID
router.put('/:id', eventController.updateEvent);

// Delete an event by its ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
