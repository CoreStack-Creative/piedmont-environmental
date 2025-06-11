document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  let timeout;

  dropdown.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
    dropdown.classList.add("show");
  });

  dropdown.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      dropdown.classList.remove("show");
    }, 300); // 300ms delay before hiding
  });

  // Optional: Keep it open if hovering over dropdown-menu too
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");
  dropdownMenu.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
  });
  dropdownMenu.addEventListener("mouseleave", () => {
    timeout = setTimeout(() => {
      dropdown.classList.remove("show");
    }, 300);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".reviews-track");
  const groups = document.querySelectorAll(".review-group");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  const visibleGroups = window.innerWidth < 768 ? 1 : 3;
  const totalGroups = groups.length;
  let currentIndex = visibleGroups; // Start after clones

  // Clone first and last groups for seamless looping
  for (let i = 0; i < visibleGroups; i++) {
    const firstClone = groups[i].cloneNode(true);
    const lastClone = groups[totalGroups - 1 - i].cloneNode(true);
    firstClone.classList.add("clone");
    lastClone.classList.add("clone");
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);
  }

  const allGroups = document.querySelectorAll(".review-group");
  const groupWidth = groups[0].offsetWidth + 16; // 16px = assumed gap/margin

  // Set initial position
  track.style.transform = `translateX(-${currentIndex * groupWidth}px)`;

  function moveTo(index) {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * groupWidth}px)`;
    currentIndex = index;
  }

  function handleTransitionEnd() {
    if (currentIndex >= totalGroups + visibleGroups) {
      // Jump to actual start
      track.style.transition = "none";
      currentIndex = visibleGroups;
      track.style.transform = `translateX(-${currentIndex * groupWidth}px)`;
    } else if (currentIndex < visibleGroups) {
      // Jump to actual end
      track.style.transition = "none";
      currentIndex = totalGroups + visibleGroups - 1;
      track.style.transform = `translateX(-${currentIndex * groupWidth}px)`;
    }
  }

  nextBtn.addEventListener("click", () => {
    moveTo(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    moveTo(currentIndex - 1);
  });

  track.addEventListener("transitionend", handleTransitionEnd);

  // Handle window resize
  window.addEventListener("resize", () => {
    const newGroupWidth = groups[0].offsetWidth + 16;
    track.style.transition = "none";
    track.style.transform = `translateX(-${currentIndex * newGroupWidth}px)`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-up-box");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        // Uncomment the line below if you only want the animation to run once
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => observer.observe(el));
});

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const processSections = document.querySelectorAll(".animate-from-left, .animate-from-right");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // optional: remove after triggering once
        }
      });
    },
    { threshold: 0.3 }
  );

  processSections.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("examples-carousel");
  const track = document.getElementById("carousel-track");
  const items = Array.from(track.children);

  // Clone all items for seamless infinite loop
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add("clone");
    track.appendChild(clone);
  });

  const totalWidth = track.scrollWidth / 2; // width of original items

  let scrollPos = 0;
  let isHovering = false;
  let manualScrollVelocity = 0;
  const autoScrollVelocity = 0.7; // auto scroll speed (pixels per frame)
  let lastTimestamp = null;

  function clampScroll() {
    if (scrollPos >= totalWidth) scrollPos -= totalWidth;
    if (scrollPos < 0) scrollPos += totalWidth;
  }

  // Main animation loop for scrolling
  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (!isHovering) {
      // Auto-scroll only when not hovering and no manual velocity
      if (manualScrollVelocity === 0) {
        scrollPos += autoScrollVelocity * (delta / 16);
        clampScroll();
        carousel.scrollLeft = scrollPos;
      } else {
        // Gradually reduce manual scroll velocity (friction)
        manualScrollVelocity *= 0.95;
        scrollPos += manualScrollVelocity * (delta / 16);
        clampScroll();
        carousel.scrollLeft = scrollPos;

        // Stop manual velocity when small
        if (Math.abs(manualScrollVelocity) < 0.01) manualScrollVelocity = 0;
      }
    } else {
      // When hovering, manual scroll velocity controlled by wheel event only
      scrollPos += manualScrollVelocity * (delta / 16);
      clampScroll();
      carousel.scrollLeft = scrollPos;

      // Apply friction so it slows down smoothly if wheel stops
      manualScrollVelocity *= 0.9;
      if (Math.abs(manualScrollVelocity) < 0.01) manualScrollVelocity = 0;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  carousel.addEventListener("mouseenter", () => {
    isHovering = true;
    manualScrollVelocity = 0; // reset manual velocity when hovered
  });

  carousel.addEventListener("mouseleave", () => {
    isHovering = false;
  });

  // Wheel event to control manual scroll velocity
  carousel.addEventListener("wheel", (e) => {
    if (!isHovering) return;

    e.preventDefault();

    // Invert deltaY to match natural scroll direction, and multiply for sensitivity
    const scrollSpeedMultiplier = 3;
    manualScrollVelocity += e.deltaY * scrollSpeedMultiplier * 0.3;

    // Clamp manual velocity to reasonable limits to prevent too fast scrolling
    manualScrollVelocity = Math.max(Math.min(manualScrollVelocity, 15), -15);
  }, { passive: false });
});

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".principle-section img");
  const lightbox = document.createElement("div");
  const lightboxImg = document.createElement("img");
  const closeBtn = document.createElement("span");

  // Set up lightbox structure
  lightbox.classList.add("lightbox-overlay");
  lightboxImg.classList.add("lightbox-img");
  closeBtn.classList.add("lightbox-close");
  closeBtn.innerHTML = "&times;";

  lightbox.appendChild(closeBtn);
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  // Add click listeners to each image
  images.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  // Close lightbox on click outside image or on close button
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
      lightbox.classList.remove("active");
      lightboxImg.src = "";
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  // Toggle mobile menu visibility
  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });

  // Handle dropdown toggles (especially for mobile)
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault(); // prevent default link behavior
      const parent = this.closest('.dropdown');
      parent.classList.toggle('show');

      // Optional: close other open dropdowns
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== this) {
          otherToggle.closest('.dropdown').classList.remove('show');
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".project-thumb");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox img");
  const leftArrow = document.querySelector(".lightbox-arrow.left");
  const rightArrow = document.querySelector(".lightbox-arrow.right");
  const closeButton = document.querySelector(".lightbox-close");

  let currentIndex = 0;

  // Extract the visible thumbnails' sources
  const imageSources = Array.from(thumbnails).map(img => img.src);

  // Add more images (only used in lightbox)
  imageSources.push(
    "images/project6.jpg",
    "images/fence3.jpg",
    "images/project8.jpg",
    "images/project9.jpg",
    "images/project10.JPG",
    "images/project11.JPG",
    "images/project2.jpg",
    "images/project3.jpg",
    "images/project14.JPG",
    "images/consultations.JPG",
    "images/project4.jpg",
    "images/project7.jpg",

  );

  function showImage(index) {
    currentIndex = (index + imageSources.length) % imageSources.length;
    lightboxImg.src = imageSources[currentIndex];
    lightbox.classList.add("active");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showImage(index));
  });

  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    header.classList.add('header-hidden');
  } else {
    header.classList.remove('header-hidden');
  }
  lastScrollY = window.scrollY;
});

