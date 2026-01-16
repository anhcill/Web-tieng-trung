-- Bảng môn học
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_cn VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng đề thi
CREATE TABLE exams (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    title_cn VARCHAR(200),
    description TEXT,
    duration INTEGER NOT NULL, -- phút
    total_questions INTEGER NOT NULL,
    total_points DECIMAL(5,2) NOT NULL,
    difficulty_level VARCHAR(20), -- easy, medium, hard
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    publish_date TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng câu hỏi
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question_type VARCHAR(20) DEFAULT 'single_choice', -- single_choice, multiple_choice, true_false
    question_text TEXT NOT NULL,
    question_text_cn TEXT,
    question_text_en TEXT,
    question_image_url VARCHAR(500),
    explanation TEXT,
    explanation_cn TEXT,
    points DECIMAL(4,2) DEFAULT 3.00,
    difficulty VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exam_id, question_number)
);

-- Bảng đáp án
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    answer_key CHAR(1) NOT NULL, -- A, B, C, D
    answer_text TEXT NOT NULL,
    answer_text_cn TEXT,
    answer_text_en TEXT,
    is_correct BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng lượt thi
CREATE TABLE exam_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    exam_id INTEGER REFERENCES exams(id),
    attempt_number INTEGER DEFAULT 1,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    submit_time TIMESTAMP,
    duration_seconds INTEGER,
    total_score DECIMAL(5,2),
    total_correct INTEGER,
    total_incorrect INTEGER,
    total_unanswered INTEGER,
    status VARCHAR(20) DEFAULT 'in_progress', -- in_progress, completed, submitted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, exam_id, attempt_number)
);

-- Bảng câu trả lời của user
CREATE TABLE user_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER REFERENCES exam_attempts(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id),
    selected_answer_id INTEGER REFERENCES answers(id),
    selected_answer_key CHAR(1),
    is_correct BOOLEAN,
    time_spent_seconds INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(attempt_id, question_id)
);

-- Bảng thống kê dạng bài (để phân tích điểm yếu)
CREATE TABLE question_topics (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id),
    name VARCHAR(200) NOT NULL,
    name_cn VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng mapping câu hỏi với chủ đề
CREATE TABLE question_topic_mapping (
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    topic_id INTEGER REFERENCES question_topics(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, topic_id)
);

-- Bảng thống kê user theo topic (để tính phần trăm sai)
CREATE TABLE user_topic_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    subject_id INTEGER REFERENCES subjects(id),
    topic_id INTEGER REFERENCES question_topics(id),
    total_questions INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    incorrect_answers INTEGER DEFAULT 0,
    error_percentage DECIMAL(5,2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, subject_id, topic_id)
);

-- Indexes để tăng performance
CREATE INDEX idx_exams_subject ON exams(subject_id);
CREATE INDEX idx_exams_status ON exams(status);
CREATE INDEX idx_questions_exam ON questions(exam_id);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_exam_attempts_user ON exam_attempts(user_id);
CREATE INDEX idx_exam_attempts_exam ON exam_attempts(exam_id);
CREATE INDEX idx_user_answers_attempt ON user_answers(attempt_id);
CREATE INDEX idx_user_topic_stats_user ON user_topic_stats(user_id, subject_id);

-- Insert sample subjects
INSERT INTO subjects (code, name, name_cn) VALUES
('MATH', 'Toán', '数学'),
('PHYSICS', 'Vật lý', '物理'),
('CHEMISTRY', 'Hóa học', '化学'),
('CHINESE_SOC', 'Tiếng Trung Xã hội', '汉语（社会科学）'),
('CHINESE_SCI', 'Tiếng Trung Tự nhiên', '汉语（自然科学）');

-- Insert sample topics for Physics
INSERT INTO question_topics (subject_id, name, name_cn) VALUES
((SELECT id FROM subjects WHERE code = 'PHYSICS'), 'Cơ học', '力学'),
((SELECT id FROM subjects WHERE code = 'PHYSICS'), 'Điện học', '电学'),
((SELECT id FROM subjects WHERE code = 'PHYSICS'), 'Quang học', '光学'),
((SELECT id FROM subjects WHERE code = 'PHYSICS'), 'Nhiệt học', '热学'),
((SELECT id FROM subjects WHERE code = 'PHYSICS'), 'Vật lý hạt nhân', '核物理');
