const path = require("path");
const fs = require("fs");

const uploadController = {
  // Upload ảnh cho câu hỏi
  uploadQuestionImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Không có file được upload",
        });
      }

      // Trả về URL của ảnh
      const imageUrl = `/uploads/questions/${req.file.filename}`;

      res.json({
        success: true,
        message: "Upload ảnh thành công",
        data: {
          filename: req.file.filename,
          url: imageUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error("Upload image error:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi upload ảnh",
        error: error.message,
      });
    }
  },

  // Upload nhiều ảnh cùng lúc
  uploadMultipleImages(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Không có file được upload",
        });
      }

      const images = req.files.map((file) => ({
        filename: file.filename,
        url: `/uploads/questions/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype,
      }));

      res.json({
        success: true,
        message: `Upload ${images.length} ảnh thành công`,
        data: images,
      });
    } catch (error) {
      console.error("Upload multiple images error:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi upload ảnh",
        error: error.message,
      });
    }
  },

  // Xóa ảnh
  deleteImage(req, res) {
    try {
      const { filename } = req.params;
      const filePath = path.join(
        __dirname,
        "../../uploads/questions",
        filename
      );

      // Kiểm tra file có tồn tại không
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy file",
        });
      }

      // Xóa file
      fs.unlinkSync(filePath);

      res.json({
        success: true,
        message: "Xóa ảnh thành công",
      });
    } catch (error) {
      console.error("Delete image error:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi khi xóa ảnh",
        error: error.message,
      });
    }
  },
};

module.exports = uploadController;
