const chatboxToggle = document.getElementById("chatboxToggle");
const chatboxWindow = document.getElementById("chatboxWindow");
const chatboxClose = document.getElementById("chatboxClose");
const chatboxForm = document.getElementById("chatboxForm");
const chatboxMessageInput = document.getElementById("chatboxMessageInput");
const chatboxMessages = document.getElementById("chatboxMessages");
const chatNotification = document.querySelector(".chat-notification");
const quickReplies = document.getElementById("quickReplies");

// Toggle chatbox
chatboxToggle.addEventListener("click", () => {
  chatboxWindow.classList.toggle("active");
  if (chatboxWindow.classList.contains("active")) {
    chatNotification.style.display = "none";
    chatboxMessageInput.focus();
  }
});

// Close chatbox
chatboxClose.addEventListener("click", () => {
  chatboxWindow.classList.remove("active");
});

// Quick reply buttons
quickReplies.addEventListener("click", (e) => {
  const btn = e.target.closest(".quick-reply-btn");
  if (!btn) return;

  const action = btn.dataset.action;
  handleQuickReply(action);
});

// Handle quick reply actions
function handleQuickReply(action) {
  // Hide quick replies after click
  quickReplies.style.display = "none";

  // Add user message
  const actionTexts = {
    projects: "Cho tôi xem các dự án của Phú",
    contact: "Thông tin liên hệ của Phú",
    email: "Tôi muốn gửi email cho Phú",
    skills: "Kỹ năng của Phú",
    cv: "Tôi muốn tải CV/Hồ sơ của Phú",
  };

  addMessage(actionTexts[action], "user");

  // Show typing indicator
  showTypingIndicator();

  // Handle different actions
  setTimeout(() => {
    removeTypingIndicator();

    switch (action) {
      case "projects":
        showProjects();
        break;
      case "contact":
        showContactInfo();
        break;
      case "email":
        showEmailAction();
        break;
      case "skills":
        showSkills();
        break;
      case "cv":
        showCVDownload();
        break;
    }
  }, 800);
}

// Show projects
function showProjects() {
  addMessage("Đây là các dự án nổi bật của Phú:", "bot");

  // Get project data from the page
  const projects = [
    {
      title: "E-Commerce Website",
      description:
        "Website thương mại điện tử đầy đủ tính năng với giỏ hàng, thanh toán và quản lý sản phẩm.",
      tags: ["React", "Node.js", "MongoDB"],
      image: "assets/images/project1.jpg",
      link: "#projects",
    },
    {
      title: "Task Management App",
      description:
        "Ứng dụng quản lý công việc với tính năng kéo thả, deadline và collaboration.",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      image: "assets/images/project2.jpg",
      link: "#projects",
    },
    {
      title: "Weather Dashboard",
      description:
        "Dashboard thời tiết với dự báo chi tiết và biểu đồ thống kê.",
      tags: ["JavaScript", "API", "Chart.js"],
      image: "assets/images/project3.jpg",
      link: "#projects",
    },
  ];

  projects.forEach((project) => {
    const projectCard = `
      <a href="${
        project.link
      }" class="project-preview-card" onclick="scrollToSection('projects')">
        <img src="${project.image}" alt="${
      project.title
    }" class="project-preview-image" onerror="this.style.display='none'">
        <div class="project-preview-content">
          <h4>${project.title}</h4>
          <p>${project.description}</p>
          <div class="project-preview-tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </div>
      </a>
    `;

    addHTMLMessage(projectCard, "bot");
  });

  addMessage(
    "Nhấn vào dự án để xem chi tiết hoặc cuộn xuống phần Dự Án!",
    "bot"
  );
}

// Show contact info
function showContactInfo() {
  addMessage("Đây là thông tin liên hệ của Phú:", "bot");

  const contactCard = `
    <div class="contact-info-card">
      <a href="mailto:phuho22112003@gmail.com" class="contact-info-item">
        <i class="fas fa-envelope"></i>
        <div class="contact-info-text">
          <div class="label">Email</div>
          <div class="value">phuho22112003@gmail.com</div>
        </div>
      </a>
      <a href="tel:+84343989667" class="contact-info-item">
        <i class="fas fa-phone"></i>
        <div class="contact-info-text">
          <div class="label">Điện thoại</div>
          <div class="value">0343 989 667</div>
        </div>
      </a>
      <div class="contact-info-item" style="cursor: default;">
        <i class="fas fa-map-marker-alt"></i>
        <div class="contact-info-text">
          <div class="label">Địa chỉ</div>
          <div class="value">TP. Hồ Chí Minh, Việt Nam</div>
        </div>
      </div>
    </div>
  `;

  addHTMLMessage(contactCard, "bot");
  addMessage("Nhấn vào để liên hệ trực tiếp!", "bot");
}

