const User = require("../models/User");

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thông tin người dùng",
      error: error.message,
    });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/:id
 * @access  Private (own profile only)
 */
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, bio, target_score, display_name } = req.body;

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: "Bạn chỉ có thể cập nhật profile của chính mình",
      });
    }

    // Validate input
    const updates = {};
    if (full_name !== undefined) updates.full_name = full_name;
    if (bio !== undefined) updates.bio = bio;
    if (target_score !== undefined) updates.target_score = target_score;
    if (display_name !== undefined) updates.display_name = display_name;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Không có thông tin để cập nhật",
      });
    }

    const updatedUser = await User.update(id, updates);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật profile thành công",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi cập nhật profile",
      error: error.message,
    });
  }
};

/**
 * @desc    Update user avatar
 * @route   POST /api/users/:id/avatar
 * @access  Private (own profile only)
 */
exports.updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body; // URL from frontend (base64 or uploaded image URL)

    // Check if user is updating their own profile
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: "Bạn chỉ có thể cập nhật avatar của chính mình",
      });
    }

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp avatar URL",
      });
    }

    const updatedUser = await User.update(id, { avatar });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      message: "Cập nhật avatar thành công",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.error("Update avatar error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi cập nhật avatar",
      error: error.message,
    });
  }
};

/**
 * @desc    Get user stats
 * @route   GET /api/users/:id/stats
 * @access  Public
 */
exports.getUserStats = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Implement stats calculation when exam system is ready
    // For now, return mock data
    res.json({
      success: true,
      data: {
        total_exams: 0,
        avg_score: 0,
        highest_score: 0,
        total_posts: 0,
        total_comments: 0,
      },
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thống kê",
      error: error.message,
    });
  }
};
