export const courseData = {
  id: 1,
  title: "Lập Trình Python Từ Cơ Bản Đến Nâng Cao",
  instructor: "Al Coding",
  description: "Khóa học toàn diện về Python từ cơ bản đến nâng cao trong 30 ngày",
  totalLessons: 25,
  completedLessons: 8,
  chapters: [
    {
      id: 1,
      title: "Chương 1: Giới thiệu về Python",
      order: 1,
      lessons: [
        {
          id: 1,
          title: "Bài 1: Python là gì? Tại sao nên học Python?",
          duration: "15:30",
          type: "video",
          completed: true,
          videoUrl: "https://example.com/video1",
          content: "Giới thiệu tổng quan về ngôn ngữ Python và ứng dụng thực tế."
        },
        {
          id: 2,
          title: "Bài 2: Cài đặt môi trường Python",
          duration: "20:15",
          type: "video",
          completed: true,
          videoUrl: "https://example.com/video2",
          content: "Hướng dẫn cài đặt Python và các công cụ cần thiết."
        },
        {
          id: 3,
          title: "Quiz: Kiến thức cơ bản Python",
          duration: "10:00",
          type: "quiz",
          completed: false,
          questions: [
            {
              id: 1,
              question: "Python được tạo ra vào năm nào?",
              options: [
                "1991",
                "1995", 
                "2000",
                "2005"
              ],
              correctAnswer: 0
            },
            {
              id: 2,
              question: "Python là ngôn ngữ lập trình gì?",
              options: [
                "Biên dịch",
                "Thông dịch",
                "Assembly",
                "Machine Code"
              ],
              correctAnswer: 1
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Chương 2: Cú pháp cơ bản",
      order: 2,
      lessons: [
        {
          id: 4,
          title: "Bài 3: Biến và kiểu dữ liệu",
          duration: "25:40",
          type: "video",
          completed: true,
          videoUrl: "https://example.com/video3",
          content: "Tìm hiểu về biến, các kiểu dữ liệu cơ bản trong Python."
        },
        {
          id: 5,
          title: "Bài 4: Toán tử và biểu thức",
          duration: "18:20",
          type: "video", 
          completed: false,
          videoUrl: "https://example.com/video4",
          content: "Các toán tử cơ bản và cách sử dụng biểu thức."
        },
        {
          id: 6,
          title: "Quiz: Cú pháp cơ bản",
          duration: "15:00",
          type: "quiz",
          completed: false,
          questions: [
            {
              id: 1,
              question: "Cách khai báo biến nào sau đây là đúng trong Python?",
              options: [
                "int x = 5",
                "var x = 5",
                "x = 5",
                "let x = 5"
              ],
              correctAnswer: 2
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Chương 3: Cấu trúc điều khiển",
      order: 3,
      lessons: [
        {
          id: 7,
          title: "Bài 5: Câu lệnh điều kiện if-else",
          duration: "22:10",
          type: "video",
          completed: false,
          videoUrl: "https://example.com/video5",
          content: "Sử dụng câu lệnh điều kiện để điều hướng chương trình."
        },
        {
          id: 8,
          title: "Bài 6: Vòng lặp for và while",
          duration: "28:30",
          type: "video",
          completed: false,
          videoUrl: "https://example.com/video6",
          content: "Tìm hiểu về vòng lặp và cách sử dụng hiệu quả."
        }
      ]
    }
  ]
};