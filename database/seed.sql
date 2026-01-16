-- ====================================
-- CSCA DATABASE SEED DATA
-- Dữ liệu mẫu cho testing
-- ====================================

-- ====================================
-- USERS (5 sample users)
-- ====================================
-- Password for all: 123456 (will be hashed in backend)
INSERT INTO users (username, email, password, full_name, avatar, role, bio, target_score) VALUES
('danghoc_CSCA', 'khanh.ly@csca.com', '$2b$10$rH5C8X7qF3LxK3z6kZvYXeJ8KqL0F3LxK3z6kZvYXeJ8KqL0F3Lx', 'Khánh Ly', 'https://ui-avatars.com/api/?name=Khanh+Ly&background=4F46E5&color=fff', 'student', 'Học sinh năm 3, mục tiêu đạt 90+ điểm CSCA', 90),
('cao_best_khongten', 'cao.nguyen@csca.com', '$2b$10$rH5C8X7qF3LxK3z6kZvYXeJ8KqL0F3LxK3z6kZvYXeJ8KqL0F3Lx', 'Cao Nguyên', 'https://ui-avatars.com/api/?name=Cao+Nguyen&background=10B981&color=fff', 'student', 'Đam mê Toán học', 85),
('jenny_tranvo', 'jenny.tran@csca.com', '$2b$10$rH5C8X7qF3LxK3z6kZvYXeJ8KqL0F3LxK3z6kZvYXeJ8KqL0F3Lx', 'Jenny Trần', 'https://ui-avatars.com/api/?name=Jenny+Tran&background=F59E0B&color=fff', 'student', 'Học sinh chăm chỉ', 88),
('csca_QTV', 'admin@csca.com', '$2b$10$rH5C8X7qF3LxK3z6kZvYXeJ8KqL0F3LxK3z6kZvYXeJ8KqL0F3Lx', 'CSCA Admin', 'https://ui-avatars.com/api/?name=Admin&background=EF4444&color=fff', 'admin', 'Quản trị viên hệ thống', 100),
('teacher_minh', 'minh.nguyen@csca.com', '$2b$10$rH5C8X7qF3LxK3z6kZvYXeJ8KqL0F3LxK3z6kZvYXeJ8KqL0F3Lx', 'Thầy Minh', 'https://ui-avatars.com/api/?name=Teacher+Minh&background=8B5CF6&color=fff', 'teacher', 'Giảng viên Toán - 10 năm kinh nghiệm', 95);

