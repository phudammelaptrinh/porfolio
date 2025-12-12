# Portfolio Project - Refactored Structure

## 📋 Tổng quan thay đổi

Project đã được refactor thành cấu trúc modular để dễ quản lý và maintain.

## 🗂️ Cấu trúc CSS Modules

### 1. `css/base.css`

- CSS Reset & Box-sizing
- CSS Variables (Light/Dark theme)
- Base styles (html, body, container, section)
- Button styles (btn-primary, btn-secondary)

### 2. `css/navigation.css`

- Navbar styles
- Navigation menu
- Theme toggle
- Hamburger menu
- Logo styles

### 3. `css/styles.css`

- Hero section
- About section
- Skills section
- Projects section
- Contact section
- Footer
- Animations (glitch, float, etc.)

### 4. `css/chatbox.css` ⭐ UPDATED

- Chatbox container & toggle
- Chatbox window
- Message styles (bot/user)
- Quick replies
- Contact info cards
- Project preview cards
- **FIXED: iPhone SE (375px) responsive support**
- **FIXED: Extra small devices (320px) support**

### 5. `css/responsive.css`

- Tablet breakpoint (768px)
- Mobile breakpoint (480px)
- iPhone SE breakpoint (375px)
- Responsive grid layouts
- Font size adjustments

## 🔧 JavaScript Modules

### 1. `js/navigation.js`

Exports:

- `initMobileMenu()` - Hamburger menu toggle
- `initThemeToggle()` - Dark/Light mode
- `initTypewriter()` - Typing effect
- `initSmoothScrolling()` - Smooth scroll anchors

### 2. `js/utils.js`

Exports:

- `initContactForm()` - Form validation & submission
- `initNavbarScroll()` - Navbar shadow on scroll
- `initAnimations()` - Intersection Observer
- `initActiveNav()` - Active nav link highlighting

### 3. `js/main.js` (Entry Point)

- Import all modules
- Initialize all features on DOMContentLoaded
- ES6 module syntax

### 4. `js/script.js` (Legacy - Chatbox)

- Chatbox logic (được giữ nguyên)
- Quick replies handling
- Project/contact display
- Email integration

## 📱 Responsive Fixes

### Chatbox trên iPhone SE (375px):

```css
.chatbox-toggle: 45px × 45px
.chat-notification: 16px × 16px
.chatbox-window: calc(100vw - 15px)
.chatbox-container: bottom 10px, right 10px
```

### Chatbox trên Mobile (480px):

```css
.chatbox-toggle: 50px × 50px
.chat-notification: 18px × 18px
.chatbox-window: calc(100vw - 20px)
```

### Chatbox trên Tablet (768px):

```css
.chatbox-window: calc(100vw - 30px)
max-height: 550px
```

## 🎨 Import Order trong index.html

```html
<!-- CSS Modules -->
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/navigation.css" />
<link rel="stylesheet" href="css/styles.css" />
<link rel="stylesheet" href="css/chatbox.css" />
<link rel="stylesheet" href="css/responsive.css" />

<!-- JavaScript Modules -->
<script type="module" src="js/main.js"></script>
<script src="js/script.js"></script>
```

## ✅ Ưu điểm của cấu trúc mới

1. **Dễ maintain**: Mỗi file có trách nhiệm riêng
2. **Dễ debug**: Tìm bug nhanh hơn do code được tách biệt
3. **Dễ scale**: Thêm features mới không ảnh hưởng code cũ
4. **Performance**: Browser cache từng file riêng
5. **Collaboration**: Nhiều người có thể làm việc song song
6. **Code reuse**: Có thể import lại modules cho projects khác

## 🔄 Migration Guide

### Nếu muốn thêm feature mới:

1. **CSS mới**: Tạo file trong `css/` và import vào `index.html`
2. **JS mới**: Tạo file trong `js/`, export functions, import vào `main.js`
3. **Responsive**: Thêm breakpoints vào `responsive.css`

### Example:

```javascript
// js/animations.js
export function initParallax() {
  // code here
}

// js/main.js
import { initParallax } from "./animations.js";
initParallax();
```

## 🐛 Bug Fixes

- ✅ Chatbox hiển thị đúng trên iPhone SE (375px)
- ✅ Notification badge không bị to
- ✅ Quick reply buttons responsive
- ✅ Message content readable trên mobile
- ✅ Contact cards fit trong small screens

## 📊 File Sizes

- `styles.css`: ~1600 lines → Đã tách thành 5 files
- `script.js`: ~814 lines → Đã tách core logic ra 3 modules

## 🚀 Next Steps

1. Add image optimization
2. Implement lazy loading
3. Add service worker for PWA
4. Setup build process (Webpack/Vite)
5. Add unit tests
