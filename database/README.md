# HƯỚNG DẪN SETUP DATABASE - NGÀY 1

## Bước 1: Tạo Database trong PostgreSQL

Mở **pgAdmin** hoặc **psql** và chạy:

```sql
CREATE DATABASE csca_db;
```

## Bước 2: Import Schema và Seed Data

### Cách 1: Dùng pgAdmin

1. Mở pgAdmin
2. Kết nối đến PostgreSQL
3. Right-click vào database `csca_db` → Query Tool
4. Mở file `database/schema.sql` và Execute
5. Mở file `database/seed.sql` và Execute

### Cách 2: Dùng psql (Command Line)

```bash
# Di chuyển vào thư mục database
cd database

# Import schema
psql -U postgres -d csca_db -f schema.sql

# Import seed data
psql -U postgres -d csca_db -f seed.sql
```

### Cách 3: Dùng PowerShell (Windows)

```powershell
# Từ thư mục gốc project
cd database

# Import schema
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d csca_db -f schema.sql

# Import seed data
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d csca_db -f seed.sql
```

## Bước 3: Kiểm tra Database

Chạy query này để xem số lượng records:

```sql
SELECT 'users' as table_name, COUNT(*) as count FROM users
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
```

**Kết quả mong đợi:**

- users: 5
- posts: 15
- comments: 10
- exams: 10
- questions: 30
- materials: 5

## Bước 4: Cấu hình Backend

File `backend/.env` đã được tạo. **Sửa lại password** cho đúng:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
DB_NAME=csca_db
```

## Bước 5: Cài đặt Dependencies và Chạy Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt packages
npm install

# Chạy server
npm run dev
```

## Bước 6: Test API

Mở browser hoặc Postman:

- **API Info:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

**Kết quả mong đợi:**

```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-01-01T..."
}
```

---

## ✅ CHECKLIST NGÀY 1

- [x] Database schema (8 bảng)
- [x] Seed data (5 users, 15 posts, 10 exams, 30 questions)
- [x] Backend package.json
- [x] Backend server (Express.js)
- [x] Database connection (PostgreSQL)
- [ ] **TODO: Import database vào PostgreSQL**
- [ ] **TODO: Cài npm packages**
- [ ] **TODO: Chạy backend server**

---

## Lỗi thường gặp

### Lỗi: "database csca_db does not exist"

→ Chạy: `CREATE DATABASE csca_db;`

### Lỗi: "password authentication failed"

→ Kiểm tra lại password trong file `.env`

### Lỗi: "relation users does not exist"

→ Import lại file `schema.sql`

### Lỗi: Port 5000 đã được sử dụng

→ Đổi PORT trong file `.env`: `PORT=5001`
