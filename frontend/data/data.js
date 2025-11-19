const Templates = [
  {
    id: "0",
    title: "Vũ trụ xanh đen",
    author: "Lê Khánh Vinh",
    subtitle: "Có hỗ trợ xuất CV",
    imgLink: "../resource/img0.png",
    date: "22/09/2025",
    price: 490000,
    description: `Template Portfolio Dark Mode được thiết kế dành riêng cho lập trình viên muốn thể hiện cá tính chuyên nghiệp trên nền giao diện tối giản, sang trọng. Giao diện sử dụng HTML, CSS và JavaScript thuần, tối ưu cho tốc độ tải nhanh và khả năng tùy chỉnh dễ dàng.
        Với tông màu đen chủ đạo, template mang đến cảm giác hiện đại, tập trung vào nội dung và các dự án của bạn. Bố cục được sắp xếp rõ ràng: Trang chủ – Giới thiệu – Kỹ năng – Dự án – Liên hệ, phù hợp để trình bày hồ sơ cá nhân, showcase dự án và kỹ năng lập trình.
        Ngoài ra, template còn hỗ trợ hiệu ứng cuộn mượt, animation nhẹ nhàng, responsive trên mọi thiết bị, giúp bạn tạo ấn tượng mạnh mẽ ngay từ cái nhìn đầu tiên. Đồng thời có tính năng dịch tự động sang tiếng Anh, giúp mở rộng khả năng tiếp cận quốc tế.`,
  },
  {
    id: "1",
    title: "Màu sắc tươi mới",
    author: "Nguyễn Văn A",
    subtitle: "Tối ưu hóa cho Mobile First",
    imgLink: "../resource/img1.png",
    date: "15/10/2025",
    price: 350000,
    description: `Template cá nhân sử dụng tông màu Pastel sáng, mang lại cảm giác trẻ trung, năng động. Thiết kế này lý tưởng cho các nhà thiết kế UI/UX hoặc Frontend Developer muốn làm nổi bật sự sáng tạo. Giao diện được xây dựng với Tailwind CSS, đảm bảo tính responsive tuyệt đối và dễ dàng mở rộng.
        Template bao gồm các phần: Gallery ảnh dự án, Blog cá nhân và trang Liên hệ chi tiết. Điểm mạnh là tốc độ tải siêu nhanh và khả năng tùy biến màu sắc linh hoạt chỉ bằng việc chỉnh sửa các biến CSS. Đây là lựa chọn hoàn hảo cho những ai yêu thích phong cách tối giản nhưng vẫn đầy màu sắc.`,
  },
  {
    id: "2",
    title: "Giao diện Doanh nghiệp",
    author: "Trần Thị B",
    subtitle: "Phù hợp cho công ty công nghệ",
    imgLink: "../resource/img2.png",
    date: "01/11/2025",
    price: 790000,
    description: `Template Website Doanh nghiệp với bố cục chuyên nghiệp, tông màu xanh dương và trắng chủ đạo thể hiện sự tin cậy và chuyên nghiệp. Template này được thiết kế theo phong cách One-Page Scroll, tập trung truyền tải thông điệp và dịch vụ một cách trực quan nhất.
        Các thành phần chính bao gồm: Banner lớn với Call-to-Action rõ ràng, phần Giới thiệu đội ngũ, Danh mục dịch vụ và Form Đăng ký nhận tin. Được xây dựng dựa trên Bootstrap 5, template đảm bảo sự tương thích và ổn định trên mọi trình duyệt. Đặc biệt, có tích hợp sẵn hiệu ứng parallax cuộn trang.`,
  },
  {
    id: "3",
    title: "Phóng khoáng & Sáng tạo",
    author: "Phạm Minh C",
    subtitle: "Thiết kế dành cho Freelancer",
    imgLink: "../resource/img3.png",
    date: "10/11/2025",
    price: 550000,
    description: `Một template Portfolio độc đáo với bố cục Grid linh hoạt và hiệu ứng Hover ấn tượng, thích hợp cho các Freelancer trong lĩnh vực thiết kế đồ họa, nhiếp ảnh, hoặc video editor. Template sử dụng hiệu ứng chuyển động mượt mà bằng CSS Transitions, mang lại trải nghiệm người dùng cao cấp.
        Các trang trình bày được thiết kế để dễ dàng thay đổi nội dung, tập trung vào các case study và kết quả công việc. Nó đi kèm với một trang riêng biệt cho khách hàng tiềm năng gửi yêu cầu báo giá. Template này không sử dụng thư viện lớn, chỉ dựa vào Vanilla JavaScript để tối ưu hóa hiệu suất.`,
  },
];
Users = [
  {
    id: 0,
    fullName: "Lê Khánh Vinh",
    email: "khanhvinh2288@gmail.com",
    username: "admin",
    password: "123456",
    cart: [0, 3],
  },
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    username: "vana",
    password: "userA123",
    cart: [2, 4],
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    username: "thibee",
    password: "userB456",
    cart: [1, 5],
  },
  {
    id: 3,
    fullName: "Phạm Minh C",
    email: "phamminhc@example.com",
    username: "minhc",
    password: "userC789",
    cart: [3, 5],
  },
  {
    id: 4,
    fullName: "Hoàng Đức D",
    email: "hoangducd@example.com",
    username: "ducd123",
    password: "userD111",
    cart: [1],
  },
  {
    id: 5,
    fullName: "Vũ Hải Yến",
    email: "vuhaixen@example.com",
    username: "haiyen",
    password: "userY222",
    cart: [1, 2],
  },
];
Rates = [
  {
    id: 0,
    content: "Đẹp quá",
    userId: 5,
    templateId: 0,
    rating: 3,
    date: "2025-11-01",
  },
  {
    id: 2,
    content: "Nhìn thích vô cùng luôn.",
    userId: 0,
    templateId: 0,
    rating: 5,
    date: "2025-11-01",
  },
];
