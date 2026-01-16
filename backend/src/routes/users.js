const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

/**
 * @route   GET /api/users/:id/stats
 * @desc    Get user statistics
 * @access  Public
 * NOTE: Must be BEFORE /:id route to avoid conflict
 */
router.get("/:id/stats", userController.getUserStats);

/**
 * @route   POST /api/users/:id/avatar
 * @desc    Update user avatar
 * @access  Private (own profile only)
 */
router.post("/:id/avatar", authenticate, userController.updateAvatar);

/**
 * @route   GET /api/users/:id
 * @desc    Get user profile by ID
 * @access  Public
 */
router.get("/:id", userController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user profile
 * @access  Private (own profile only)
 */
router.put("/:id", authenticate, userController.updateProfile);

module.exports = router;
