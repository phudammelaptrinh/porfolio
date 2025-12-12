// EmailJS Configuration
// Note: Public Key is safe to commit (protected by domain whitelist & rate limiting)
const EMAILJS_CONFIG = {
  serviceID: "YOUR_SERVICE_ID", // Thay bằng Service ID từ EmailJS
  templateID: "YOUR_TEMPLATE_ID", // Thay bằng Template ID từ EmailJS
  publicKey: "YOUR_PUBLIC_KEY", // Thay bằng Public Key từ EmailJS (AN TOÀN để public)
};

// Initialize EmailJS
export function initEmailJS() {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

// Send email via EmailJS
export async function sendEmail(formData) {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: "phuho22112003@gmail.com", // Email nhận
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams
    );

    console.log("Email sent successfully!", response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

// Alternative: Form validation helper
export function validateContactForm(formData) {
  const errors = {};

  // Validate name
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = "Tên phải có ít nhất 2 ký tự";
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Validate subject
  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = "Tiêu đề phải có ít nhất 3 ký tự";
  }

  // Validate message
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = "Tin nhắn phải có ít nhất 10 ký tự";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
