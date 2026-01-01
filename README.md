# 🎓 HỆ THỐNG THI ĐẦU VÀO TIẾNG TRUNG - CHINESE ENTRANCE EXAM SYSTEM

## 📋 SƠ ĐỒ DỰ ÁN

### 🎯 TÍNH NĂNG CHÍNH

#### 1. **Quản lý Người dùng & Quyền hạn**

- **Thí sinh:**
  - Đăng ký/Đăng nhập tài khoản
  - Đăng ký kỳ thi
  - Xem lịch thi cá nhân
  - Xem kết quả và giấy chứng nhận
- **Giám thị:**
  - Quản lý phòng thi
  - Giám sát thí sinh trong phòng
  - Xử lý vi phạm
- **Quản trị viên:**
  - Quản lý tất cả người dùng
  - Tạo và quản lý kỳ thi
  - Phân công giám thị
  - Thống kê toàn hệ thống

#### 2. **Quản lý Kỳ Thi**

- Tạo kỳ thi mới (tên, ngày, thời gian, số phòng)
- Phân loại kỳ thi theo cấp độ (HSK 1-6, hoặc tùy chỉnh)
- Thiết lập số lượng thí sinh tối đa
- Thời gian đăng ký mở/đóng
- Phân bổ phòng thi tự động
- Xuất danh sách thí sinh theo phòng

#### 3. **Quản lý Đề Thi**

- Ngân hàng câu hỏi theo từng kỹ năng:
  - **Nghe hiểu** (Listening) - Audio + câu hỏi
  - **Đọc hiểu** (Reading) - Đoạn văn + câu hỏi
  - **Viết** (Writing) - Viết câu/đoạn văn
  - **Ngữ pháp** (Grammar) - Trắc nghiệm/điền từ
- Phân loại câu hỏi theo độ khó
- Tạo đề thi tự động hoặc thủ công
- Xáo trộn câu hỏi cho mỗi thí sinh
- Upload file audio/hình ảnh cho câu hỏi

#### 4. **Hệ Thống Thi Online**

- Giao diện làm bài thi trực tuyến
- Đếm ngược thời gian thi
- Tự động lưu bài làm
- Phát audio cho phần nghe
- Hỗ trợ nhập chữ Hán (bộ gõ Pinyin)
- Đánh dấu câu hỏi cần xem lại
- Cảnh báo trước khi nộp bài
- Chống gian lận:
  - Theo dõi thời gian làm bài
  - Phát hiện chuyển tab/cửa sổ
  - Khóa màn hình khi thi
  - Camera giám sát (optional)

#### 5. **Chấm Điểm & Kết Quả**

- **Tự động:** Chấm trắc nghiệm, nghe, đọc
- **Thủ công:** Chấm bài viết qua giao diện
- Thang điểm linh hoạt (100, 300, HSK scale)
- Tính điểm tổng và từng phần
- Thống kê phân tích:
  - Điểm trung bình
  - Tỷ lệ đậu/rớt
  - Phân bố điểm
- Xuất kết quả Excel/PDF
- Gửi email thông báo kết quả

#### 6. **Giấy Chứng Nhận**

- Template chứng nhận tùy chỉnh
- Tự động tạo chứng nhận cho thí sinh đạt yêu cầu
- Mã QR xác thực chứng nhận
- Download PDF chứng nhận
- Lưu trữ và tra cứu chứng nhận

#### 7. **Báo Cáo & Thống Kê**

- Dashboard tổng quan
- Thống kê theo kỳ thi
- Báo cáo chi tiết từng thí sinh
- Phân tích xu hướng điểm số
- Export báo cáo Excel/PDF
- Biểu đồ trực quan

#### 8. **Quản Lý Phòng Thi**

- Tạo và phân bổ phòng thi
- Gán giám thị cho từng phòng
- Xem danh sách thí sinh theo phòng
- In sơ đồ phòng thi
- Quản lý thiết bị (máy tính, tai nghe)

#### 9. **Thanh Toán (Optional)**

- Tích hợp cổng thanh toán (VNPay, MoMo, PayPal)
- Quản lý lệ phí thi
- Lịch sử giao dịch
- Xuất hóa đơn

---

## 🛠️ CÔNG NGHỆ ĐỀ XUẤT

### **Frontend:**

- **React.js** hoặc **Next.js** - Framework chính
- **TailwindCSS** + **shadcn/ui** - UI Components
- **Zustand** hoặc **Redux Toolkit** - State management
- **React Query** - Data fetching & caching
- **React Hook Form** + **Zod** - Form validation
- **Recharts** - Biểu đồ & thống kê
- **React-PDF** - Tạo và xem PDF

