# Portfolio Website

Website portfolio cá nhân hiện đại với thiết kế responsive và dark mode.

![Portfolio Preview](https://img.shields.io/badge/Status-Ready-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Tính năng

- 🎨 **Thiết kế hiện đại**: Giao diện đẹp mắt với gradient và animations
- 🌓 **Dark Mode**: Chuyển đổi giữa light/dark theme
- 📱 **Responsive**: Hoạt động hoàn hảo trên mọi thiết bị
- ⚡ **Performance**: Tối ưu tốc độ tải trang
- 🎯 **SEO Friendly**: Cấu trúc HTML semantic
- ✉️ **Contact Form**: Form liên hệ với validation
- 🎭 **Animations**: Hiệu ứng mượt mà và thu hút

## 🚀 Demo

Xem demo tại: [Your Demo Link]

## 📂 Cấu trúc Project

```
profolio/
├── index.html              # File HTML chính
├── css/                    # CSS Modules
│   ├── base.css           # Reset, variables, buttons
│   ├── navigation.css     # Navigation & navbar styles
│   ├── styles.css         # Sections styles (hero, about, skills, etc.)
│   ├── chatbox.css        # Chatbot styles (với iPhone SE support)
│   └── responsive.css     # Responsive breakpoints
├── js/                     # JavaScript Modules
│   ├── main.js            # Main app entry point (ES6 modules)
│   ├── navigation.js      # Navigation, theme, typewriter
│   ├── utils.js           # Form, animations, scroll effects
│   └── script.js          # Chatbox logic
├── assets/
│   └── images/            # Thư mục chứa hình ảnh
│       ├── profile.jpg    # Ảnh profile
│       ├── project1.jpg   # Ảnh dự án 1
│       ├── project2.jpg   # Ảnh dự án 2
│       └── project3.jpg   # Ảnh dự án 3
├── .gitignore
└── README.md
```

## 🛠️ Cài đặt

1. **Clone repository**:

```bash
git clone https://github.com/yourusername/profolio.git
cd profolio
```

2. **Thêm hình ảnh**:

   - Đặt ảnh đại diện vào `assets/images/profile.jpg`
   - Đặt ảnh dự án vào `assets/images/project1.jpg`, `project2.jpg`, `project3.jpg`

3. **Tùy chỉnh nội dung**:

   - Mở `index.html` và cập nhật thông tin cá nhân
   - Thay đổi màu sắc trong `styles.css` (CSS Variables)
   - Cập nhật links mạng xã hội

4. **Chạy local**:
   - Mở `index.html` bằng browser
   - Hoặc dùng Live Server extension trong VS Code

## 🎨 Tùy chỉnh màu sắc

Thay đổi màu sắc chính trong `styles.css`:

```css
:root {
  --primary-color: #6366f1; /* Màu chính */
  --secondary-color: #8b5cf6; /* Màu phụ */
  --accent-color: #ec4899; /* Màu nhấn */
}
```

## 📝 Cập nhật nội dung

### 1. Thông tin cá nhân (index.html)

- Tên, mô tả trong Hero section
- Giới thiệu trong About section
- Thông tin liên hệ trong Contact section

### 2. Kỹ năng (index.html)

- Thêm/bớt skill items trong Skills section
- Icons từ Font Awesome

### 3. Dự án (index.html)

- Cập nhật thông tin dự án
- Thêm links Github/Demo
- Thay đổi tags công nghệ

### 4. Mạng xã hội

- Cập nhật URLs trong social links
- Github, LinkedIn, Twitter, Email

## 🚀 Deploy

### GitHub Pages

1. Push code lên GitHub repository
2. Vào Settings > Pages
3. Chọn branch `main` và folder `/ (root)`
4. Website sẽ được deploy tại `https://yourusername.github.io/profolio`

### Netlify

1. Kéo thả thư mục vào [Netlify Drop](https://app.netlify.com/drop)
2. Hoặc connect với GitHub repository
3. Website được deploy tự động

### Vercel

```bash
npm i -g vercel
vercel --prod
```

## 📧 Contact Form Setup

Hiện tại form chỉ hiển thị notification. Để gửi email thực tế, có thể dùng:

### Option 1: EmailJS

1. Đăng ký tài khoản tại [EmailJS](https://www.emailjs.com/)
2. Thêm EmailJS SDK vào `index.html`
3. Cập nhật form handler trong `script.js`

### Option 2: Formspree

1. Đăng ký tại [Formspree](https://formspree.io/)
2. Thêm action URL vào form
3. Formspree sẽ xử lý email forwarding

### Option 3: Backend API

- Tạo API endpoint riêng
- Cập nhật form submit handler

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📱 Responsive Breakpoints

- 📱 Mobile: < 480px
- 📱 Tablet: 481px - 768px
- 💻 Desktop: > 768px

## 🤝 Contributing

Contributions, issues và feature requests đều được welcome!

## 📄 License

Free to use cho mục đích cá nhân và thương mại.

## 👨‍💻 Author

**Tên của bạn**

- Github: [@yourusername](https://github.com/yourusername)
- LinkedIn: [@yourusername](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- Font Awesome cho icons
- Google Fonts cho typography
- Inspiration từ các portfolio websites trên Dribbble & Behance

---

⭐ Nếu thấy hữu ích, hãy star repo này nhé!
