// HTML Includes Loader for static sites (GitHub Pages compatible)
async function loadIncludes() {
  const includes = [
    { selector: "#nav-placeholder", file: "includes/navigation.html" },
    { selector: "#hero-placeholder", file: "includes/hero.html" },
    { selector: "#about-placeholder", file: "includes/about.html" },
    { selector: "#skills-placeholder", file: "includes/skills.html" },
    { selector: "#projects-placeholder", file: "includes/projects.html" },
    { selector: "#contact-placeholder", file: "includes/contact.html" },
    { selector: "#footer-placeholder", file: "includes/footer.html" },
    { selector: "#chatbox-placeholder", file: "includes/chatbox.html" },
  ];

  for (const include of includes) {
    const element = document.querySelector(include.selector);
    if (element) {
      try {
        const response = await fetch(include.file);
        if (response.ok) {
          const html = await response.text();
          element.innerHTML = html;
        } else {
          console.error(`Failed to load ${include.file}`);
        }
      } catch (error) {
        console.error(`Error loading ${include.file}:`, error);
      }
    }
  }

  // Re-initialize scripts after includes are loaded
  if (window.initAfterIncludes) {
    window.initAfterIncludes();
  }
}

// Load includes when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadIncludes);
} else {
  loadIncludes();
}
