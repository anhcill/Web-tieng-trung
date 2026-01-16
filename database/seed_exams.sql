-- Sample exam data for Physics (Vật lý)

-- Insert a sample exam
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
    (SELECT id FROM subjects WHERE code = 'PHYSICS'),
    'PHYSICS_001',
    'Đề thi Vật lý mẫu 001',
    '物理样题001',
    'Đề thi thử Vật lý - SJTU International Undergraduate Entrance Examination',
    90,
    30,
    90,
    'medium',
    'published',
    CURRENT_TIMESTAMP
);

-- Get the exam ID
DO $$
DECLARE
    exam_id_var INTEGER;
    q1_id INTEGER;
    q2_id INTEGER;
    q3_id INTEGER;
BEGIN
    SELECT id INTO exam_id_var FROM exams WHERE code = 'PHYSICS_001';

    -- Question 1: Which unit can be expressed in basic units as kgm⁻³·s⁻²?
    INSERT INTO questions (
        exam_id, 
        question_number, 
        question_type,
        question_text,
        question_text_cn,
        question_text_en,
        points,
        difficulty
    ) VALUES (
        exam_id_var,
        1,
        'single_choice',
        'Đơn vị nào có thể được biểu thị bằng đơn vị cơ bản là kgm⁻³·s⁻²?',
        '哪个单位基本单位表示方为 kgm⁻³·s⁻²?',
        'Which unit can be expressed in basic units as kgm⁻³·s⁻²?',
        3.00,
        'easy'
    ) RETURNING id INTO q1_id;

    -- Answers for Question 1
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, answer_text_en, is_correct) VALUES
    (q1_id, 'A', 'joule', '焦耳', 'joule', false),
    (q1_id, 'B', 'newton', '牛顿', 'newton', false),
    (q1_id, 'C', 'pascal', '帕斯卡', 'pascal', true),
    (q1_id, 'D', 'watt', '瓦特', 'watt', false);

    -- Question 2: Radioactive decay
    INSERT INTO questions (
        exam_id,
        question_number,
        question_type,
        question_text,
        question_text_cn,
        question_text_en,
        points,
        difficulty
    ) VALUES (
        exam_id_var,
        2,
        'single_choice',
        'Hạt nào được phát ra bởi sự phân rã phóng xạ tự phát của một hạt nhân nguyên tử trong quá trình phân rã beta?',
        '天然放射性元素发生β衰变时其原子核自发放出的粒子是',
        'What are the particles emitted by the spontaneous radioactive decay of an atomic nucleus during the process of beta decay?',
        3.00,
        'medium'
    ) RETURNING id INTO q2_id;

    -- Answers for Question 2
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, answer_text_en, is_correct) VALUES
    (q2_id, 'A', 'Hạt alpha (α粒子)', 'α粒子', 'Alpha particles', false),
    (q2_id, 'B', 'Positron (正电子)', '正电子', 'Positrons', false),
    (q2_id, 'C', 'Neutron (中子流)', '中子流', 'Neutrons', false),
    (q2_id, 'D', 'Electron (电子流)', '电子流', 'Electrons', true);

    -- Question 3: Clock mechanism
    INSERT INTO questions (
        exam_id,
        question_number,
        question_type,
        question_text,
        question_text_cn,
        question_text_en,
        points,
        difficulty
    ) VALUES (
        exam_id_var,
        3,
        'single_choice',
        'Như hình, thời gian một giờ, tỉ lệ các vận tốc góc của kim giờ, kim phút và kim giây là',
        '如图，时针正常工作，比较时针、分针和秒针转动的角速度期',
        'A clock works normally. Among the angular velocities and periods of hour, minute and second hand are the largest',
        3.00,
        'medium'
    ) RETURNING id INTO q3_id;

    -- Answers for Question 3
    INSERT INTO answers (question_id, answer_key, answer_text, answer_text_cn, answer_text_en, is_correct) VALUES
    (q3_id, 'A', 'Cả vận tốc góc và chu kỳ của kim giây đều lớn nhất', '角速度最大、周期也最大的都是秒针', 'Both the angular velocity and period of second hand are the largest', false),
    (q3_id, 'B', 'Kim giây có vận tốc góc lớn nhất', '角速度最大的是秒针', 'The angular velocity of second hand is the largest', true),
    (q3_id, 'C', 'Vận tốc góc của ba kim bằng nhau', '三者角速度一样大', 'The angular velocities are equal', false),
    (q3_id, 'D', 'Chu kỳ của ba kim bằng nhau', '三者周期一样大', 'The periods are equal', false);

END $$;

-- Map questions to topics
INSERT INTO question_topic_mapping (question_id, topic_id)
SELECT q.id, qt.id
FROM questions q
CROSS JOIN question_topics qt
WHERE q.exam_id = (SELECT id FROM exams WHERE code = 'PHYSICS_001')
AND qt.name IN ('Cơ học', 'Vật lý hạt nhân')
AND q.question_number <= 3;
