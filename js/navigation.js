const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

export function initMobileMenu() {
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Set theme immediately (before DOM loads) to prevent flash
const savedTheme = localStorage.getItem("theme");
const hasVisited = localStorage.getItem("hasVisited");

function getAutoTheme() {
  const hour = new Date().getHours();
  // 6AM - 6PM: light mode, 6PM - 6AM: dark mode
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

// First visit: auto theme based on time
// Returning visit: use saved theme
const initialTheme = hasVisited ? savedTheme || "light" : getAutoTheme();
document.documentElement.setAttribute("data-theme", initialTheme);

// Mark as visited
if (!hasVisited) {
  localStorage.setItem("hasVisited", "true");
  localStorage.setItem("theme", initialTheme);
}

export function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");

  if (!themeToggle) return;

  // Toggle on click - simple manual control
  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

const typedTextSpan = document.querySelector(".typed-text");
const textArray = [
  "Web Developer",
  "Frontend Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

export function initTypewriter() {
  if (!typedTextSpan) return;
  setTimeout(type, newTextDelay + 250);
}

export function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

export function initRandomName() {
  const nameElement = document.querySelector(".name-highlight");
  if (!nameElement) return;

  const names = ["Phú", "Phú Hồ", "Hồ Trường Minh Phú"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  nameElement.textContent = randomName;
}
