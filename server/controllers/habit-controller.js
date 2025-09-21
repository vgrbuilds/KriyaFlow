const Habit = require('../models/habit');
const Joi = require('joi');

// Joi schema for habit creation
const createHabitSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Habit name cannot be empty',
    'any.required': 'Habit name is required',
  }),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').optional().messages({
    'any.only': 'Frequency must be one of daily, weekly, or monthly',
  }),
  streak: Joi.number().integer().min(0).optional().default(0),
  completionHistory: Joi.array().items(Joi.date()).optional(),
});

// Joi schema for habit update
const updateHabitSchema = Joi.object({
  name: Joi.string().trim().optional().messages({
    'string.empty': 'Habit name cannot be empty',
  }),
  frequency: Joi.string().valid('daily', 'weekly', 'monthly').optional().messages({
    'any.only': 'Frequency must be one of daily, weekly, or monthly',
  }),
  streak: Joi.number().integer().min(0).optional(),
  completionHistory: Joi.array().items(Joi.date()).optional(),
});

// Get all habits for the authenticated user
const getHabits = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const habits = await Habit.find({ userId });
    res.json(habits);
  } catch (error) {
    next(error);
  }
};

// Create a new habit
const createHabit = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = createHabitSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const newHabit = new Habit({ ...value, userId }); // Use validated value
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    next(error);
  }
};

// Update a habit
const updateHabit = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = updateHabitSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const habitId = req.params.id;
    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: habitId, userId },
      value, // Use validated value
      { new: true }
    );
    if (!updatedHabit) {
      const customError = new Error('Habit not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json(updatedHabit);
  } catch (error) {
    next(error);
  }
};

// Delete a habit
const deleteHabit = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const habitId = req.params.id;
    const deletedHabit = await Habit.findOneAndDelete(
      { _id: habitId, userId }
    );
    if (!deletedHabit) {
      const customError = new Error('Habit not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit
};