-- ====================================
-- POSTS (Forum Feed - 15 posts)
-- ====================================
INSERT INTO posts (user_id, title, content, category, tags, likes_count, comments_count, views_count) VALUES
(1, 'Bài viết của tôi', 'Có ai giải thích cho mình với ạ...', 'Thắc mắc', ARRAY['câu hỏi', 'toán'], 2, 3, 45),
(2, 'Có ai giúp nhóm tôi làm CSCA không a', 'Mình đang tìm nhóm học cùng để cùng ôn thi CSCA. Có bạn nào quan tâm không?', 'Thắc mắc', ARRAY['nhóm học', 'CSCA'], 7, 10, 120),
(3, '20h tối nay tôi lên thử CSCA đình là mở đợt 1', 'Các bạn cùng tham gia nha! Mình sẽ livestream làm đề thử.', 'Thông báo', ARRAY['thi thử', 'livestream'], 30, 21, 250),
(1, 'Cách làm bài Parabol - Elip - Hyperbol nhanh nhất', 'Mình tổng hợp một số công thức và mẹo để làm nhanh dạng bài này:\n\n1. Công thức đỉnh parabol: x = -b/2a\n2. Elip: a² = b² + c²\n3. Hyperbol: c² = a² + b²\n\nCác bạn có thể bổ sung thêm không?', 'Toán', ARRAY['parabol', 'elip', 'công thức'], 15, 8, 180),
(5, 'Phương trình mũ Logarit - Bài giảng đầy đủ', 'Hôm nay thầy sẽ hướng dẫn các em cách giải phương trình mũ và logarit.\n\n**Phương pháp:**\n- Đưa về cùng cơ số\n- Đặt ẩn phụ\n- Logarit hóa\n\nCác em có thể xem video bài giảng ở link bên dưới.', 'Toán', ARRAY['logarit', 'phương trình mũ', 'bài giảng'], 42, 15, 320),
(2, 'Dao hàm cơ bản - Cần ghi nhớ', 'Các công thức đạo hàm cơ bản:\n\n(x^n)\' = n.x^(n-1)\n(e^x)\' = e^x\n(ln x)\' = 1/x\n(sin x)\' = cos x\n(cos x)\' = -sin x', 'Toán', ARRAY['đạo hàm', 'công thức'], 25, 5, 200),
(3, 'Xác suất cơ bản - Tổ hợp chỉnh hợp', 'Mình hay nhầm lẫn giữa tổ hợp và chỉnh hợp. Có ai có cách nhớ nhanh không?', 'Toán', ARRAY['xác suất', 'tổ hợp'], 12, 18, 150),
(1, 'Định luật Ôm - Vật lí cơ bản', 'U = I × R\n\nĐiện trở tăng thì cường độ dòng điện giảm (với hiệu điện thế không đổi)', 'Vật Lí', ARRAY['định luật ôm', 'điện học'], 8, 3, 95),
(5, 'Động lượng và va chạm', 'Bài giảng về động lượng:\n\np = m × v\n\nĐịnh luật bảo toàn động lượng: p1 + p2 = p1\' + p2\'', 'Vật Lí', ARRAY['động lượng', 'va chạm'], 20, 7, 175),
(2, 'Bảng tuần hoàn - Cách nhớ nhanh', 'Mình có một số mẹo để nhớ bảng tuần hoàn:\n\n1. Nhóm IA: Li - Na - K - Rb - Cs - Fr\n2. Nhóm IIA: Be - Mg - Ca - Sr - Ba - Ra\n\nCó bạn nào có cách nhớ hay hơn không?', 'Hóa Học', ARRAY['bảng tuần hoàn', 'hóa học'], 18, 12, 140),
(3, 'Phản ứng Oxi hóa - Khử', 'Nguyên tắc cân bằng electron:\n\nSố e cho = Số e nhận', 'Hóa Học', ARRAY['oxi hóa khử', 'electron'], 14, 6, 110),
(1, 'Từ vựng HSK 4 cần biết', '我们 (wǒmen) - chúng ta\n学习 (xuéxí) - học tập\n考试 (kǎoshì) - kì thi\n成绩 (chéngjì) - thành tích, điểm số', 'Tiếng Trung', ARRAY['từ vựng', 'HSK 4'], 35, 8, 280),
(5, 'Cấu trúc câu trong tiếng Trung', 'Cấu trúc cơ bản: Chủ ngữ + Vị ngữ + Tân ngữ\n\n我 学习 汉语 (Wǒ xuéxí hànyǔ) - Tôi học tiếng Trung', 'Tiếng Trung', ARRAY['ngữ pháp', 'cấu trúc câu'], 28, 10, 195),
(2, 'Lịch thi CSCA tháng 12/2025', 'Các đề thi trong tháng 12:\n- 2/12: Đề 010, Đề 009\n- 4/12: Đề 011, Đề 112\n- 5/12: Đề 015, Đề 014, Đề 112', 'Thông báo', ARRAY['lịch thi', 'CSCA'], 50, 15, 400),
(4, 'Hướng dẫn sử dụng website CSCA', 'Chào mừng các bạn đến với nền tảng luyện thi CSCA!\n\n**Tính năng:**\n- Làm đề thi online\n- Xem thống kê học tập\n- Trao đổi với cộng đồng\n\nChúc các bạn học tốt!', 'Thông báo', ARRAY['hướng dẫn', 'website'], 65, 20, 500);

-- ====================================
-- COMMENTS (Sample comments)
-- ====================================
INSERT INTO comments (post_id, user_id, content) VALUES
(1, 2, 'Mình nghĩ cách làm là...'),
(1, 3, 'Bạn có thể tham khảo sách giáo khoa trang 45 nhé'),
(1, 5, 'Đề bài này cần áp dụng công thức parabol chuẩn'),
(2, 1, 'Mình tham gia nhé!'),
(2, 3, 'Add mình vào group với'),
(2, 5, 'Thầy sẽ hỗ trợ các em'),
(3, 1, 'Ok mình sẽ tham gia'),
(3, 2, 'Mấy giờ bắt đầu vậy bạn?'),
(4, 2, 'Cảm ơn bạn đã chia sẻ!'),
(5, 1, 'Bài giảng rất hữu ích ạ');

-- ====================================
-- POST LIKES
-- ====================================
INSERT INTO post_likes (post_id, user_id) VALUES
(1, 2), (1, 3),
(2, 1), (2, 3), (2, 4), (2, 5),
(3, 1), (3, 2), (3, 4),
(14, 1), (14, 2), (14, 3), (14, 5);

