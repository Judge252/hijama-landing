// ===============================
// Hijama Landing Page JS
// Practical Wide Hero Slider
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a, .floating-dock a");
  const sections = document.querySelectorAll("section[id], header[id]");
  const dock = document.querySelector(".floating-dock");
  const year = document.getElementById("year");

  // ===============================
  // Current Year
  // ===============================

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ===============================
  // Mobile Menu Toggle
  // ===============================

  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
      body.classList.toggle("menu-open");

      const isOpen = body.classList.contains("menu-open");
      menuBtn.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");

      if (menuBtn) {
        menuBtn.setAttribute("aria-label", "فتح القائمة");

        const icon = menuBtn.querySelector("i");

        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      }
    });
  });

  // Close menu when clicking outside it
  document.addEventListener("click", (event) => {
    if (!body.classList.contains("menu-open")) return;
    if (!mainNav || !menuBtn) return;

    const clickedInsideMenu = mainNav.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      body.classList.remove("menu-open");

      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.className = "fa-solid fa-bars";
      }

      menuBtn.setAttribute("aria-label", "فتح القائمة");
    }
  });

  // Close menu with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    body.classList.remove("menu-open");

    if (menuBtn) {
      const icon = menuBtn.querySelector("i");

      if (icon) {
        icon.className = "fa-solid fa-bars";
      }

      menuBtn.setAttribute("aria-label", "فتح القائمة");
    }
  });

  // ===============================
  // Header Scroll State
  // ===============================

  const updateHeaderState = () => {
    if (!header) return;

    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  // ===============================
  // Smooth Scroll for Internal Links
  // ===============================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // ===============================
  // Active Navigation Link
  // ===============================

  const updateActiveLink = () => {
    let currentSectionId = "top";
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        sectionId &&
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = sectionId;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      link.classList.toggle("active-link", href === `#${currentSectionId}`);
    });
  };

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });

  // ===============================
  // Practical Wide Hero Image Slider
  // ===============================

  const heroShowcase = document.querySelector(".hero-image-showcase");
  const heroTrack = document.querySelector(".hero-image-track");
  const heroSlides = document.querySelectorAll(".hero-image-slide");
  const heroDots = document.querySelectorAll(".hero-dot");

  let heroCurrentSlide = 0;
  let heroSliderInterval = null;
  let scrollUpdateTimeout = null;
  let heroTouchStartX = 0;
  let heroTouchStartY = 0;
  let heroTouching = false;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const showHeroSlide = (index, shouldScroll = true) => {
    if (!heroSlides.length) return;

    heroCurrentSlide = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === heroCurrentSlide);
    });

    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === heroCurrentSlide);
    });

    const targetSlide = heroSlides[heroCurrentSlide];

    if (heroTrack && shouldScroll && targetSlide) {
      targetSlide.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const getNearestHeroSlideIndex = () => {
    if (!heroTrack || !heroSlides.length) return heroCurrentSlide;

    const trackRect = heroTrack.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let nearestIndex = heroCurrentSlide;
    let nearestDistance = Infinity;

    heroSlides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - trackCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  };

  const updateSlideFromScroll = () => {
    const nearestIndex = getNearestHeroSlideIndex();
    showHeroSlide(nearestIndex, false);
  };

  const nextHeroSlide = () => {
    if (!heroSlides.length) return;

    const nextIndex = (heroCurrentSlide + 1) % heroSlides.length;
    showHeroSlide(nextIndex);
  };

  const stopHeroSlider = () => {
    if (heroSliderInterval) {
      clearInterval(heroSliderInterval);
      heroSliderInterval = null;
    }
  };

  const startHeroSlider = () => {
    if (prefersReducedMotion || heroSlides.length <= 1) return;

    stopHeroSlider();
    heroSliderInterval = setInterval(nextHeroSlide, 4500);
  };

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.slide);

      if (Number.isNaN(index)) return;

      showHeroSlide(index);
      startHeroSlider();
    });
  });

  if (heroShowcase) {
    heroShowcase.addEventListener("mouseenter", stopHeroSlider);
    heroShowcase.addEventListener("mouseleave", startHeroSlider);

    heroShowcase.addEventListener("focusin", stopHeroSlider);
    heroShowcase.addEventListener("focusout", startHeroSlider);

    heroShowcase.addEventListener("touchstart", stopHeroSlider, {
      passive: true,
    });

    heroShowcase.addEventListener("touchend", startHeroSlider, {
      passive: true,
    });
  }

  if (heroTrack) {
    heroTrack.addEventListener(
      "scroll",
      () => {
        clearTimeout(scrollUpdateTimeout);
        scrollUpdateTimeout = window.setTimeout(updateSlideFromScroll, 120);
      },
      { passive: true }
    );

    heroTrack.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length !== 1) return;
        heroTouching = true;
        heroTouchStartX = event.touches[0].clientX;
        heroTouchStartY = event.touches[0].clientY;
        stopHeroSlider();
      },
      { passive: true }
    );

    heroTrack.addEventListener(
      "touchend",
      (event) => {
        if (!heroTouching) return;
        heroTouching = false;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - heroTouchStartX;
        const deltaY = touch.clientY - heroTouchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > 50 && absDeltaX > absDeltaY * 1.5) {
          if (deltaX < 0) {
            showHeroSlide(heroCurrentSlide + 1);
          } else {
            showHeroSlide(heroCurrentSlide - 1);
          }
        } else {
          updateSlideFromScroll();
        }

        startHeroSlider();
      },
      { passive: true }
    );
  }

  showHeroSlide(0);
  startHeroSlider();

  // ===============================
  // Reveal Animation on Scroll
  // ===============================

  const revealElements = document.querySelectorAll(
    [
      ".hero-content",
      ".hero-image-showcase",
      ".feature-card",
      ".instruction-card",
      ".safety-card",
      ".process-card",
      ".social-card",
    ].join(", ")
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-item");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // ===============================
  // Floating Dock Hide on Footer
  // ===============================

  const footer = document.querySelector(".site-footer");

  if (dock && footer && "IntersectionObserver" in window) {
    const dockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          dock.classList.toggle("dock-hidden", entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
      }
    );

    dockObserver.observe(footer);
  }

  // ===============================
  // Toast Helper
  // ===============================

  const showToast = (message, type = "success") => {
    const oldToast = document.querySelector(".custom-toast");

    if (oldToast) {
      oldToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;

    const icon =
      type === "success"
        ? "fa-solid fa-circle-check"
        : "fa-solid fa-circle-exclamation";

    toast.innerHTML = `
      <i class="${icon}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  };

  // ===============================
  // Social Link Placeholder Safety
  // ===============================

  const socialLinks = document.querySelectorAll(".social-links a");

  socialLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();
        showToast("أضف رابط الصفحة الحقيقي هنا", "error");
      }
    });
  });
});