# 📧 Hướng dẫn cấu hình EmailJS

EmailJS cho phép gửi email trực tiếp từ JavaScript mà không cần backend hoặc database. Hoàn hảo cho GitHub Pages!

## 🚀 Bước 1: Đăng ký EmailJS

1. Truy cập [https://www.emailjs.com/](https://www.emailjs.com/)
2. Nhấn "Sign Up" để tạo tài khoản miễn phí
3. Xác nhận email

**Free Plan:**

- 200 emails/tháng
- Hoàn toàn miễn phí
- Đủ cho portfolio cá nhân

## 📨 Bước 2: Tạo Email Service

1. Đăng nhập vào EmailJS Dashboard
2. Vào tab **"Email Services"**
3. Nhấn **"Add New Service"**
4. Chọn Gmail (hoặc email provider khác):
   - **Gmail**: Nhấn "Connect Account" và đăng nhập Gmail
   - Cho phép EmailJS truy cập
5. Copy **Service ID** (ví dụ: `service_abc123`)

## 📝 Bước 3: Tạo Email Template

1. Vào tab **"Email Templates"**
2. Nhấn **"Create New Template"**
3. Thiết kế template:

### Template Content:

**Subject:**

```
Liên hệ từ Portfolio: {{subject}}
```

**Body:**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f4f4f4;
      }
      .content {
        background: white;
        padding: 20px;
        border-radius: 10px;
      }
      .header {
        background: #000;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 10px 10px 0 0;
      }
      .info {
        margin: 15px 0;
        padding: 10px;
        background: #f9f9f9;
        border-left: 4px solid #000;
      }
      .label {
        font-weight: bold;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <div class="header">
          <h2>📬 Tin nhắn mới từ Portfolio</h2>
        </div>

        <div class="info">
          <p><span class="label">Từ:</span> {{from_name}}</p>
          <p><span class="label">Email:</span> {{from_email}}</p>
        </div>

        <div class="info">
          <p><span class="label">Tiêu đề:</span> {{subject}}</p>
        </div>

        <div class="info">
          <p><span class="label">Nội dung:</span></p>
          <p>{{message}}</p>
        </div>

        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          Email này được gửi từ form liên hệ trên portfolio của bạn.
        </p>
      </div>
    </div>
  </body>
</html>
```

4. **Template Settings:**

   - To Email: `{{to_email}}` hoặc điền trực tiếp email của bạn
   - From Name: `{{from_name}}`
   - Reply To: `{{from_email}}`

5. Nhấn **"Save"**
6. Copy **Template ID** (ví dụ: `template_xyz789`)

## 🔑 Bước 4: Lấy Public Key

1. Vào tab **"Account"** → **"General"**
2. Tìm **"Public Key"** (hoặc "API Keys")
3. Copy **Public Key** (ví dụ: `abcdefghij123456`)

## ⚙️ Bước 5: Cấu hình trong Code

Mở file `js/emailService.js` và thay đổi:

```javascript
const EMAILJS_CONFIG = {
  serviceID: "service_abc123", // Service ID từ bước 2
  templateID: "template_xyz789", // Template ID từ bước 3
  publicKey: "abcdefghij123456", // Public Key từ bước 4
};
```

### Ví dụ cụ thể:

```javascript
const EMAILJS_CONFIG = {
  serviceID: "service_portfolio",
  templateID: "template_contact",
  publicKey: "user_kL9m3N4pQ5rS6tU7v",
};
```

## 🧪 Bước 6: Test

1. Mở website local: `index.html`
2. Điền form liên hệ
3. Nhấn "Gửi tin nhắn"
4. Kiểm tra email (có thể mất 1-2 phút)

## ✅ Xác nhận hoạt động

Khi gửi thành công, bạn sẽ thấy:

- ✅ Thông báo "Tin nhắn đã được gửi thành công!"
- ✅ Form được reset
- ✅ Email xuất hiện trong hộp thư

## 🐛 Troubleshooting

### Lỗi: "Invalid Public Key"

- Kiểm tra lại Public Key trong `emailService.js`
- Đảm bảo không có khoảng trắng thừa

### Lỗi: "Service ID not found"

- Service ID phải match với service bạn tạo
- Kiểm tra trong EmailJS Dashboard

### Lỗi: "Template not found"

- Template ID phải match với template bạn tạo
- Kiểm tra trong EmailJS Dashboard

### Email không nhận được

- Kiểm tra spam/junk folder
- Kiểm tra "To Email" trong template settings
- Xem logs trong EmailJS Dashboard → "Logs"

## 📊 Monitor Usage

1. Vào EmailJS Dashboard
2. Tab "Usage" để xem:
   - Số email đã gửi
   - Limit còn lại (200/tháng)
   - Success rate

## 💡 Tips

1. **Test Template:** Dùng "Test it" trong template editor
2. **Custom Domain:** Upgrade để remove "via EmailJS"
3. **Multiple Templates:** Tạo templates khác cho chatbot
4. **Auto-reply:** Tạo template thứ 2 để gửi email xác nhận cho người dùng

## 🔒 Security

- ✅ Public Key có thể public (safe cho GitHub)
- ✅ EmailJS filter spam automatically
- ✅ Rate limiting built-in
- ❌ Không lưu Private Key trong code

## 📚 Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Gmail Setup Guide](https://www.emailjs.com/docs/examples/gmail/)
- [Template Variables](https://www.emailjs.com/docs/user-guide/template-variables/)

## 🎉 Hoàn thành!

Sau khi cấu hình xong:

1. ✅ Form liên hệ sẽ gửi email thật
2. ✅ Không cần backend/database
3. ✅ Hoạt động trên GitHub Pages
4. ✅ Miễn phí 200 emails/tháng

**Lưu ý:** Nhớ test kỹ trước khi deploy!
