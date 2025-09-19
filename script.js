// ==== Theme toggle (auto / light / dark) ====
const themeToggle = document.getElementById("themeToggle");
const applyTheme = (t) => document.documentElement.setAttribute("data-theme", t);
const savedTheme = localStorage.getItem("theme");
if (savedTheme) applyTheme(savedTheme);
themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "auto";
  const next = current === "dark" ? "light" : current === "light" ? "auto" : "dark";
  if (next === "auto") document.documentElement.removeAttribute("data-theme");
  else applyTheme(next);
  localStorage.setItem("theme", next);
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
    const skillTop = skill.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (skillTop < windowHeight - 50 && !skill.classList.contains("filled")) {
      skill.style.width = skill.dataset.width; // use data-width
      skill.classList.add("filled");
    }
  });
}

// Fade-in sections
function fadeInSections() {
  const sections = document.querySelectorAll(".fade-in");
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight - 50) {
      section.classList.add("visible");
    }
  });
}

// Scroll-to-top button
const scrollBtn = document.getElementById("scrollTop");
scrollBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Trigger animations on scroll + load
window.addEventListener("scroll", () => {
  animateSkills();
  fadeInSections();
});
window.addEventListener("load", () => {
  animateSkills();
  fadeInSections();
});