// Show email action
function showEmailAction() {
  addMessage("Bạn có thể gửi email trực tiếp cho Phú:", "bot");

  const emailButton = `
    <a href="mailto:phuho22112003@gmail.com?subject=Liên hệ từ Portfolio&body=Xin chào Phú,%0D%0A%0D%0ATôi muốn liên hệ với bạn về..." 
       class="message-action-btn" 
       target="_blank">
      Mở Gmail để soạn thư
    </a>
  `;

  addHTMLMessage(emailButton, "bot");
  addMessage("Hoặc bạn có thể điền form liên hệ ở phần bên dưới! ✉️", "bot");

  // Add button to scroll to contact form
  const scrollButton = `
    <button class="message-action-btn" onclick="scrollToSection('contact')">
      Đến form liên hệ
    </button>
  `;

  addHTMLMessage(scrollButton, "bot");
}

// Show skills
function showSkills() {
  addMessage("Đây là các kỹ năng chính của Phú:", "bot");

  const skillsInfo = `
    <div class="contact-info-card">
      <div class="contact-info-item" style="cursor: default;">
        <i class="fab fa-react"></i>
        <div class="contact-info-text">
          <div class="label">Frontend</div>
          <div class="value">HTML, CSS, JavaScript, React, Vue.js</div>
        </div>
      </div>
      <div class="contact-info-item" style="cursor: default;">
        <i class="fab fa-node"></i>
        <div class="contact-info-text">
          <div class="label">Backend</div>
          <div class="value">Node.js, Python, MySQL, MongoDB</div>
        </div>
      </div>
      <div class="contact-info-item" style="cursor: default;">
        <i class="fab fa-git-alt"></i>
        <div class="contact-info-text">
          <div class="label">Tools & Others</div>
          <div class="value">Git, GitHub, Figma, Cloud Services</div>
        </div>
      </div>
    </div>
  `;

  addHTMLMessage(skillsInfo, "bot");

  const scrollButton = `
    <button class="message-action-btn" onclick="scrollToSection('skills')">
      Xem chi tiết kỹ năng
    </button>
  `;

  addHTMLMessage(scrollButton, "bot");
}

// Show CV Download
function showCVDownload() {
  addMessage("Đây là hồ sơ ứng tuyển của Phú:", "bot");

  const cvCard = `
    <div class="cv-download-card">
      <div class="cv-icon">
        <i class="fas fa-file-pdf"></i>
      </div>
      <div class="cv-info">
        <h4>CV - Hồ Trương Minh Phú</h4>
        <p>Web Developer | Frontend & Backend</p>
        <div class="cv-details">
          <span><i class="fas fa-calendar"></i> Cập nhật: 12/2025</span>
          <span><i class="fas fa-file"></i> PDF - 2.3 MB</span>
        </div>
      </div>
    </div>
  `;

  addHTMLMessage(cvCard, "bot");

  const downloadButton = `
    <a href="assets/CV_HoTruongMinhPhu.pdf" download class="cv-download-btn">
      <i class="fas fa-download"></i> Tải xuống CV
    </a>
  `;

  addHTMLMessage(downloadButton, "bot");
}

// Send message
chatboxForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = chatboxMessageInput.value.trim();
  if (!message) return;

  // Hide quick replies when user types
  quickReplies.style.display = "none";

  // Add user message
  addMessage(message, "user");

  // Clear input
  chatboxMessageInput.value = "";

  // Show typing indicator
  showTypingIndicator();

  // Simulate bot response after delay
  setTimeout(() => {
    removeTypingIndicator();

    // Generate bot response
    const botResponse = generateBotResponse(message);
    addMessage(botResponse, "bot");
  }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
});

// Add message to chat
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}-message`;

  const time = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  messageDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-user"></i>
    </div>
    <div class="message-content">
      <p>${text}</p>
      <span class="message-time">${time}</span>
    </div>
  `;

  chatboxMessages.appendChild(messageDiv);
  chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

