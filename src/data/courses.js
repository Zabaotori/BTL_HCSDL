export const courses = {
  recommended: [
    {
      id: 1,
      title: "Khóa học ITBA cơ bản",
      instructor: "BÀ HUY",
      rating: 4.7,
      reviews: 147,
      price: null, // Miễn phí
      originalPrice: null,
      badge: null,
      category: "Business Analysis",
      level: "beginner",
      duration: "30 giờ",
      students: 1250
    },
    {
      id: 2,
      title: "Vở lòng về Automation với nền",
      instructor: "Thang Nguyen",
      rating: 4.7,
      reviews: 852,
      price: null, // Miễn phí
      originalPrice: null,
      badge: null,
      category: "Automation",
      level: "beginner", 
      duration: "25 giờ",
      students: 890
    },
    {
      id: 3,
      title: "Lập Trình Python Từ Cơ Bản Đến Nâng Cao Trong 30 Ngày",
      instructor: "Al Coding",
      rating: 4.8,
      reviews: 905,
      price: null, // Miễn phí
      originalPrice: null,
      badge: "Bản chạy mắt",
      category: "Lập trình",
      level: "beginner",
      duration: "40 giờ",
      students: 2100
    },
    {
      id: 4,
      title: "Khoa học NestJS Microservices Thực Chiến",
      instructor: "Đỗ Tấn Thành",
      rating: 4.9,
      reviews: 31,
      price: null, // Miễn phí
      originalPrice: null,
      badge: null,
      category: "Backend Development",
      level: "intermediate",
      duration: "35 giờ", 
      students: 450
    },
    {
      id: 5,
      title: "Tâm Lý Học Ứng Dụng Giao Tiếp – Hợp Tác Liên Phòng",
      instructor: "Xuân Hương Đặng",
      rating: 4.9,
      reviews: 31,
      price: null, // Miễn phí
      originalPrice: null,
      badge: null,
      category: "Kỹ năng mềm",
      level: "beginner",
      duration: "20 giờ",
      students: 780
    },
    {
      id: 6,
      title: "Đạo đức trong AI — Thiên lệch, Quyền lực và Trách nhiệm",
      instructor: "Zenson Tran",
      rating: 4.9,
      reviews: 29,
      price: null, // Miễn phí
      originalPrice: null,
      badge: "Mới",
      category: "AI & Ethics",
      level: "intermediate",
      duration: "15 giờ",
      students: 320
    },
    {
      id: 7,
      title: "Vở lòng về Amazon Web Services",
      instructor: "Thang Nguyen",
      rating: 4.8,
      reviews: 485,
      price: null, // Miễn phí
      originalPrice: null,
      badge: null,
      category: "Cloud Computing",
      level: "beginner",
      duration: "28 giờ",
      students: 1500
    },
    {
      id: 8,
      title: "Thành Thạo Docker Từ Cơ Bản Đến Nâng Cao",
      instructor: "Al Coding",
      rating: 4.9,
      reviews: 152,
      price: null, // Miễn phí
      originalPrice: null,
      badge: "Thịnh hành & mới",
      category: "DevOps",
      level: "intermediate",
      duration: "32 giờ",
      students: 980
    },
    {
      id: 9,
      title: "Khoa học NestJS Microservices Thực Chiến",
      instructor: "Đỗ Tấn Thành",
      rating: 4.9,
      reviews: 31,
      price: null, // Miễn phí
      originalPrice: null,
      badge: null,
      category: "Backend Development",
      level: "advanced",
      duration: "45 giờ",
      students: 290
    }
  ]
};

// Categories for filtering
export const categories = [
  "Tất cả",
  "Lập trình",
  "Automation",
  "Backend Development", 
  "Kỹ năng mềm",
  "AI & Ethics",
  "Cloud Computing",
  "DevOps",
  "Business Analysis"
];

export const levels = [
  { value: "all", label: "Tất cả cấp độ" },
  { value: "beginner", label: "Cơ bản" },
  { value: "intermediate", label: "Trung cấp" },
  { value: "advanced", label: "Nâng cao" }
];