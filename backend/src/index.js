require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

// ====================================
// MIDDLEWARE
// ====================================
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev")); // HTTP request logger

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ====================================
// ROUTES
// ====================================
app.get("/", (req, res) => {
  res.json({
    message: "CSCA API Server",
    version: "1.0.0",
    status: "running",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      posts: "/api/posts",
      exams: "/api/exams",
      stats: "/api/stats",
      materials: "/api/materials",
    },
  });
});

// Health check
app.get("/health", async (req, res) => {
  try {
    // Test database connection
    await db.query("SELECT NOW()");
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
    });
  }
});

// ====================================
// API ROUTES
// ====================================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api", require("./routes/exams"));
app.use("/api", require("./routes/upload"));
// app.use('/api/posts', require('./routes/posts'));
// app.use('/api/stats', require('./routes/stats'));
// app.use('/api/materials', require('./routes/materials'));

// ====================================
// ERROR HANDLING
// ====================================
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ====================================
// START SERVER
// ====================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     CSCA API Server Started            ║
╠════════════════════════════════════════╣
║  Port:        ${PORT}                     ║
║  Environment: ${process.env.NODE_ENV || "development"}          ║
║  Database:    ${process.env.DB_NAME || "csca_db"}             ║
╚════════════════════════════════════════╝
  `);
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

module.exports = app;
