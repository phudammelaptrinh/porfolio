import { initEmailJS, sendEmail, validateContactForm } from "./emailService.js";

const contactForm = document.getElementById("contactForm");

function showNotification(message, type) {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 2rem;
    background: ${type === "success" ? "#10b981" : "#ef4444"};
    color: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 400px;
  `;

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Add to body
  document.body.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

export function initContactForm() {
  if (!contactForm) return;

  // Initialize EmailJS
  initEmailJS();

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

    // Get form data
    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      subject: contactForm.subject.value,
      message: contactForm.message.value,
    };

    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      showNotification(firstError, "error");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    // Send email via EmailJS
    const result = await sendEmail(formData);

    if (result.success) {
      showNotification(
        "Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm.",
        "success"
      );
      contactForm.reset();
    } else {
      showNotification(
        "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau!",
        "error"
      );
    }

    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  });
}

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

export function initNavbarScroll() {
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.style.boxShadow = "0 2px 10px var(--shadow)";
    } else {
      navbar.style.boxShadow = "0 2px 20px var(--shadow)";
    }

    lastScroll = currentScroll;
  });
}

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

export function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document
    .querySelectorAll("section, .project-card, .skill-category")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

export function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
}
