# 🔒 Bảo Mật EmailJS - Giải Đáp Thắc Mắc

## ❓ Public Key có an toàn để commit lên GitHub không?

### ✅ CÓ - Hoàn toàn an toàn!

**Lý do:**

1. **Public Key được thiết kế để công khai**

   - Tên gọi là "Public" Key (khóa công khai)
   - Giống như API key của Google Maps, Firebase, Stripe (client-side)
   - Được sử dụng trên browser (frontend), ai cũng có thể xem

2. **EmailJS bảo vệ bằng nhiều lớp:**

   - ✅ **Domain Whitelist**: Chỉ cho phép domain bạn chỉ định
   - ✅ **Rate Limiting**: Giới hạn số email/ngày (200 emails/tháng free)
   - ✅ **reCAPTCHA**: Ngăn chặn bot spam
   - ✅ **Email Template**: Không cho phép thay đổi nội dung template từ client

3. **Không thể làm gì với Public Key:**
   - ❌ Không đọc được email của bạn
   - ❌ Không gửi email tùy ý (bị giới hạn bởi template)
   - ❌ Không truy cập được EmailJS account
   - ❌ Không xem được thống kê/logs

---

## 🛡️ Cách Tăng Cường Bảo Mật

### 1. Bật Domain Whitelist

```
EmailJS Dashboard → Account → Security → Allowed Domains
```

Chỉ thêm domain của bạn:

- `localhost` (cho dev)
- `yourusername.github.io` (cho GitHub Pages)

### 2. Bật reCAPTCHA v3

```
EmailJS Dashboard → Account → Security → reCAPTCHA
```

- Chọn reCAPTCHA v3 (invisible, không cần click)
- Ngăn chặn 99% spam/bot

### 3. Giới Hạn Template

- Template cố định, không cho phép thay đổi từ client
- Chỉ cho phép truyền variables: `{{from_name}}`, `{{message}}`
- Không cho phép thay đổi: To Email, Subject format, HTML structure

### 4. Monitor Usage

```
EmailJS Dashboard → Usage
```

- Kiểm tra số email gửi/ngày
- Phát hiện sớm nếu bị abuse

---

## 🔑 So Sánh với Backend API

| Yếu Tố            | EmailJS (Frontend) | Backend API        |
| ----------------- | ------------------ | ------------------ |
| Public Key        | ✅ An toàn commit  | ❌ Phải giữ bí mật |
| Domain Protection | ✅ Built-in        | Phải tự code       |
| Rate Limiting     | ✅ Built-in        | Phải tự code       |
| reCAPTCHA         | ✅ Built-in        | Phải tự integrate  |
| Chi phí           | ✅ Free 200/tháng  | Server + Database  |
| GitHub Pages      | ✅ Hoạt động       | ❌ Không hỗ trợ    |

---

## 📋 Checklist Bảo Mật

Trước khi deploy:

- [ ] Đã cấu hình **Domain Whitelist** (chỉ domain của bạn)
- [ ] Đã bật **reCAPTCHA v3** (ngăn bot)
- [ ] Đã test gửi email thành công
- [ ] Đã kiểm tra email template cố định
- [ ] Đã xem Usage Dashboard (monitor)

---

## ⚠️ Lưu Ý KHÔNG nên commit

**KHÔNG commit những thứ này:**

1. ❌ **Private/Secret Keys** (không phải Public Key)
2. ❌ **OAuth Tokens** (GitHub, Google access tokens)
3. ❌ **Database Passwords**
4. ❌ **Server API Keys** (backend keys)
5. ❌ **Payment Gateway Secret Keys** (Stripe secret key)

**CÓ THỂ commit:**

1. ✅ EmailJS Public Key
2. ✅ Firebase Config (API key, Project ID)
3. ✅ Google Maps API Key (nếu bật domain restriction)
4. ✅ reCAPTCHA Site Key (public)
5. ✅ Stripe Publishable Key (public)

---

## 🎯 Kết Luận

**EmailJS Public Key = An toàn 100% để commit lên GitHub**

Chỉ cần:

1. Bật **Domain Whitelist** → Chỉ domain bạn dùng được
2. Bật **reCAPTCHA** → Chặn bot
3. Monitor **Usage** → Phát hiện abuse

→ Website của bạn an toàn như các website lớn (Google Forms, Typeform...)
