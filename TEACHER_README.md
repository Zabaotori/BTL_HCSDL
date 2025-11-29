# Trang Giáo Viên - Frontend Implementation

## 📁 Cấu trúc Files

```
BTL_HCSDL/src/Teacher/
├── TeacherCourses.jsx     # Trang danh sách khóa học
├── CourseDetail.jsx       # Trang chi tiết khóa học (sections, lessons, quizzes)
├── QuestionBank.jsx       # Trang ngân hàng câu hỏi (CRUD)
└── CreateTest.jsx         # Trang tạo bài test
```

## 🎯 Chức năng đã implement

### 1. TeacherCourses.jsx
- ✅ Hiển thị danh sách khóa học của giáo viên
- ✅ Thống kê: tổng khóa học, tổng học viên, tổng bài học
- ✅ Tìm kiếm khóa học theo tên
- ✅ Click vào card để xem chi tiết khóa học
- ✅ Responsive design với grid layout

### 2. CourseDetail.jsx
- ✅ Hiển thị thông tin khóa học
- ✅ Danh sách sections (chương) với expand/collapse
- ✅ Danh sách lessons (bài học) trong mỗi section
- ✅ Danh sách quizzes trong mỗi section
- ✅ Button "Ngân hàng câu hỏi" -> QuestionBank
- ✅ Button "Tạo bài test" -> CreateTest

### 3. QuestionBank.jsx
- ✅ Xem danh sách câu hỏi của khóa học
- ✅ Tìm kiếm câu hỏi theo nội dung
- ✅ **Tạo câu hỏi mới** (Modal popup):
  - Nhập đề câu hỏi
  - Nhập 4 đáp án (A, B, C, D)
  - Chọn đáp án đúng (radio button)
  - Validation đầy đủ
- ✅ **Chỉnh sửa câu hỏi** (Modal popup)
- ✅ **Xóa câu hỏi** (với confirm dialog)
- ✅ Hiển thị đáp án đúng với màu xanh lá

### 4. CreateTest.jsx
- ✅ Form nhập thông tin bài test:
  - Tiêu đề bài test
  - Mô tả
  - Thời gian làm bài (phút)
  - Điểm đạt (%)
  - Trọng số
- ✅ **Ngân hàng câu hỏi** (Modal popup):
  - Hiển thị tất cả câu hỏi của khóa học
  - Tìm kiếm câu hỏi
  - Nút "Chọn" để thêm câu hỏi vào test
  - Hiển thị đáp án và đánh dấu đáp án đúng
- ✅ **Danh sách câu hỏi đã chọn**:
  - Hiển thị câu hỏi đã chọn
  - Nút xóa câu hỏi khỏi danh sách
- ✅ **Sidebar thông tin**: Tổng số câu hỏi, thời gian, điểm đạt
- ✅ **Xác nhận tạo bài test**: Gọi API tạo test và thêm câu hỏi

## 🔌 API Integration

### ✅ APIs đã sử dụng (có sẵn trong backend)

#### Question APIs
```javascript
// Lấy danh sách câu hỏi
GET /api/questions?courseId={courseId}&instructorId={instructorId}

// Tạo câu hỏi mới
POST /api/questions
Body: {
  instructorId: number,
  courseId: number,
  content: string,
  options: [
    { content: string, isCorrect: boolean }
  ]
}

// Cập nhật câu hỏi
PUT /api/questions/{id}
Body: { instructorId: number, content: string }

// Xóa câu hỏi
DELETE /api/questions/{id}?instructorId={instructorId}
```

#### Test APIs
```javascript
// Tạo test mới
POST /api/tests
Body: {
  courseId: number,
  title: string,
  description: string,
  timeLimit: number,
  passScore: number,
  weight: number
}

// Thêm câu hỏi vào test
POST /api/tests/{testId}/questions
Body: {
  courseId: number,
  questionId: number,
  instructorId: number
}
```

### ⚠️ APIs cần backend implement

**Chi tiết xem file: `udemy/InstructorAPI.md`**

```javascript
// Lấy danh sách khóa học của giáo viên
GET /api/instructors/{instructorId}/courses

// Lấy chi tiết khóa học với sections, lessons, quizzes
GET /api/courses/{courseId}/details
```