### **Backend:**

- **Node.js + Express.js** hoặc **NestJS** - API server
- **PostgreSQL** - Database chính (user, exam, result data)
- **Prisma** hoặc **TypeORM** - ORM
- **Redis** - Caching & session
- **JWT** - Authentication & Authorization
- **Socket.io** - Real-time monitoring (giám sát thi)
- **Bull** - Queue jobs (chấm điểm, gửi email)

### **Storage & Media:**

- **AWS S3** hoặc **Cloudinary** - Lưu file audio, hình ảnh đề thi
- **MinIO** - Self-hosted object storage (alternative)

### **Authentication & Security:**

- **JWT** + **Refresh Token** - Session management
- **bcrypt** - Password hashing
- **Helmet.js** - Security headers
- **Rate limiting** - Chống spam
- **CORS** - Cross-origin control

### **Payment Integration (Optional):**

- **VNPay SDK** - Cổng thanh toán Việt Nam
- **MoMo API** - Ví điện tử
- **PayPal API** - Thanh toán quốc tế

### **Email & Notifications:**

- **Nodemailer** - Gửi email
- **SendGrid** hoặc **Mailgun** - Email service
- **Firebase Cloud Messaging** - Push notifications

### **DevOps & Deployment:**

- **Docker** + **Docker Compose** - Containerization
- **Nginx** - Reverse proxy
- **PM2** - Process manager
- **GitHub Actions** - CI/CD
- **AWS EC2** hoặc **DigitalOcean** - Hosting
- **Vercel** - Frontend deployment (alternative)

---

## 📁 CẤU TRÚC THỨ MỤC

```
chinese-entrance-exam-system/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── audio/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Button, Input, Modal, etc.
│   │   │   ├── admin/           # Admin dashboard components
│   │   │   ├── student/         # Student dashboard
│   │   │   ├── proctor/         # Proctor (giám thị) components
│   │   │   ├── exam/            # Exam taking interface
│   │   │   ├── grading/         # Grading interface
│   │   │   └── reports/         # Reports & statistics
│   │   ├── pages/
│   │   │   ├── auth/            # Login, Register
│   │   │   ├── admin/           # Admin pages
│   │   │   ├── student/         # Student pages
│   │   │   ├── proctor/         # Proctor pages
│   │   │   └── exam/            # Exam pages
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API calls
│   │   ├── store/               # State management
│   │   ├── utils/               # Utility functions
│   │   ├── types/               # TypeScript types
│   │   └── constants/           # Constants
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── exam.controller.ts
│   │   │   ├── question.controller.ts
│   │   │   ├── result.controller.ts
│   │   │   └── certificate.controller.ts
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── role.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── services/
│   │   │   ├── exam.service.ts
│   │   │   ├── grading.service.ts
│   │   │   ├── email.service.ts
│   │   │   └── certificate.service.ts
│   │   ├── utils/               # Helper functions
│   │   ├── config/              # Configuration
│   │   └── types/               # TypeScript types
│   ├── tests/                   # Unit & Integration tests
│   ├── package.json
│   └── tsconfig.json
│
├── database/
│   ├── migrations/              # Database migrations
│   ├── seeds/                   # Sample data
│   └── schema.sql               # Database schema
│
├── uploads/                     # Uploaded files (audio, images)
├── certificates/                # Generated certificates
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🗄️ DATABASE SCHEMA

### **Bảng chính:**

#### **users**

```sql
id, email, password, full_name, phone, role (admin/proctor/student),
avatar, is_active, created_at, updated_at
```

#### **exams**

```sql
id, name, description, level, start_time, end_time, duration (minutes),
max_students, registration_open, registration_close, status, created_by, created_at
```

#### **exam_rooms**

```sql
id, exam_id, room_name, capacity, proctor_id, created_at
```

#### **registrations**

```sql
id, exam_id, student_id, room_id, registration_time,
payment_status, payment_amount, status (pending/confirmed/cancelled)
```

#### **question_bank**

```sql
id, type (listening/reading/writing/grammar), content, options (JSON),
correct_answer, audio_file, image_file, difficulty_level, points, created_at
```

#### **exam_questions**

```sql
id, exam_id, question_id, order, created_at
```

#### **student_exams**

```sql
id, student_id, exam_id, start_time, end_time, submit_time,
status (in_progress/submitted/graded), total_score, created_at
```

#### **student_answers**

```sql
id, student_exam_id, question_id, answer_text, is_correct,
score, graded_by, graded_at, created_at
```

#### **results**

```sql
id, student_exam_id, listening_score, reading_score, writing_score,
grammar_score, total_score, pass_status, certificate_id, created_at
```

#### **certificates**

```sql
id, student_id, exam_id, certificate_code, issue_date,
verification_url, pdf_file, created_at
```

#### **violation_logs**

```sql
id, student_exam_id, violation_type, description,
detected_at, handled_by, action_taken
```

---

## 🚀 LỘ TRÌNH PHÁT TRIỂN

| Phase        | Thời gian | Nội dung                                               |
| ------------ | --------- | ------------------------------------------------------ |
| **Phase 1**  | 2-3 tuần  | Setup dự án + Authentication + Authorization (3 roles) |
| **Phase 2**  | 2-3 tuần  | Quản lý User & Dashboard cơ bản cho từng role          |
| **Phase 3**  | 3-4 tuần  | Quản lý Kỳ thi & Phòng thi + Đăng ký thi               |
| **Phase 4**  | 3-4 tuần  | Ngân hàng câu hỏi & Tạo đề thi (CRUD questions)        |
| **Phase 5**  | 4-5 tuần  | Giao diện làm bài thi online + Timer + Anti-cheat      |
| **Phase 6**  | 3-4 tuần  | Hệ thống chấm điểm (auto + manual) + Kết quả           |
| **Phase 7**  | 2-3 tuần  | Tạo & quản lý giấy chứng nhận + QR verification        |
| **Phase 8**  | 2-3 tuần  | Báo cáo & Thống kê + Dashboard analytics               |
| **Phase 9**  | 1-2 tuần  | Tích hợp thanh toán (VNPay/MoMo) - Optional            |
| **Phase 10** | 2-3 tuần  | Testing (Unit + Integration) + Bug fixes               |
| **Phase 11** | 1-2 tuần  | Deployment + Documentation                             |

**Tổng thời gian ước tính:** 25-36 tuần (6-9 tháng)

---

## 📦 CÀI ĐẶT & CHẠY DỰ ÁN

### Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- Redis >= 6.x
- npm hoặc yarn hoặc pnpm

### Clone Repository

```bash
git clone <repository-url>
cd chinese-entrance-exam-system
```

### Backend Setup

```bash
cd backend
npm install

