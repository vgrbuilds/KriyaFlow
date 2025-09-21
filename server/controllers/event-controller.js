const Event = require('../models/event');
const Joi = require('joi');

// Joi schema for event creation
const createEventSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Event name cannot be empty',
    'any.required': 'Event name is required',
  }),
  start: Joi.date().required().messages({
    'any.required': 'Start date is required',
    'date.base': 'Start date must be a valid date',
  }),
  end: Joi.date().required().greater(Joi.ref('start')).messages({
    'any.required': 'End date is required',
    'date.base': 'End date must be a valid date',
    'date.greater': 'End date must be after start date',
  }),
  location: Joi.string().trim().optional(),
  notes: Joi.string().trim().optional(),
});

// Joi schema for event update
const updateEventSchema = Joi.object({
  name: Joi.string().trim().optional().messages({
    'string.empty': 'Event name cannot be empty',
  }),
  start: Joi.date().optional().messages({
    'date.base': 'Start date must be a valid date',
  }),
  end: Joi.date().optional().greater(Joi.ref('start')).messages({
    'date.base': 'End date must be a valid date',
    'date.greater': 'End date must be after start date',
  }),
  location: Joi.string().trim().optional(),
  notes: Joi.string().trim().optional(),
});

// Get all events for the authenticated user
const getEvents = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const events = await Event.find({ userId });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// Create a new event
const createEvent = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = createEventSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const newEvent = new Event({ ...value, userId }); // Use validated value
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

// Update an event
const updateEvent = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = updateEventSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const eventId = req.params.id;
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, userId },
      value, // Use validated value
      { new: true }
    );
    if (!updatedEvent) {
      const customError = new Error('Event not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

// Delete an event
const deleteEvent = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const eventId = req.params.id;
    const deletedEvent = await Event.findOneAndDelete(
      { _id: eventId, userId }
    );
    if (!deletedEvent) {
      const customError = new Error('Event not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};