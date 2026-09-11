gsap.registerPlugin(ScrollTrigger);

// mobile menu toggle
const navBurger = document.getElementById("navBurger");
const navMobile = document.getElementById("navMobile");
navBurger.addEventListener("click", () => {
  navBurger.classList.toggle("open");
  navMobile.classList.toggle("open");
});
navMobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navBurger.classList.remove("open");
  navMobile.classList.remove("open");
}));

// nav bg on scroll
const nav = document.getElementById("nav");
ScrollTrigger.create({
  start: "top -80",
  onUpdate: self => nav.classList.toggle("scrolled", self.scroll() > 80)
});

// hero / header entrance
gsap.timeline({ defaults: { ease: "power4.out" } })
  .to(".reveal-line", { y: "0%", opacity: 1, duration: 1, stagger: .12 }, .15);

// hero bg parallax
if (document.querySelector(".hero-bg")) {
  gsap.to(".hero-bg", {
    scale: 1, yPercent: 10, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
}

// banner parallax
if (document.querySelector(".banner-bg")) {
  gsap.to(".banner-bg", {
    scale: 1, yPercent: 8, ease: "none",
    scrollTrigger: { trigger: ".banner", start: "top bottom", end: "bottom top", scrub: true }
  });
}

// generic reveal on scroll
document.querySelectorAll(".reveal").forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 85%" }
  });
});

// staggered reveal for grids of cards
document.querySelectorAll(".service-grid, .process-grid, .benefit-grid, .jobs-list").forEach(grid => {
  gsap.utils.toArray(grid.children).forEach((card, i) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: .9, ease: "power3.out", delay: i * 0.05,
      scrollTrigger: { trigger: card, start: "top 90%" }
    });
  });
});

// file input label
const fileInput = document.getElementById("fileInput");
if (fileInput) {
  fileInput.addEventListener("change", () => {
    const label = document.getElementById("fileDropLabel");
    if (fileInput.files.length) {
      label.innerHTML = `<span class="file-drop-name">${fileInput.files[0].name}</span>`;
    }
  });
}

// form submit -> success state (no backend wired; forms show confirmation only)
function wireForm(formId, cardId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById(cardId).classList.add("submitted");
    document.getElementById(successId).classList.add("show");
  });
}
wireForm("jobForm", "jobFormCard", "jobSuccess");
wireForm("contactForm", "contactFormCard", "contactSuccess");
