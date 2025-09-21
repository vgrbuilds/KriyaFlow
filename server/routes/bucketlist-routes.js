const express = require('express');
const router = express.Router();
const bucketlistItemController = require('../controllers/bucketlist-controller');
const { requireAuth } = require('../middleware/require-auth');

// Protect all bucketlist-item routes with the requireAuth middleware
router.use(requireAuth);

// Get all bucketlist-items for the authenticated user
router.get('/', bucketlistItemController.getBucketlistItems);

// Create a new bucketlist-item
router.post('/', bucketlistItemController.createBucketlistItem);

// Update a bucketlist-item by its ID
router.put('/:id', bucketlistItemController.updateBucketlistItem);

// Delete a bucketlist-item by its ID
router.delete('/:id', bucketlistItemController.deleteBucketlistItem);

module.exports = router;
