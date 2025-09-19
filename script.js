// ==== Theme toggle (light <-> dark) with icon updates ====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
  themeIcon.className = "fa-solid " + (t === "dark" ? "fa-moon" : "fa-sun");
  themeToggle.title = t === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  themeToggle.setAttribute("aria-label", `Switch theme (current: ${t === "dark" ? "Dark" : "Light"})`);
}

// init from saved (default light)
setTheme(localStorage.getItem("theme") || "light");

// toggle on click
themeToggle?.addEventListener("click", () => {
  const current = localStorage.getItem("theme") || "light";
  setTheme(current === "dark" ? "light" : "dark");
});

// ==== Rotating subtitle ====
(function rotateTitle(){
  const el = document.getElementById("rotatingTitle");
  if (!el) return;
  const roles = JSON.parse(el.getAttribute("data-roles") || "[]");
  if (!roles.length) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.style.opacity = 0;
    el.style.transform = "translateY(4px)";
    setTimeout(() => {
      el.textContent = roles[i];
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 180);
  }, 2200);
})();

// ==== Skill bar animation ====
function animateSkills() {
  const skills = document.querySelectorAll(".progress");
  skills.forEach((skill) => {
    const rect = skill.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50 && !skill.classList.contains("filled")) {
      skill.style.width = skill.dataset.width;
      skill.classList.add("filled");
    }
  });
}

// ==== Fade-in sections ====
function fadeInSections() {
  const sections = document.querySelectorAll(".fade-in");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      section.classList.add("visible");
    }
  });
}

// ==== Scroll-to-top button ====
const scrollBtn = document.getElementById("scrollTop");
scrollBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==== Run on load + scroll ====
window.addEventListener("load", () => {
  animateSkills();
  fadeInSections();
});
window.addEventListener("scroll", () => {
  animateSkills();
  fadeInSections();
});
