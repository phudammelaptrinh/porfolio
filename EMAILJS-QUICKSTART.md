# ⚡ Quick Setup EmailJS

## 1️⃣ Đăng ký EmailJS

- Truy cập: https://www.emailjs.com/
- Sign up miễn phí (200 emails/tháng)

## 2️⃣ Tạo Service

1. Dashboard → Email Services → Add New Service
2. Chọn Gmail → Connect Account
3. Copy **Service ID**

## 3️⃣ Tạo Template

1. Dashboard → Email Templates → Create New Template
2. Subject: `Liên hệ từ Portfolio: {{subject}}`
3. To Email: `phuho22112003@gmail.com`
4. Copy **Template ID**

**Template Variables cần có:**

- `{{from_name}}`
- `{{from_email}}`
- `{{subject}}`
- `{{message}}`

## 4️⃣ Lấy Public Key

- Dashboard → Account → API Keys
- Copy **Public Key**

## 5️⃣ Cấu hình Code

Mở `js/emailService.js`:

```javascript
const EMAILJS_CONFIG = {
  serviceID: "YOUR_SERVICE_ID", // Paste Service ID
  templateID: "YOUR_TEMPLATE_ID", // Paste Template ID
  publicKey: "YOUR_PUBLIC_KEY", // Paste Public Key
};
```

## 6️⃣ Test

1. Mở `index.html`
2. Điền form liên hệ
3. Gửi → Kiểm tra email

✅ Done! Form liên hệ đã hoạt động!

---

📖 Chi tiết: Xem [EMAILJS-SETUP.md](./EMAILJS-SETUP.md)