// Add HTML message (for rich content like cards, buttons)
function addHTMLMessage(html, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}-message`;

  messageDiv.innerHTML = `
    <div class="message-avatar">
      ${
        sender === "user"
          ? '<i class="fas fa-user"></i>'
          : '<i class="fas fa-robot"></i>'
      }
    </div>
    <div class="message-content">
      ${html}
    </div>
  `;

  chatboxMessages.appendChild(messageDiv);
  chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

// Scroll to section function (used by buttons in chat)
window.scrollToSection = function (sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    // Close chatbox
    chatboxWindow.classList.remove("active");

    // Scroll to section
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Add a message confirming the action
    setTimeout(() => {
      chatboxWindow.classList.add("active");
      addMessage(`Đã đưa bạn đến phần ${getSectionName(sectionId)}!`, "bot");
    }, 1000);
  }
};

// Get section name
function getSectionName(sectionId) {
  const names = {
    home: "Trang chủ",
    about: "Giới thiệu",
    skills: "Kỹ năng",
    projects: "Dự án",
    contact: "Liên hệ",
  };
  return names[sectionId] || sectionId;
}

// Show typing indicator
function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-message bot-message typing-indicator";
  typingDiv.id = "typingIndicator";

  typingDiv.innerHTML = `
    <div class="message-avatar"></div>
    <div class="message-content">
      <p>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </p>
    </div>
  `;

  chatboxMessages.appendChild(typingDiv);
  chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typingIndicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Generate bot response based on user input
function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Predefined responses
  const responses = {
    greetings: [
      "Xin chào! Tôi rất vui được trò chuyện với bạn!",
      "Chào bạn! Bạn cần tôi giúp gì không?",
      "Hi! Có điều gì tôi có thể hỗ trợ bạn?",
    ],
    project: [
      'Bạn có thể xem các dự án của tôi trong phần "Dự án" bên trên. Tôi đã làm việc với nhiều công nghệ như React, Node.js, và MongoDB!',
      "Tôi có một số dự án thú vị! Hãy cuộn lên phần Dự án để xem chi tiết nhé!",
      "Các dự án của tôi bao gồm e-commerce, task management và nhiều ứng dụng web khác. Xem ngay!",
    ],
    contact: [
      "Bạn có thể liên hệ với tôi qua email hoặc điền form ở phần Liên Hệ. Tôi sẽ phản hồi sớm nhất!",
      "Rất vui được kết nối! Hãy gửi email cho tôi hoặc kết nối qua LinkedIn nhé!",
      "Tôi luôn sẵn sàng! Điền form liên hệ hoặc gửi email trực tiếp cho tôi.",
    ],
    skills: [
      "Tôi chuyên về Frontend Development với HTML, CSS, JavaScript, React, và Vue.js! Ngoài ra còn có kinh nghiệm Backend với Node.js và databases.",
      "Kỹ năng của tôi bao gồm: Frontend (React, Vue), Backend (Node.js), và nhiều công cụ khác. Xem chi tiết ở phần Skills!",
      "Tôi làm việc với nhiều công nghệ web hiện đại! Cuộn lên phần Kỹ Năng để biết thêm!",
    ],
    hire: [
      "Tuyệt vời! Tôi đang sẵn sàng cho các cơ hội mới. Hãy liên hệ với tôi qua form hoặc email để thảo luận chi tiết!",
      "Cảm ơn bạn quan tâm! Hãy gửi thông tin dự án qua email hoặc LinkedIn. Tôi rất mong được hợp tác!",
      "Rất vui! Tôi sẵn sàng tham gia dự án của bạn. Liên hệ ngay nhé!",
    ],
    thanks: [
      "Không có gì! Rất vui được giúp bạn!",
      "Luôn sẵn lòng! Nếu có câu hỏi gì, cứ hỏi nhé!",
      "Hân hạnh! Chúc bạn một ngày tốt lành!",
    ],
    default: [
      "Cảm ơn bạn đã nhắn tin! Tôi sẽ trả lời sớm nhất có thể. Trong lúc đó, hãy xem qua portfolio của tôi nhé!",
      "Câu hỏi hay đấy! Để được tư vấn chi tiết hơn, hãy liên hệ trực tiếp với tôi qua email nhé!",
      "Tôi đã nhận được tin nhắn! Hãy để lại thông tin liên hệ ở form bên dưới để tôi phản hồi chi tiết hơn!",
      "Có vẻ thú vị! Nếu bạn muốn thảo luận sâu hơn, hãy gửi email cho tôi nhé!",
    ],
  };

  // Check for keywords and return appropriate response
  if (/(hi|hello|xin chào|chào|hey)/i.test(lowerMessage)) {
    return responses.greetings[
      Math.floor(Math.random() * responses.greetings.length)
    ];
  }

  if (/(dự án|project|portfolio|work)/i.test(lowerMessage)) {
    return responses.project[
      Math.floor(Math.random() * responses.project.length)
    ];
  }

  if (/(liên hệ|contact|email|phone)/i.test(lowerMessage)) {
    return responses.contact[
      Math.floor(Math.random() * responses.contact.length)
    ];
  }

  if (/(kỹ năng|skill|công nghệ|technology|tech stack)/i.test(lowerMessage)) {
    return responses.skills[
      Math.floor(Math.random() * responses.skills.length)
    ];
  }

  if (/(thuê|hire|job|work|hợp tác|collaborate)/i.test(lowerMessage)) {
    return responses.hire[Math.floor(Math.random() * responses.hire.length)];
  }

  if (/(cảm ơn|thank|thanks|cám ơn)/i.test(lowerMessage)) {
    return responses.thanks[
      Math.floor(Math.random() * responses.thanks.length)
    ];
  }

  // Default response
  return responses.default[
    Math.floor(Math.random() * responses.default.length)
  ];
}

// Show notification dot after 3 seconds on page load
setTimeout(() => {
  if (!chatboxWindow.classList.contains("active")) {
    chatNotification.style.display = "flex";
  }
}, 3000);
