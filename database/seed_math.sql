-- Seed data for Math (Toán) subject

-- Insert topics for Math
INSERT INTO question_topics (subject_id, name, name_cn) VALUES
((SELECT id FROM subjects WHERE code = 'MATH'), 'Hình học không gian', '空间几何'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Toán ứng dụng', '应用数学'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Bài toán cực trị có tham số', '含参数的极值问题'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Parabol – elip – hyperbol', '抛物线-椭圆-双曲线'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Phương trình mũ Logarit', '指数对数方程'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Tập hàm số', '函数集合'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Xác suất cổ điển', '古典概率'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Cấp số công/Cấp số nhân', '等差数列/等比数列'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Đạo hàm và ứng dụng', '导数及应用'),
((SELECT id FROM subjects WHERE code = 'MATH'), 'Tích phân', '积分');

-- Create Math exam
INSERT INTO exams (
    subject_id, 
    code, 
    title, 
    title_cn,
    description,
    duration,
    total_questions,
    total_points,
    difficulty_level,
    status,
    publish_date
) VALUES (
    (SELECT id FROM subjects WHERE code = 'MATH'),
    'MATH_001',
    'Đề thi Toán mẫu 001',
    '数学样题001',
    'Đề thi thử Toán - CSCA',
    90,
    15,
    45,
    'medium',
    'published',
    CURRENT_TIMESTAMP
);

-- Variable to store exam_id
DO $$
DECLARE
    exam_id_var INTEGER;
    q_id INTEGER;
    topic_hinh_hoc INTEGER;
    topic_toan_ud INTEGER;
    topic_cuc_tri INTEGER;
    topic_parabol INTEGER;
    topic_logarit INTEGER;
    topic_ham_so INTEGER;
    topic_xac_suat INTEGER;
    topic_cap_so INTEGER;
    topic_dao_ham INTEGER;
    topic_tich_phan INTEGER;