## 🛣️ Routing

```javascript
/teacher                              // Danh sách khóa học
/teacher/course/:courseId             // Chi tiết khóa học
/teacher/course/:courseId/questions   // Ngân hàng câu hỏi
/teacher/course/:courseId/create-test // Tạo bài test
```

## 🎨 UI/UX Features

- ✅ Đồng bộ với design hiện tại (Tailwind CSS)
- ✅ Màu chủ đạo: cyan-600
- ✅ Card-based layout
- ✅ Responsive design
- ✅ Modal popups cho forms
- ✅ Loading states
- ✅ Error handling với alerts
- ✅ Validation đầy đủ

## 📝 Cách sử dụng

### Để test trang giáo viên:

1. **Truy cập**: `http://localhost:5173/teacher`

2. **Xem danh sách khóa học**:
   - Thống kê tổng quan
   - Tìm kiếm khóa học
   - Click vào card để xem chi tiết

3. **Xem chi tiết khóa học**:
   - Xem sections và lessons
   - Click "Ngân hàng câu hỏi" để quản lý câu hỏi
   - Click "Tạo bài test" để tạo bài kiểm tra

4. **Quản lý câu hỏi**:
   - Click "Thêm câu hỏi" để tạo mới
   - Click icon Edit để chỉnh sửa
   - Click icon Delete để xóa

5. **Tạo bài test**:
   - Điền thông tin bài test
   - Click "Thêm câu hỏi" -> chọn từ ngân hàng
   - Xem preview câu hỏi đã chọn
   - Click "Tạo bài test" để hoàn tất

## 🔧 Configuration

### axios baseURL (nếu cần)
```javascript
// Thêm vào main.jsx hoặc tạo file config
axios.defaults.baseURL = 'http://localhost:8080';
```

### Mock instructorId
```javascript
// TODO: Lấy từ session/login sau khi user đăng nhập
const instructorId = 1; // Tạm thời hardcode
```

## 📦 Dependencies

Tất cả dependencies đã có sẵn:
- React Router DOM (routing)
- Axios (API calls)
- Lucide React (icons)
- Tailwind CSS (styling)

## 🚀 Next Steps

### Backend cần làm:

1. **Tạo InstructorController.java**:
   - Implement `GET /api/instructors/{instructorId}/courses`
   - Implement `GET /api/courses/{courseId}/details`

2. **Tạo các DTO classes**:
   - CourseWithStatsDTO
   - CourseDetailDTO
   - SectionDTO
   - LessonDTO
   - QuizDTO

3. **Tạo InstructorService.java**:
   - getCoursesByInstructorId()
   - getCourseDetails()

### Frontend cần làm:

1. **Integrate với Login**:
   - Lưu instructorId vào localStorage/context
   - Lấy instructorId từ session

2. **Error handling nâng cao**:
   - Toast notifications thay vì alert()
   - Error boundary components

3. **Loading states**:
   - Skeleton screens
   - Progress indicators

4. **Thêm features**:
   - Xem danh sách học viên của khóa học
   - Xem điểm của học viên
   - Chỉnh sửa thông tin khóa học
   - Upload tài liệu

## 📄 Documentation Files

- `udemy/InstructorAPI.md` - Chi tiết API cần implement
- `udemy/QuestionAPI.md` - API câu hỏi (đã có)
- `udemy/TestAPI.md` - API test (đã có)

## 💡 Notes

- Tất cả API calls đã được implement với error handling
- Mock data được sử dụng khi API chưa sẵn sàng
- Code có comments `// TODO Backend:` cho phần backend cần implement
- isCorrect field được sử dụng đồng nhất trong toàn bộ code

## ✨ Features đầy đủ theo yêu cầu

✅ Xem được danh sách khoá học của mình
✅ Xem chi tiết khoá học (Chương, bài học, quiz)
✅ Xem được ngân hàng câu hỏi (Tạo câu hỏi {đề, các câu a,b,c,d, kèm đáp án đúng})
✅ Tạo bài test => Hiện ra ngân hàng câu hỏi => ấn nút chọn (thêm) => Xác nhận mở bài test
