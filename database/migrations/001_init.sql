-- ====================================
-- MIGRATION 001: Initial Database Setup
-- CSCA - Website Luyện Thi CSCA
-- Created: 2026-01-01
-- ====================================

-- Create database if not exists
-- Run this manually if needed: CREATE DATABASE csca_db;

-- Connect to database
\c csca_db;

-- Enable UUID extension (optional, for future use)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Run the main schema
\i schema.sql

-- Run seed data
\i seed.sql

-- Verify tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Show record counts
SELECT 
    'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'posts', COUNT(*) FROM posts
UNION ALL
SELECT 'comments', COUNT(*) FROM comments
UNION ALL
SELECT 'exams', COUNT(*) FROM exams
UNION ALL
SELECT 'questions', COUNT(*) FROM questions
UNION ALL
SELECT 'materials', COUNT(*) FROM materials;

-- ====================================
-- MIGRATION COMPLETE
-- ====================================
