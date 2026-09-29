// =============================================
// VARAHI ASSOCIATES - Website JavaScript
// =============================================

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navClose = document.getElementById("navClose");

function openMenu() {
  navLinks.classList.add("open");
  hamburger.classList.add("active");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeMenu() {
  navLinks.classList.remove("open");
  hamburger.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  if (navLinks.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close button inside the overlay
if (navClose) {
  navClose.addEventListener("click", closeMenu);
}

// Close on any nav link click
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Close when clicking outside the menu (on the semi-transparent overlay itself)
navLinks.addEventListener("click", (e) => {
  if (e.target === navLinks) closeMenu();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) {
    closeMenu();
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ===== SCROLL-REVEAL ANIMATION =====
const revealEls = document.querySelectorAll(
  ".service-card, .partner-card, .testimonial-card, .feature-item, .contact-card, .section-header"
);
revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  const delay = (i % 6) + 1;
  el.classList.add(`reveal-delay-${delay}`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll(".stat-num[data-target]");
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNums.forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
    }
  });
}, { threshold: 0.5 });
if (statNums.length > 0) counterObserver.observe(statNums[0]);

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("fname").value.trim();
  const phone = document.getElementById("fphone").value.trim();
  const service = document.getElementById("fservice").value;

  if (!name || !phone || !service) {
    alert("Please fill in all required fields.");
    return;
  }

  const btn = document.getElementById("submit-btn");
  btn.textContent = "Sending...";
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "Send Message";
    btn.disabled = false;
    formSuccess.classList.add("show");
    form.reset();
    setTimeout(() => formSuccess.classList.remove("show"), 5000);
  }, 1500);
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ===== HERO PARALLAX =====
const heroBg = document.querySelector(".hero-bg");
window.addEventListener("scroll", () => {
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
  }
});

console.log("Varahi Associates website loaded successfully!");

