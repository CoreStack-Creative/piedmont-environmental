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