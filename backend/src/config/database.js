const { Pool } = require("pg");
require("dotenv").config();

// ====================================
// PostgreSQL Connection Pool
// ====================================
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "csca_db",
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
});

// ====================================
// Connection Event Handlers
// ====================================
pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected database error:", err);
  process.exit(-1);
});

// ====================================
// Query Helper Function
// ====================================
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV === "development") {
      console.log("Executed query", { text, duration, rows: res.rowCount });
    }

    return res;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

// ====================================
// Test Database Connection
// ====================================
const testConnection = async () => {
  try {
    const result = await pool.query(
      "SELECT NOW() as current_time, version() as version"
    );
    console.log("📊 Database Info:");
    console.log("   Time:", result.rows[0].current_time);
    console.log("   Version:", result.rows[0].version.split("\n")[0]);
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("   Please check your database configuration in .env file");
    return false;
  }
};

// Test connection on startup
testConnection();

// ====================================
// Export
// ====================================
module.exports = {
  query,
  pool,
  testConnection,
};
