// script.js

// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement;

// Load saved theme (if any)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeIcon.className =
    savedTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
} else {
  // default theme = light
  root.setAttribute("data-theme", "light");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  themeIcon.className =
    next === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
});

// ===== Progress Bars Animation =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".progress").forEach((bar) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width;
      bar.classList.add("filled");
    }, 200);
  });
});

// ===== Rotating Title =====
const rotatingTitle = document.getElementById("rotatingTitle");
if (rotatingTitle) {
  const roles = JSON.parse(rotatingTitle.dataset.roles || "[]");
  let i = 0;
  setInterval(() => {
    rotatingTitle.style.opacity = 0;
    setTimeout(() => {
      rotatingTitle.textContent = roles[i];
      rotatingTitle.style.opacity = 1;
      i = (i + 1) % roles.length;
    }, 250);
  }, 3000);
}

// ===== Scroll-to-Top Button =====
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