-- ====================================
-- EXAMS (10 đề thi mẫu)
-- ====================================
INSERT INTO exams (title, description, subject, exam_date, duration, total_questions, total_points, difficulty_level) VALUES
('Đề 015', 'Đề thi Toán CSCA - Mức độ trung bình', 'Toán', '2025-12-05', 60, 25, 100, 'medium'),
('Đề 014', 'Đề thi Vật Lí CSCA', 'Vật Lí', '2025-12-05', 60, 25, 100, 'medium'),
('Đề 112', 'Đề thi Hóa Học CSCA', 'Hóa Học', '2025-12-05', 60, 25, 100, 'medium'),
('Đề 011', 'Đề thi Toán nâng cao', 'Toán', '2025-12-04', 60, 25, 100, 'hard'),
('Đề 112 (Duplicate)', 'Đề thi Tiếng Trung Xã Hội', 'Tiếng Trung Xã Hội', '2025-12-04', 60, 25, 100, 'medium'),
('Đề 010', 'Đề thi Vật Lí cơ bản', 'Vật Lí', '2025-12-02', 60, 25, 100, 'easy'),
('Đề 009', 'Đề thi Hóa Học cơ bản', 'Hóa Học', '2025-12-02', 60, 25, 100, 'easy'),
('Đề 008', 'Đề thi Toán ôn tập', 'Toán', '2025-11-30', 60, 25, 100, 'medium'),
('Đề 007', 'Đề thi Tiếng Trung Tự Nhiên', 'Tiếng Trung Tự Nhiên', '2025-11-30', 60, 25, 100, 'hard'),
('Đề 006', 'Đề thi tổng hợp', 'Tổng hợp', '2025-11-28', 90, 40, 150, 'hard');