BEGIN
    -- Get exam and topic IDs
    SELECT id INTO exam_id_var FROM exams WHERE code = 'MATH_001';
    SELECT id INTO topic_hinh_hoc FROM question_topics WHERE name = 'Hình học không gian';
    SELECT id INTO topic_toan_ud FROM question_topics WHERE name = 'Toán ứng dụng';
    SELECT id INTO topic_cuc_tri FROM question_topics WHERE name = 'Bài toán cực trị có tham số';
    SELECT id INTO topic_parabol FROM question_topics WHERE name = 'Parabol – elip – hyperbol';
    SELECT id INTO topic_logarit FROM question_topics WHERE name = 'Phương trình mũ Logarit';
    SELECT id INTO topic_ham_so FROM question_topics WHERE name = 'Tập hàm số';
    SELECT id INTO topic_xac_suat FROM question_topics WHERE name = 'Xác suất cổ điển';
    SELECT id INTO topic_cap_so FROM question_topics WHERE name = 'Cấp số công/Cấp số nhân';
    SELECT id INTO topic_dao_ham FROM question_topics WHERE name = 'Đạo hàm và ứng dụng';
    SELECT id INTO topic_tich_phan FROM question_topics WHERE name = 'Tích phân';

    -- Question 1: Hình học không gian
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 1, 'single_choice', 
        'Cho hình lập phương ABCD.A''B''C''D'' có cạnh bằng a. Khoảng cách từ điểm A đến mặt phẳng (BDD''B'') bằng:',
        '给定边长为a的正方体ABCD.A''B''C''D''，点A到平面(BDD''B'')的距离为：',
        3, 'medium')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', 'a√2/2', 'a√2/2', true),
    (q_id, 'B', 'a√3/2', 'a√3/2', false),
    (q_id, 'C', 'a/2', 'a/2', false),
    (q_id, 'D', 'a', 'a', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_hinh_hoc);

    -- Question 2: Hình học không gian
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 2, 'single_choice',
        'Trong không gian Oxyz, cho hai điểm A(1, 2, 3) và B(3, 4, 5). Phương trình mặt cầu đường kính AB là:',
        '在空间Oxyz中，给定两点A(1,2,3)和B(3,4,5)。以AB为直径的球面方程为：',
        3, 'medium')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '(x-2)² + (y-3)² + (z-4)² = 3', '(x-2)² + (y-3)² + (z-4)² = 3', true),
    (q_id, 'B', '(x-2)² + (y-3)² + (z-4)² = 6', '(x-2)² + (y-3)² + (z-4)² = 6', false),
    (q_id, 'C', '(x-1)² + (y-2)² + (z-3)² = 3', '(x-1)² + (y-2)² + (z-3)² = 3', false),
    (q_id, 'D', '(x-3)² + (y-4)² + (z-5)² = 3', '(x-3)² + (y-4)² + (z-5)² = 3', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_hinh_hoc);

    -- Question 3: Toán ứng dụng
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 3, 'single_choice',
        'Một người gửi 100 triệu đồng vào ngân hàng với lãi suất 6%/năm, lãi kép hàng năm. Sau 5 năm, số tiền người đó nhận được là:',
        '某人在银行存入1亿越南盾，年利率6%，按年复利计算。5年后他将获得：',
        3, 'easy')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '133,8 triệu', '1.338亿', true),
    (q_id, 'B', '130 triệu', '1.3亿', false),
    (q_id, 'C', '136 triệu', '1.36亿', false),
    (q_id, 'D', '140 triệu', '1.4亿', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_toan_ud);

    -- Question 4: Bài toán cực trị có tham số
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 4, 'single_choice',
        'Cho hàm số f(x) = x³ - 3mx² + 3m. Với giá trị nào của m thì hàm số có cực đại và cực tiểu?',
        '给定函数f(x) = x³ - 3mx² + 3m。m取什么值时函数有极大值和极小值？',
        3, 'hard')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', 'm ≠ 0', 'm ≠ 0', true),
    (q_id, 'B', 'm > 0', 'm > 0', false),
    (q_id, 'C', 'm < 0', 'm < 0', false),
    (q_id, 'D', 'Với mọi m', '对所有m', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_cuc_tri);

    -- Question 5: Parabol - elip - hyperbol
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 5, 'single_choice',
        'Trong mặt phẳng Oxy, cho elip (E): x²/25 + y²/9 = 1. Độ dài trục lớn của elip là:',
        '在平面Oxy中，给定椭圆(E): x²/25 + y²/9 = 1。椭圆的长轴长度为：',
        3, 'easy')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '10', '10', true),
    (q_id, 'B', '5', '5', false),
    (q_id, 'C', '6', '6', false),
    (q_id, 'D', '8', '8', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_parabol);

    -- Question 6: Phương trình mũ - Logarit
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 6, 'single_choice',
        'Giải phương trình: 2^(2x+1) = 8^(x-1)',
        '解方程：2^(2x+1) = 8^(x-1)',
        3, 'medium')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', 'x = -4', 'x = -4', true),
    (q_id, 'B', 'x = 4', 'x = 4', false),
    (q_id, 'C', 'x = -2', 'x = -2', false),
    (q_id, 'D', 'x = 2', 'x = 2', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_logarit);

    -- Question 7: Logarit
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 7, 'single_choice',
        'Tính giá trị của biểu thức: log₂8 + log₃27',
        '计算表达式的值：log₂8 + log₃27',
        3, 'easy')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '6', '6', true),
    (q_id, 'B', '5', '5', false),
    (q_id, 'C', '7', '7', false),
    (q_id, 'D', '8', '8', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_logarit);

    -- Question 8: Tập hàm số
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 8, 'single_choice',
        'Tập xác định của hàm số y = √(x-2)/(x+3) là:',
        '函数y = √(x-2)/(x+3)的定义域是：',
        3, 'medium')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '[2; +∞) \ {-3}', '[2; +∞) \ {-3}', true),
    (q_id, 'B', '(2; +∞)', '(2; +∞)', false),
    (q_id, 'C', '[2; +∞)', '[2; +∞)', false),
    (q_id, 'D', 'ℝ \ {-3}', 'ℝ \ {-3}', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_ham_so);

    -- Question 9: Xác suất cổ điển
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 9, 'single_choice',
        'Gieo một con xúc xắc cân đối 2 lần. Xác suất để tổng số chấm xuất hiện bằng 7 là:',
        '投掷一个均匀骰子2次。出现点数之和为7的概率是：',
        3, 'medium')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '1/6', '1/6', true),
    (q_id, 'B', '1/12', '1/12', false),
    (q_id, 'C', '1/4', '1/4', false),
    (q_id, 'D', '1/3', '1/3', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_xac_suat);

    -- Question 10: Cấp số cộng
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 10, 'single_choice',
        'Cho cấp số cộng (uₙ) có u₁ = 3 và công sai d = 5. Số hạng thứ 10 của cấp số là:',
        '给定等差数列(uₙ)，u₁ = 3，公差d = 5。数列的第10项为：',
        3, 'easy')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '48', '48', true),
    (q_id, 'B', '53', '53', false),
    (q_id, 'C', '43', '43', false),
    (q_id, 'D', '50', '50', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_cap_so);

    -- Question 11: Đạo hàm
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 11, 'single_choice',
        'Cho hàm số f(x) = x³ - 3x² + 5. Đạo hàm f''(x) bằng:',
        '给定函数f(x) = x³ - 3x² + 5。导数f''(x)等于：',
        3, 'easy')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '3x² - 6x', '3x² - 6x', true),
    (q_id, 'B', '3x² + 6x', '3x² + 6x', false),
    (q_id, 'C', 'x³ - 6x', 'x³ - 6x', false),
    (q_id, 'D', '6x - 6', '6x - 6', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_dao_ham);

    -- Question 12: Đạo hàm ứng dụng
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 12, 'single_choice',
        'Phương trình tiếp tuyến của đồ thị hàm số y = x² tại điểm có hoành độ x = 2 là:',
        '函数y = x²在横坐标x = 2处的切线方程为：',
        3, 'medium')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', 'y = 4x - 4', 'y = 4x - 4', true),
    (q_id, 'B', 'y = 2x', 'y = 2x', false),
    (q_id, 'C', 'y = 4x', 'y = 4x', false),
    (q_id, 'D', 'y = 2x - 4', 'y = 2x - 4', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_dao_ham);

    -- Question 13: Tích phân
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 13, 'single_choice',
        'Tính tích phân: ∫₀² x dx',
        '计算积分：∫₀² x dx',
        3, 'easy')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '2', '2', true),
    (q_id, 'B', '4', '4', false),
    (q_id, 'C', '1', '1', false),
    (q_id, 'D', '3', '3', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_tich_phan);

    -- Question 14: Tích phân nâng cao
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 14, 'single_choice',
        'Diện tích hình phẳng giới hạn bởi y = x², trục Ox và các đường thẳng x = 0, x = 2 là:',
        '由y = x²、x轴和直线x = 0、x = 2围成的平面图形的面积为：',
        3, 'medium')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '8/3', '8/3', true),
    (q_id, 'B', '4/3', '4/3', false),
    (q_id, 'C', '2', '2', false),
    (q_id, 'D', '4', '4', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_tich_phan);

    -- Question 15: Hình học không gian nâng cao
    INSERT INTO questions (exam_id, question_number, question_type, question_text, question_text_cn, points, difficulty)
    VALUES (exam_id_var, 15, 'single_choice',
        'Cho hình chóp S.ABC có đáy ABC là tam giác vuông tại B, AB = 3, BC = 4. SA vuông góc với mặt phẳng (ABC) và SA = 12. Thể tích khối chóp S.ABC là:',
        '给定棱锥S.ABC，底面ABC是直角三角形（直角在B），AB = 3，BC = 4。SA垂直于平面(ABC)且SA = 12。棱锥S.ABC的体积为：',
        3, 'hard')
    RETURNING id INTO q_id;
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, is_correct) VALUES
    (q_id, 'A', '24', '24', true),
    (q_id, 'B', '36', '36', false),
    (q_id, 'C', '12', '12', false),
    (q_id, 'D', '18', '18', false);
    INSERT INTO question_topic_mapping (question_id, topic_id) VALUES (q_id, topic_hinh_hoc);

END $$;
