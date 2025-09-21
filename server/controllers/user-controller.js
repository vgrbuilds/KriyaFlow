const User = require('../models/user');
const Joi = require('joi');

// Joi schema for createOrGetUser
const createOrGetUserSchema = Joi.object({
  clerkUserId: Joi.string().required().messages({
    'any.required': 'Clerk User ID is required',
    'string.empty': 'Clerk User ID cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
  }),
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
});

// Joi schema for updateUserProfile
const updateUserProfileSchema = Joi.object({
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
  }),
});

// Create or get user (useful for Clerk webhooks or initial login)
const createOrGetUser = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = createOrGetUserSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const { clerkUserId, email, firstName, lastName } = value;

    let user = await User.findOne({ clerkUserId });

    if (!user) {
      user = new User({
        clerkUserId,
        email,
        firstName,
        lastName,
      });
      await user.save();
      return res.status(201).json(user);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Get user profile
const getUserProfile = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId; // From requireAuth middleware
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      const customError = new Error('User not found');
      customError.statusCode = 404;
      return next(customError);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateUserProfile = async (req, res, next) => {
  try {
    // Validate request body against schema
    const { error, value } = updateUserProfileSchema.validate(req.body);
    if (error) {
      const customError = new Error(error.details[0].message);
      customError.statusCode = 400;
      return next(customError);
    }

    const clerkUserId = req.auth.userId; // From requireAuth middleware

    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId },
      value, // Use validated value
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      const customError = new Error('User not found');
      customError.statusCode = 404;
      return next(customError);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId; // From requireAuth middleware

    const deletedUser = await User.findOneAndDelete({ clerkUserId });

    if (!deletedUser) {
      const customError = new Error('User not found');
      customError.statusCode = 404;
      return next(customError);
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrGetUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};