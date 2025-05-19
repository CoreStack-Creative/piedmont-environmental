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
