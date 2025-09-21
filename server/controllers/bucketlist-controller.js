const BucketlistItem = require('../models/bucketlist-item');
const Joi = require('joi');

// Joi schema for bucketlist item creation
const createBucketlistItemSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Bucketlist item title cannot be empty',
    'any.required': 'Bucketlist item title is required',
  }),
  description: Joi.string().trim().optional(),
  isCompleted: Joi.boolean().optional().default(false),
  completedDate: Joi.date().optional(),
});

// Joi schema for bucketlist item update
const updateBucketlistItemSchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    'string.empty': 'Bucketlist item title cannot be empty',
  }),
  description: Joi.string().trim().optional(),
  isCompleted: Joi.boolean().optional(),
  completedDate: Joi.date().optional(),
});

// Get all bucketlist items for the authenticated user
const getBucketlistItems = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const items = await BucketlistItem.find({ userId });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Create a new bucketlist item
const createBucketlistItem = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = createBucketlistItemSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const newItem = new BucketlistItem({ ...value, userId }); // Use validated value
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Update a bucketlist item
const updateBucketlistItem = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = updateBucketlistItemSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const userId = req.auth.userId;
    const itemId = req.params.id;
    const updatedItem = await BucketlistItem.findOneAndUpdate(
      { _id: itemId, userId },
      value, // Use validated value
      { new: true }
    );
    if (!updatedItem) {
      const customError = new Error('Item not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

// Delete a bucketlist item
const deleteBucketlistItem = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const itemId = req.params.id;
    const deletedItem = await BucketlistItem.findOneAndDelete(
      { _id: itemId, userId }
    );
    if (!deletedItem) {
      const customError = new Error('Item not found or unauthorized');
      customError.statusCode = 404;
      return next(customError);
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBucketlistItems,
  createBucketlistItem,
  updateBucketlistItem,
  deleteBucketlistItem
};