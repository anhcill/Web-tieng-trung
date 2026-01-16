const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const { authenticate } = require("../middleware/authMiddleware");

// Public routes
router.get("/subjects/:subjectCode/exams", examController.getExamsBySubject);
router.get("/exams/:examId", examController.getExamDetail);

// Protected routes - Require authentication
router.post("/exams/:examId/start", authenticate, examController.startExam);
router.post(
  "/attempts/:attemptId/answers",
  authenticate,
  examController.saveAnswer
);
router.post(
  "/attempts/:attemptId/submit",
  authenticate,
  examController.submitExam
);
router.get("/history", authenticate, examController.getHistory);
router.get(
  "/attempts/:attemptId",
  authenticate,
  examController.getAttemptDetail
);
router.get(
  "/subjects/:subjectCode/stats",
  authenticate,
  examController.getTopicStats
);

// Admin routes - Require admin role
router.post("/exams", authenticate, examController.createExam);
router.put("/exams/:examId", authenticate, examController.updateExam);
router.delete("/exams/:examId", authenticate, examController.deleteExam);
router.post(
  "/exams/:examId/questions",
  authenticate,
  examController.createQuestion
);

module.exports = router;
