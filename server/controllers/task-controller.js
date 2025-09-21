const Task = require('../models/task');
const Joi = require('joi');

// Joi schema for task creation
const createTaskSchema = Joi.object({
  text: Joi.string().trim().required().messages({
    'string.empty': 'Task text cannot be empty',
    'any.required': 'Task text is required',
  }),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional().messages({
    'any.only': 'Priority must be one of low, medium, or high',
  }),
});

// Joi schema for task update
const updateTaskSchema = Joi.object({
  text: Joi.string().trim().optional().messages({
    'string.empty': 'Task text cannot be empty',
  }),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional().messages({
    'any.only': 'Priority must be one of low, medium, or high',
  }),
  isCompleted: Joi.boolean().optional(),
});

// Get all tasks for the authenticated user
const getTasks = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Create a new task
const createTask = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const { text, dueDate, priority } = value; // Use validated value
    const newTask = new Task({ userId, text, dueDate, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// Update an existing task
const updateTask = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const taskId = req.params.id;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      value, // Use validated value
      { new: true }
    );
    if (!updatedTask) {
      const customError = new Error('Task not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete a task
const deleteTask = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const taskId = req.params.id;
    const deletedTask = await Task.findOneAndDelete(
      { _id: taskId, userId }
    );
    if (!deletedTask) {
      const customError = new Error('Task not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
