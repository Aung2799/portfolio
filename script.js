function animateSkills() {
  const skills = document.querySelectorAll(".progress");
  skills.forEach((skill) => {
    const skillTop = skill.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (skillTop < windowHeight - 50 && !skill.classList.contains("filled")) {
      skill.style.width = skill.dataset.width; // FIX: use data-width
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
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Trigger animations on scroll
window.addEventListener("scroll", () => {
  animateSkills();
  fadeInSections();
});

// Trigger animations on load
window.addEventListener("load", () => {
  animateSkills();
  fadeInSections();
});