# Tạo file .env và cấu hình
cp .env.example .env

# Chạy migrations
npm run migrate

# Seed dữ liệu mẫu (optional)
npm run seed

# Chạy development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Tạo file .env và cấu hình
cp .env.example .env

# Chạy development server
npm run dev
```

### Chạy với Docker

```bash
# Chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### Environment Variables

#### Backend `.env`

```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/exam_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_URL=your_cloudinary_url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
```

#### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
```

---

## 🎨 GIAO DIỆN CHÍNH (UI Screens)

### **Thí sinh (Student):**

1. Trang chủ - Danh sách kỳ thi
2. Đăng ký thi
3. Lịch thi cá nhân
4. Phòng thi (làm bài)
5. Kết quả thi
6. Chứng nhận

### **Giám thị (Proctor):**

1. Dashboard giám thị
2. Danh sách phòng thi được phân công
3. Giám sát thí sinh trong phòng
4. Xử lý vi phạm

### **Quản trị viên (Admin):**

1. Dashboard tổng quan
2. Quản lý người dùng
3. Quản lý kỳ thi
4. Quản lý đề thi & câu hỏi
5. Phân công giám thị
6. Chấm điểm thủ công
7. Quản lý chứng nhận
8. Báo cáo & thống kê

---

## 🔐 PHÂN QUYỀN (Role-Based Access Control)

| Chức năng             | Admin | Proctor | Student |
| --------------------- | ----- | ------- | ------- |
| Xem danh sách kỳ thi  | ✅    | ✅      | ✅      |
| Tạo kỳ thi            | ✅    | ❌      | ❌      |
| Đăng ký thi           | ❌    | ❌      | ✅      |
| Làm bài thi           | ❌    | ❌      | ✅      |
| Giám sát phòng thi    | ✅    | ✅      | ❌      |
| Tạo/sửa câu hỏi       | ✅    | ❌      | ❌      |
| Chấm điểm             | ✅    | ❌      | ❌      |
| Xem kết quả (tất cả)  | ✅    | ✅      | ❌      |
| Xem kết quả (cá nhân) | ❌    | ❌      | ✅      |
| Quản lý chứng nhận    | ✅    | ❌      | ❌      |
| Xem báo cáo thống kê  | ✅    | ✅      | ❌      |

---

## 👥 TEAM & ĐÓNG GÓP

Dự án đang trong giai đoạn phát triển. Mọi đóng góp đều được hoan nghênh!

---

## 📄 LICENSE

MIT License

---

## 📞 LIÊN HỆ

- Email: your-email@example.com
- GitHub: your-github-username
