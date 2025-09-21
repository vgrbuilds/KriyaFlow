const Goal = require('../models/goal');
const Joi = require('joi');

// Joi schema for goal creation
const createGoalSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Goal title cannot be empty',
    'any.required': 'Goal title is required',
  }),
  description: Joi.string().trim().optional(),
  status: Joi.string().valid('in-progress', 'completed', 'on-hold').optional().messages({
    'any.only': 'Status must be one of in-progress, completed, or on-hold',
  }),
  targetDate: Joi.date().optional(),
  tasks: Joi.array().items(Joi.string().hex().length(24)).optional(), // Assuming tasks are ObjectId strings
});

// Joi schema for goal update
const updateGoalSchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    'string.empty': 'Goal title cannot be empty',
  }),
  description: Joi.string().trim().optional(),
  status: Joi.string().valid('in-progress', 'completed', 'on-hold').optional().messages({
    'any.only': 'Status must be one of in-progress, completed, or on-hold',
  }),
  targetDate: Joi.date().optional(),
  tasks: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

// Get all goals for the authenticated user
const getGoals = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const goals = await Goal.find({ userId });
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

// Create a new goal
const createGoal = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = createGoalSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const newGoal = new Goal({ ...value, userId }); // Use validated value
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    next(error);
  }
};

// Update a goal
const updateGoal = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = updateGoalSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const goalId = req.params.id;
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: goalId, userId },
      value, // Use validated value
      { new: true }
    );
    if (!updatedGoal) {
      const customError = new Error('Goal not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// Delete a goal
const deleteGoal = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const goalId = req.params.id;
    const deletedGoal = await Goal.findOneAndDelete(
      { _id: goalId, userId }
    );
    if (!deletedGoal) {
      const customError = new Error('Goal not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
};