-- ====================================
-- QUESTIONS (Câu hỏi cho Đề 015 - Toán)
-- ====================================
INSERT INTO questions (exam_id, question_number, question_text, question_type, question_category, options, correct_answer, explanation, points) VALUES
(1, 1, 'Tính đạo hàm của hàm số f(x) = x² + 3x - 2', 'multiple_choice', 'Đạo hàm', '[{"key": "A", "text": "2x + 3"}, {"key": "B", "text": "x² + 3"}, {"key": "C", "text": "2x - 2"}, {"key": "D", "text": "3x + 2"}]', 'A', 'Áp dụng công thức đạo hàm cơ bản: (x^n)\' = n.x^(n-1), ta có f\'(x) = 2x + 3', 4),
(1, 2, 'Cho parabol y = x². Tìm tọa độ đỉnh', 'multiple_choice', 'Parabol', '[{"key": "A", "text": "(0, 0)"}, {"key": "B", "text": "(1, 1)"}, {"key": "C", "text": "(-1, 1)"}, {"key": "D", "text": "(2, 4)"}]', 'A', 'Parabol y = x² có đỉnh tại gốc tọa độ O(0, 0)', 4),
(1, 3, 'Phương trình x² - 5x + 6 = 0 có nghiệm là', 'multiple_choice', 'Phương trình bậc 2', '[{"key": "A", "text": "x = 2 hoặc x = 3"}, {"key": "B", "text": "x = 1 hoặc x = 6"}, {"key": "C", "text": "x = -2 hoặc x = -3"}, {"key": "D", "text": "Vô nghiệm"}]', 'A', 'Phân tích: x² - 5x + 6 = (x-2)(x-3) = 0, suy ra x = 2 hoặc x = 3', 4),
(1, 4, 'Tính log₂(8)', 'multiple_choice', 'Logarit', '[{"key": "A", "text": "3"}, {"key": "B", "text": "2"}, {"key": "C", "text": "4"}, {"key": "D", "text": "8"}]', 'A', 'Vì 2³ = 8, nên log₂(8) = 3', 4),
(1, 5, 'Giá trị nhỏ nhất của hàm số y = x² - 4x + 5 là', 'multiple_choice', 'Cực trị', '[{"key": "A", "text": "1"}, {"key": "B", "text": "5"}, {"key": "C", "text": "-3"}, {"key": "D", "text": "0"}]', 'A', 'y = (x-2)² + 1. Min y = 1 tại x = 2', 4),
(1, 6, 'Tính tích phân ∫₀¹ x dx', 'multiple_choice', 'Tích phân', '[{"key": "A", "text": "1/2"}, {"key": "B", "text": "1"}, {"key": "C", "text": "0"}, {"key": "D", "text": "2"}]', 'A', '∫x dx = x²/2. Tính từ 0 đến 1: (1²/2) - (0²/2) = 1/2', 4),
(1, 7, 'Cho sin(α) = 3/5 với 0 < α < π/2. Tính cos(α)', 'multiple_choice', 'Lượng giác', '[{"key": "A", "text": "4/5"}, {"key": "B", "text": "3/4"}, {"key": "C", "text": "1/5"}, {"key": "D", "text": "2/5"}]', 'A', 'sin²α + cos²α = 1. Suy ra cos²α = 1 - 9/25 = 16/25. Do α góc nhọn nên cos α = 4/5', 4),
(1, 8, 'Trong không gian Oxyz, vectơ nào vuông góc với (1, 2, 0)?', 'multiple_choice', 'Hình học không gian', '[{"key": "A", "text": "(2, -1, 0)"}, {"key": "B", "text": "(1, 2, 1)"}, {"key": "C", "text": "(0, 0, 1)"}, {"key": "D", "text": "Cả A và C"}]', 'D', 'Hai vectơ vuông góc khi tích vô hướng = 0. Cả (2,-1,0) và (0,0,1) đều vuông góc với (1,2,0)', 4),
(1, 9, 'Số cách sắp xếp 5 người vào 5 ghế là', 'multiple_choice', 'Tổ hợp - Chỉnh hợp', '[{"key": "A", "text": "120"}, {"key": "B", "text": "24"}, {"key": "C", "text": "60"}, {"key": "D", "text": "5"}]', 'A', 'Số hoán vị của 5 phần tử: 5! = 120', 4),
(1, 10, 'Cho cấp số cộng với u₁ = 3, d = 2. Tính u₅', 'multiple_choice', 'Dãy số', '[{"key": "A", "text": "11"}, {"key": "B", "text": "9"}, {"key": "C", "text": "13"}, {"key": "D", "text": "7"}]', 'A', 'u₅ = u₁ + 4d = 3 + 4×2 = 11', 4),
(1, 11, 'Tập xác định của hàm số y = √(x - 1) là', 'multiple_choice', 'Hàm số', '[{"key": "A", "text": "[1, +∞)"}, {"key": "B", "text": "(1, +∞)"}, {"key": "C", "text": "(-∞, 1]"}, {"key": "D", "text": "ℝ"}]', 'A', 'Điều kiện: x - 1 ≥ 0 ⟺ x ≥ 1', 4),
(1, 12, 'Cho hàm số y = 2x + 1. Hàm số nghịch biến trên khoảng nào?', 'multiple_choice', 'Tính đơn điệu', '[{"key": "A", "text": "Không có"}, {"key": "B", "text": "(-∞, 0)"}, {"key": "C", "text": "(0, +∞)"}, {"key": "D", "text": "ℝ"}]', 'A', 'y\' = 2 > 0 với mọi x, nên hàm số luôn đồng biến', 4),
(1, 13, 'Tính diện tích hình tròn bán kính 3', 'multiple_choice', 'Hình học phẳng', '[{"key": "A", "text": "9π"}, {"key": "B", "text": "6π"}, {"key": "C", "text": "3π"}, {"key": "D", "text": "12π"}]', 'A', 'S = πr² = π × 3² = 9π', 4),
(1, 14, 'Cho tam giác ABC vuông tại A, AB = 3, AC = 4. Tính BC', 'multiple_choice', 'Hình học phẳng', '[{"key": "A", "text": "5"}, {"key": "B", "text": "7"}, {"key": "C", "text": "6"}, {"key": "D", "text": "√7"}]', 'A', 'Theo định lý Pythagore: BC² = AB² + AC² = 9 + 16 = 25, suy ra BC = 5', 4),
(1, 15, 'Phương trình 2^x = 8 có nghiệm', 'multiple_choice', 'Phương trình mũ', '[{"key": "A", "text": "x = 3"}, {"key": "B", "text": "x = 2"}, {"key": "C", "text": "x = 4"}, {"key": "D", "text": "x = 8"}]', 'A', '2^x = 8 = 2³, suy ra x = 3', 4),
(1, 16, 'Cho f(x) = x³. Tính f\'(2)', 'multiple_choice', 'Đạo hàm', '[{"key": "A", "text": "12"}, {"key": "B", "text": "6"}, {"key": "C", "text": "8"}, {"key": "D", "text": "3"}]', 'A', 'f\'(x) = 3x². f\'(2) = 3 × 2² = 12', 4),
(1, 17, 'Tính giới hạn lim(x→∞) (2x + 1)/(x - 3)', 'multiple_choice', 'Giới hạn', '[{"key": "A", "text": "2"}, {"key": "B", "text": "1"}, {"key": "C", "text": "+∞"}, {"key": "D", "text": "0"}]', 'A', 'Chia cả tử và mẫu cho x: lim = (2 + 1/x)/(1 - 3/x) = 2/1 = 2', 4),
(1, 18, 'Số nghiệm của phương trình x² + 1 = 0 trong ℝ là', 'multiple_choice', 'Phương trình', '[{"key": "A", "text": "0"}, {"key": "B", "text": "1"}, {"key": "C", "text": "2"}, {"key": "D", "text": "Vô số"}]', 'A', 'x² = -1 vô nghiệm trong ℝ vì x² ≥ 0 với mọi x', 4),
(1, 19, 'Trong không gian, khoảng cách từ điểm A(1,2,3) đến mặt phẳng Oxy là', 'multiple_choice', 'Hình học không gian', '[{"key": "A", "text": "3"}, {"key": "B", "text": "2"}, {"key": "C", "text": "1"}, {"key": "D", "text": "√14"}]', 'A', 'Khoảng cách = |z| = |3| = 3', 4),
(1, 20, 'Tính P(3,2) (chỉnh hợp chập 2 của 3)', 'multiple_choice', 'Tổ hợp', '[{"key": "A", "text": "6"}, {"key": "B", "text": "3"}, {"key": "C", "text": "9"}, {"key": "D", "text": "12"}]', 'A', 'P(3,2) = 3!/(3-2)! = 6/1 = 6', 4),
(1, 21, 'Cho hàm số y = |x|. Đồ thị hàm số có dạng', 'multiple_choice', 'Đồ thị hàm số', '[{"key": "A", "text": "Chữ V"}, {"key": "B", "text": "Parabol"}, {"key": "C", "text": "Đường thẳng"}, {"key": "D", "text": "Hyperbol"}]', 'A', 'Đồ thị y = |x| có dạng chữ V với đỉnh tại O(0,0)', 4),
(1, 22, 'Cho ma trận A = [[1, 2], [3, 4]]. Tính det(A)', 'multiple_choice', 'Ma trận', '[{"key": "A", "text": "-2"}, {"key": "B", "text": "2"}, {"key": "C", "text": "10"}, {"key": "D", "text": "0"}]', 'A', 'det(A) = 1×4 - 2×3 = 4 - 6 = -2', 4),
(1, 23, 'Trong không gian, hai mặt phẳng song song khi', 'multiple_choice', 'Hình học không gian', '[{"key": "A", "text": "Có cùng vectơ pháp tuyến"}, {"key": "B", "text": "Vuông góc nhau"}, {"key": "C", "text": "Cắt nhau"}, {"key": "D", "text": "Trùng nhau"}]', 'A', 'Hai mặt phẳng song song ⟺ hai vectơ pháp tuyến cùng phương', 4),
(1, 24, 'Tính C(5,2) (tổ hợp chập 2 của 5)', 'multiple_choice', 'Tổ hợp', '[{"key": "A", "text": "10"}, {"key": "B", "text": "20"}, {"key": "C", "text": "5"}, {"key": "D", "text": "15"}]', 'A', 'C(5,2) = 5!/(2!×3!) = (5×4)/(2×1) = 10', 4),
(1, 25, 'Cho hàm số y = e^x. Tính y\'', 'multiple_choice', 'Đạo hàm', '[{"key": "A", "text": "e^x"}, {"key": "B", "text": "xe^(x-1)"}, {"key": "C", "text": "1"}, {"key": "D", "text": "x"}]', 'A', 'Đạo hàm của e^x là chính nó: (e^x)\' = e^x', 4);

