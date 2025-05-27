const hours = {
  0: { open: "09:00", close: "15:00" },
  1: { open: "08:30", close: "19:30" },
  2: { open: "08:30", close: "19:30" },
  3: { open: "08:30", close: "19:30" },
  4: { open: "08:30", close: "19:30" },
  5: { open: "08:30", close: "19:30" },
  6: { open: "14:00", close: "19:30" }
};

function checkOpenStatus() {
  const now = new Date();
  const day = now.getDay();
  const currentTime = now.getHours().toString().padStart(2, '0') + ":" +
                      now.getMinutes().toString().padStart(2, '0');
  const todayHours = hours[day];

  const statusBox = document.getElementById("open-status");
  const listItems = document.querySelectorAll(".hours-list li");

  listItems.forEach(li => {
    li.classList.remove("today");
    if (parseInt(li.dataset.day) === day) {
      li.classList.add("today");
    }
  });

  if (todayHours) {
    const { open, close } = todayHours;
    if (currentTime >= open && currentTime <= close) {
      statusBox.textContent = "Open Now";
      statusBox.className = "open-status open";
    } else {
      statusBox.textContent = "Closed Now";
      statusBox.className = "open-status closed";
    }
  } else {
    statusBox.textContent = "Closed";
    statusBox.className = "open-status closed";
  }
}

document.addEventListener("DOMContentLoaded", checkOpenStatus);

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
  const cards = document.querySelectorAll(".review-card");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let currentIndex = 0;
  const cardsPerView = window.innerWidth < 768 ? 1 : 3;
  const totalPages = Math.ceil(cards.length / cardsPerView);

  const updateCarousel = () => {
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  };

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - cardsPerView) {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    updateCarousel();
  });

  updateCarousel();
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
  const track = document.querySelector(".reviews-track");
  const cards = document.querySelectorAll(".review-card");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  const visibleCards = 3;
  const totalCards = cards.length;
  let currentIndex = visibleCards; // Start after prepended clones

  // Clone first and last N cards
  for (let i = 0; i < visibleCards; i++) {
    const firstClone = cards[i].cloneNode(true);
    const lastClone = cards[totalCards - 1 - i].cloneNode(true);
    firstClone.classList.add("clone");
    lastClone.classList.add("clone");
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);
  }

  const allCards = document.querySelectorAll(".review-card");
  const cardWidth = cards[0].offsetWidth + 16; // Including margin

  // Set initial position
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  function moveTo(index) {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    currentIndex = index;
  }

  function handleTransitionEnd() {
    // Jump to real start
    if (currentIndex >= totalCards + visibleCards) {
      track.style.transition = "none";
      currentIndex = visibleCards;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // Jump to real end
    if (currentIndex < visibleCards) {
      track.style.transition = "none";
      currentIndex = totalCards + visibleCards - 1;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }

  nextBtn.addEventListener("click", () => {
    moveTo(currentIndex + 1);
  });

  prevBtn.addEventListener("click", () => {
    moveTo(currentIndex - 1);
  });

  track.addEventListener("transitionend", handleTransitionEnd);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !service) {
      alert("Please fill in all required fields.");
      return;
    }

    const subject = `Service Request: ${service}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AService: ${service}%0D%0A%0D%0AComments:%0D%0A${message}`;

    const mailtoLink = `mailto:velo.guidrycsc@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.open(mailtoLink, "_blank");
  });
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
