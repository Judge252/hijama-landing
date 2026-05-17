// ===============================
// Hijama Landing Page JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll("section[id]");
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

  if (menuBtn) {
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
  window.addEventListener("scroll", updateHeaderState);

  // ===============================
  // Active Navigation Link
  // ===============================

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active-link");

          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active-link");
          }
        });
      }
    });
  };

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink);

  // ===============================
  // Smooth Scroll for Internal Links
  // ===============================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ===============================
  // Reveal Animation on Scroll
  // ===============================

  const revealElements = document.querySelectorAll(
    ".feature-card, .instruction-card, .safety-card, .process-card, .social-card, .hero-content, .hero-gallery"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-item");
  });

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

  // ===============================
  // Interactive Hero Gallery
  // ===============================

  const heroGallery = document.querySelector(".hero-gallery");
  const galleryRadios = Array.from(
    document.querySelectorAll('input[name="hero-gallery"]')
  );
  const galleryThumbs = document.querySelectorAll(".gallery-thumb");

  let currentGalleryIndex = 0;
  let galleryInterval = null;

  const showGalleryImage = (index) => {
    if (!galleryRadios.length) return;

    currentGalleryIndex = index;

    galleryRadios.forEach((radio, radioIndex) => {
      radio.checked = radioIndex === currentGalleryIndex;
    });
  };

  const showNextGalleryImage = () => {
    if (!galleryRadios.length) return;

    const nextIndex = (currentGalleryIndex + 1) % galleryRadios.length;
    showGalleryImage(nextIndex);
  };

  const startGalleryAutoPlay = () => {
    if (!galleryRadios.length) return;

    stopGalleryAutoPlay();
    galleryInterval = setInterval(showNextGalleryImage, 4200);
  };

  const stopGalleryAutoPlay = () => {
    if (galleryInterval) {
      clearInterval(galleryInterval);
      galleryInterval = null;
    }
  };

  galleryRadios.forEach((radio, index) => {
    if (radio.checked) {
      currentGalleryIndex = index;
    }

    radio.addEventListener("change", () => {
      if (radio.checked) {
        currentGalleryIndex = index;
      }
    });
  });

  galleryThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      showGalleryImage(index);
      startGalleryAutoPlay();
    });
  });

  if (heroGallery) {
    heroGallery.addEventListener("mouseenter", stopGalleryAutoPlay);
    heroGallery.addEventListener("mouseleave", startGalleryAutoPlay);

    heroGallery.addEventListener("focusin", stopGalleryAutoPlay);
    heroGallery.addEventListener("focusout", startGalleryAutoPlay);
  }

  startGalleryAutoPlay();

  // ===============================
  // Floating Dock Hide on Footer
  // ===============================

  const footer = document.querySelector(".site-footer");

  if (dock && footer) {
    const dockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dock.classList.add("dock-hidden");
          } else {
            dock.classList.remove("dock-hidden");
          }
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

    const icon = type === "success"
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
  // Social Link Placeholder Alert
  // ===============================

  const socialLinks = document.querySelectorAll(".social-links a");

  socialLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (href === "#") {
        event.preventDefault();
        showToast("أضف رابط الصفحة الحقيقي هنا", "success");
      }
    });
  });
});