-- ====================================
-- QUESTIONS (5 câu cho các đề khác)
-- ====================================
-- Đề 014 - Vật Lí
INSERT INTO questions (exam_id, question_number, question_text, question_type, question_category, options, correct_answer, explanation, points) VALUES
(2, 1, 'Định luật Ôm cho đoạn mạch có công thức', 'multiple_choice', 'Điện học', '[{"key": "A", "text": "U = I × R"}, {"key": "B", "text": "P = U × I"}, {"key": "C", "text": "A = P × t"}, {"key": "D", "text": "Q = I² × R × t"}]', 'A', 'Định luật Ôm: U = I × R (Hiệu điện thế = Cường độ dòng điện × Điện trở)', 4),
(2, 2, 'Công thức tính động năng', 'multiple_choice', 'Cơ học', '[{"key": "A", "text": "W = 1/2 × m × v²"}, {"key": "B", "text": "W = m × g × h"}, {"key": "C", "text": "W = F × s"}, {"key": "D", "text": "W = P × t"}]', 'A', 'Động năng: W = 1/2 × m × v²', 4),
(2, 3, 'Gia tốc trọng trường g có giá trị gần đúng', 'multiple_choice', 'Cơ học', '[{"key": "A", "text": "10 m/s²"}, {"key": "B", "text": "9.8 m/s²"}, {"key": "C", "text": "9.81 m/s²"}, {"key": "D", "text": "Cả A, B, C"}]', 'D', 'g ≈ 9.8 m/s² hoặc lấy gần đúng 10 m/s²', 4),
(2, 4, 'Công thức tính lực hấp dẫn', 'multiple_choice', 'Cơ học', '[{"key": "A", "text": "F = G × (m₁ × m₂)/r²"}, {"key": "B", "text": "F = m × a"}, {"key": "C", "text": "F = k × Δl"}, {"key": "D", "text": "F = q × E"}]', 'A', 'Lực hấp dẫn: F = G × (m₁ × m₂)/r²', 4),
(2, 5, 'Trong chuyển động thẳng đều, vận tốc', 'multiple_choice', 'Cơ học', '[{"key": "A", "text": "Không đổi"}, {"key": "B", "text": "Tăng dần"}, {"key": "C", "text": "Giảm dần"}, {"key": "D", "text": "Bằng 0"}]', 'A', 'Chuyển động thẳng đều: v = const', 4);

