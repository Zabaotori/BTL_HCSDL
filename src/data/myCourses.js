export const myCourses = [
  {
    id: 1,
    title: "Lập Trình Python Từ Cơ Bản Đến Nâng Cao",
    instructor: "Al Coding",
    thumbnail: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop",
    progress: 75,
    lastAccessed: "2024-01-15",
    category: "Lập trình",
    duration: "30 giờ",
    lessonsCompleted: 18,
    totalLessons: 24,
    status: "in-progress", // in-progress, completed, not-started
    rating: 4.8,
    favorite: true
  },
  {
    id: 2,
    title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
    instructor: "Al Coding",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    progress: 100,
    lastAccessed: "2024-01-10",
    category: "DevOps",
    duration: "25 giờ",
    lessonsCompleted: 20,
    totalLessons: 20,
    status: "completed",
    rating: 4.9,
    favorite: false
  },
  {
    id: 3,
    title: "Vở lòng về Amazon Web Services",
    instructor: "Thang Nguyen",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    progress: 30,
    lastAccessed: "2024-01-14",
    category: "Cloud Computing",
    duration: "40 giờ",
    lessonsCompleted: 6,
    totalLessons: 20,
    status: "in-progress",
    rating: 4.7,
    favorite: true
  },
  {
    id: 4,
    title: "Khóa học ITBA cơ bản",
    instructor: "BÀ HUY",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    progress: 0,
    lastAccessed: null,
    category: "Business Analysis",
    duration: "35 giờ",
    lessonsCompleted: 0,
    totalLessons: 28,
    status: "not-started",
    rating: 4.6,
    favorite: false
  },
  {
    id: 5,
    title: "Vở lòng về Automation với nền",
    instructor: "Thang Nguyen",
    thumbnail: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop",
    progress: 45,
    lastAccessed: "2024-01-12",
    category: "Automation",
    duration: "28 giờ",
    lessonsCompleted: 9,
    totalLessons: 20,
    status: "in-progress",
    rating: 4.7,
    favorite: false
  },
  {
    id: 6,
    title: "Khoa học NestJS Microservices Thực Chiến",
    instructor: "Đỗ Tấn Thành",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    progress: 100,
    lastAccessed: "2023-12-20",
    category: "Backend Development",
    duration: "45 giờ",
    lessonsCompleted: 30,
    totalLessons: 30,
    status: "completed",
    rating: 4.9,
    favorite: true
  }
];

export const categories = [
  "Tất cả",
  "Lập trình",
  "DevOps", 
  "Cloud Computing",
  "Business Analysis",
  "Automation",
  "Backend Development"
];

export const statusFilters = [
  { value: "all", label: "Tất cả" },
  { value: "in-progress", label: "Đang học" },
  { value: "completed", label: "Đã hoàn thành" },
  { value: "not-started", label: "Chưa bắt đầu" }
];