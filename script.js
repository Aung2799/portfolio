// ===== Theme toggle (light <-> dark) — robust, no reset on nav clicks =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyThemeVars(t) {
  document.documentElement.setAttribute("data-theme", t);
  if (themeIcon) {
    themeIcon.className = "fa-solid " + (t === "dark" ? "fa-moon" : "fa-sun");
  }
  if (themeToggle) {
    themeToggle.title = t === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    themeToggle.setAttribute("aria-label", `Switch theme (current: ${t === "dark" ? "Dark" : "Light"})`);
  }
}

function setTheme(t) {
  localStorage.setItem("theme", t);
  applyThemeVars(t);
}

// Init: prefer existing HTML attr, else saved, else default once
(function initTheme() {
  const existing = document.documentElement.getAttribute("data-theme");
  if (existing === "light" || existing === "dark") {
    applyThemeVars(existing);
    return;
  }
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    applyThemeVars(saved);
    return;
  }
  setTheme("light");
})();

// Re-apply theme on DOM load (fix for mobile reloads)
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    applyThemeVars(saved);
  }
});

// Toggle on click
themeToggle?.addEventListener("click", () => {
  const current =
    localStorage.getItem("theme") ||
    document.documentElement.getAttribute("data-theme") ||
    "light";
  setTheme(current === "dark" ? "light" : "dark");
});

// Guard against accidental resets on hash changes
window.addEventListener("hashchange", () => {
  const t =
    localStorage.getItem("theme") ||
    document.documentElement.getAttribute("data-theme") ||
    "light";
  applyThemeVars(t);
});

// ===== Rotating subtitle =====
(function rotateTitle() {
  const el = document.getElementById("rotatingTitle");
  if (!el) return;
  let roles = [];
  try {
    roles = JSON.parse(el.getAttribute("data-roles") || "[]");
  } catch {
    roles = [];
  }
  if (!roles.length) return;

  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.style.opacity = "0";
    el.style.transform = "translateY(4px)";
    setTimeout(() => {
      el.textContent = roles[i];
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 180);
  }, 2200);
})();

// ===== Skill bar animation =====
function animateSkills() {
  const skills = document.querySelectorAll(".progress");
  const winH = window.innerHeight;
  skills.forEach((skill) => {
    const rect = skill.getBoundingClientRect();
    if (rect.top < winH - 50 && !skill.classList.contains("filled")) {
      skill.style.width = skill.dataset.width || "0%";
      skill.classList.add("filled");
    }
  });
}

// ===== Fade-in sections =====
function fadeInSections() {
  const sections = document.querySelectorAll(".fade-in");
  const winH = window.innerHeight;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < winH - 50) {
      section.classList.add("visible");
    }
  });
}

// ===== Scroll-to-top button =====
const scrollBtn = document.getElementById("scrollTop");
scrollBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Run on load + scroll =====
window.addEventListener("load", () => {
  animateSkills();
  fadeInSections();
});
window.addEventListener("scroll", () => {
  animateSkills();
  fadeInSections();
});