-- ====================================
-- USER STATS (Initialize for users)
-- ====================================
INSERT INTO user_stats (user_id, total_exams_taken, total_exams_completed, average_score, highest_score, lowest_score) VALUES
(1, 0, 0, 0, 0, 0),
(2, 0, 0, 0, 0, 0),
(3, 0, 0, 0, 0, 0),
(4, 0, 0, 0, 0, 0),
(5, 0, 0, 0, 0, 0);

-- ====================================
-- MATERIALS (Tài liệu học tập)
-- ====================================
INSERT INTO materials (title, description, content, category, subject, file_type) VALUES
('Cấu trúc đề thi CSCA', 'Thông tin chi tiết về cấu trúc đề thi', '**Cấu trúc đề thi CSCA:**\n\n- Toán: 25 câu (60 phút)\n- Vật Lí: 25 câu (60 phút)\n- Hóa Học: 25 câu (60 phút)\n- Tiếng Trung: 30 câu (60 phút)\n\nTổng điểm: 100 điểm', 'Cấu trúc đề', 'Tổng hợp', 'text'),
('Công thức Toán cơ bản', 'Tổng hợp công thức Toán học cần thiết', '**Đạo hàm:**\n(x^n)\' = n.x^(n-1)\n(e^x)\' = e^x\n(ln x)\' = 1/x\n\n**Tích phân:**\n∫x^n dx = x^(n+1)/(n+1) + C', 'Lí thuyết', 'Toán', 'text'),
('Định luật Vật Lí', 'Các định luật Vật Lí quan trọng', '**Định luật Newton:**\nF = m × a\n\n**Định luật Ôm:**\nU = I × R\n\n**Định luật bảo toàn năng lượng:**\nW₁ + W₂ = const', 'Lí thuyết', 'Vật Lí', 'text'),
('Bảng tuần hoàn hóa học', 'Bảng tuần hoàn các nguyên tố', 'Nhóm IA: Li, Na, K, Rb, Cs, Fr\nNhóm IIA: Be, Mg, Ca, Sr, Ba, Ra\nNhóm VIIA: F, Cl, Br, I, At', 'Lí thuyết', 'Hóa Học', 'text'),
('Từ vựng HSK 4', 'Danh sách từ vựng HSK 4 cần thiết', '学习 (xuéxí) - học tập\n考试 (kǎoshì) - kì thi\n成绩 (chéngjì) - thành tích\n努力 (nǔlì) - cố gắng', 'Từ vựng', 'Tiếng Trung', 'text');

-- ====================================
-- END SEED DATA
-- ====================================
