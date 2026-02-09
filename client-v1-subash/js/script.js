/**
 * TARA NATURAL FOODS - CREATIVE VERSION 1
 * Interactive Animations and Effects
 * Final Copy/Paste Version (Folder Setup A)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements (with safe checks)
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const heroBg = document.querySelector(".hero-bg-layer");
  const newsletterForm = document.getElementById("newsletterForm");

  // ========================================
  // NAVIGATION SCROLL EFFECT
  // ========================================
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", String(isActive));

      const spans = navToggle.querySelectorAll("span");
      if (isActive) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Close menu on link click
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");

        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      const clickedInside = navMenu.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInside && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");

        const spans = navToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // ========================================
  // SMOOTH SCROLL (with header offset)
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 90;
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    });
  });

  // ========================================
  // PARALLAX EFFECT
  // ========================================
  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.1)`;
      },
      { passive: true }
    );
  }

  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  const revealElements = document.querySelectorAll(
    ".about-content, .feature-card, .product-card, .blog-card, .info-card"
  );

  if ("IntersectionObserver" in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `all 0.6s ease ${index * 0.08}s`;
      revealObserver.observe(el);
    });
  }

  // ========================================
  // COUNTER ANIMATION
  // ========================================
  const statItems = document.querySelectorAll(".stat-item");

  if ("IntersectionObserver" in window && statItems.length) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target;
            const target = parseInt(item.dataset.count || "0", 10);
            const numberEl = item.querySelector(".stat-number");
            if (numberEl) animateCounter(numberEl, target);
            obs.unobserve(item);
          }
        });
      },
      { threshold: 0.5 }
    );

    statItems.forEach((item) => counterObserver.observe(item));
  }

  function animateCounter(element, target) {
    const duration = 1600;
    const steps = Math.max(1, Math.floor(duration / 16));
    const increment = target / steps;
    let current = 0;
    let i = 0;

    const timer = setInterval(() => {
      i++;
      current += increment;

      if (i >= steps) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  // ========================================
  // NEWSLETTER FORM
  // ========================================
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const firstName = document.getElementById("firstName")?.value.trim();
      const lastName = document.getElementById("lastName")?.value.trim();
      const email = document.getElementById("email")?.value.trim();

      if (!firstName || !lastName || !email) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email", "error");
        return;
      }

      const btn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : "";

      if (btn) {
        btn.innerHTML = "<span>Subscribing...</span>";
        btn.disabled = true;
      }

      setTimeout(() => {
        showNotification(`Welcome, ${firstName}! You've joined our wellness community.`, "success");
        newsletterForm.reset();

        if (btn) {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      }, 1200);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ========================================
  // NOTIFICATION SYSTEM
  // ========================================
  function showNotification(message, type = "info") {
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const colors = {
      success: "#2d5a27",
      error: "#dc3545",
      info: "#333333",
    };

    notification.innerHTML = `
      <span>${message}</span>
      <button aria-label="Close notification">&times;</button>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${colors[type] || colors.info};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 1rem;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      max-width: min(420px, 92vw);
    `;

    if (!document.getElementById("notifStyle")) {
      const style = document.createElement("style");
      style.id = "notifStyle";
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .notification button {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
        }
      `;
      document.head.appendChild(style);
    }

    notification.querySelector("button")?.addEventListener("click", () => notification.remove());
    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = "slideIn 0.3s ease reverse";
        setTimeout(() => notification.remove(), 300);
      }
    }, 4500);
  }

  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length && navLinks.length) {
    window.addEventListener(
      "scroll",
      () => {
        let current = "";
        const scrollPos = window.pageYOffset + 120;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });
      },
      { passive: true }
    );
  }

  // ========================================
  // MAGNETIC BUTTON EFFECT (only if user hasn't reduced motion)
  // ========================================
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });

      btn.addEventListener("mouseleave", function () {
        this.style.transform = "";
      });
    });
  }

  console.log("🌿 Tara Natural Foods - Creative Version 1 loaded!");
});
