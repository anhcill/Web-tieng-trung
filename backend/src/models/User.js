const db = require("../config/database");
const bcrypt = require("bcrypt");

/**
 * User Model
 * Handles all database operations related to users
 */

class User {
  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {Object|null} User object or null
   */
  static async findById(id) {
    try {
      const result = await db.query(
        "SELECT id, username, email, full_name, full_name as display_name, avatar, role, bio, phone, study_goal, target_score, is_verified, is_active, created_at, updated_at FROM users WHERE id = $1",
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Object|null} User object or null
   */
  static async findByEmail(email) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by username
   * @param {string} username - Username
   * @returns {Object|null} User object or null
   */
  static async findByUsername(username) {
    try {
      const result = await db.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new user
   * @param {Object} userData - User data
   * @returns {Object} Created user
   */
  static async create(userData) {
    const { username, email, password, full_name, role = "student" } = userData;

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.query(
        `INSERT INTO users (username, email, password, full_name, role, avatar)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, username, email, full_name, avatar, role, created_at`,
        [
          username,
          email,
          hashedPassword,
          full_name || username,
          role,
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
          )}&background=4F46E5&color=fff`,
        ]
      );

      // Create user stats entry
      await db.query("INSERT INTO user_stats (user_id) VALUES ($1)", [
        result.rows[0].id,
      ]);

      return result.rows[0];
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation
        if (error.constraint === "users_email_key") {
          throw new Error("Email already exists");
        }
        if (error.constraint === "users_username_key") {
          throw new Error("Username already exists");
        }
      }
      throw error;
    }
  }

  /**
   * Update user by ID
   * @param {number} id - User ID
   * @param {Object} updates - Fields to update
   * @returns {Object} Updated user
   */
  static async update(id, updates) {
    try {
      const allowedFields = [
        "full_name",
        "avatar",
        "bio",
        "phone",
        "study_goal",
        "target_score",
      ];

      // Map display_name to full_name
      if (updates.display_name) {
        updates.full_name = updates.display_name;
        delete updates.display_name;
      }

      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key)) {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      }

      if (fields.length === 0) {
        throw new Error("No valid fields to update");
      }

      values.push(id);
      const query = `
        UPDATE users 
        SET ${fields.join(", ")}
        WHERE id = $${paramCount}
        RETURNING id, username, email, full_name, full_name as display_name, avatar, role, bio, phone, study_goal, target_score, created_at, updated_at
      `;

      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update password
   * @param {number} id - User ID
   * @param {string} newPassword - New password
   * @returns {boolean} Success
   */
  static async updatePassword(id, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query("UPDATE users SET password = $1 WHERE id = $2", [
        hashedPassword,
        id,
      ]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Compare password
   * @param {string} candidatePassword - Password to check
   * @param {string} hashedPassword - Hashed password from DB
   * @returns {boolean} Match result
   */
  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  /**
   * Delete user by ID
   * @param {number} id - User ID
   * @returns {boolean} Success
   */
  static async delete(id) {
    try {
      await db.query("DELETE FROM users WHERE id = $1", [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all users with pagination
   * @param {number} limit - Limit
   * @param {number} offset - Offset
   * @returns {Array} Users array
   */
  static async findAll(limit = 10, offset = 0) {
    try {
      const result = await db.query(
        `SELECT id, username, email, full_name, avatar, role, bio, target_score, created_at
         FROM users
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
