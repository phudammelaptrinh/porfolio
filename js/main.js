import {
  initMobileMenu,
  initThemeToggle,
  initTypewriter,
  initSmoothScrolling,
  initRandomName,
} from "./navigation.js";
import {
  initContactForm,
  initNavbarScroll,
  initAnimations,
  initActiveNav,
} from "./utils.js";

// Initialize all features when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Navigation features
  initMobileMenu();
  initThemeToggle();
  initRandomName();
  initTypewriter();
  initSmoothScrolling();
  initActiveNav();

  // UI enhancements
  initNavbarScroll();
  initAnimations();

  // Contact form
  initContactForm();

  console.log("Portfolio website loaded successfully!");
});
