// ==================== INITIALIZATION ====================
const content = document.getElementById("content");
const navButtons = document.querySelectorAll("nav button");
const brand = document.querySelector(".brand");
const themeToggle = document.getElementById("theme-toggle");

// ==================== PAGE LOADING ====================
function loadPage(page) {
  fetch(`${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error('Page not found');
      return res.text();
    })
    .then(html => {
      content.innerHTML = html;

      // Start home effects if on home page
      if (page === "home") {
        startHomeEffects();
      }

      // Update URL hash
      window.location.hash = page === "home" ? "" : page;
    })
    .catch(() => {
      content.innerHTML = "<h2>Page not found</h2>";
    });
}

// ==================== NAVIGATION ====================
function setActive(activeBtn) {
  navButtons.forEach(btn => btn.classList.remove("active"));
  if (activeBtn) activeBtn.classList.add("active");
}

// Nav button clicks
navButtons.forEach(button => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;
    loadPage(page);
    setActive(button);
  });
});

// Brand button = home
brand.addEventListener("click", () => {
  loadPage("home");
  setActive(null);
});

// ==================== THEME TOGGLE ====================
function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateThemeIcon();
});

// ==================== HASH CHANGE (BACK/FORWARD BUTTONS) ====================
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.slice(1); // Remove '#'
  const page = hash || "home";
  
  loadPage(page);

  navButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
});

// ==================== INITIAL LOAD ====================
function initialLoad() {
  const hash = window.location.hash.slice(1);
  const page = hash || "home";
  
  loadPage(page);

  navButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
}

initialLoad();

// ==================== HOME PAGE TYPEWRITER ====================
function startHomeEffects() {
  const el = document.getElementById("type-text");
  if (!el) return;

  const text = "Breaking patterns, not laws";
  let index = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!isDeleting) {
      el.textContent = text.substring(0, index + 1);
      index++;

      if (index === text.length) {
        setTimeout(() => (isDeleting = true), 1200);
      }
    } else {
      el.textContent = text.substring(0, index - 1);
      index--;

      if (index === 0) {
        isDeleting = false;
      }
    }

    setTimeout(typeLoop, isDeleting ? 50 : 120);
  }

  typeLoop();
}

// ==================== INTERACTIVE BUTTONS (whoami, ls) ====================
document.addEventListener("click", function (e) {
  // whoami button toggle
  if (e.target.id === "whoamiBtn") {
    const output = document.getElementById("whoamiOutput");
    if (output) output.classList.toggle("hidden");
  }

  // ls button toggle
  if (e.target.id === "lsBtn") {
    const output = document.getElementById("lsOutput");
    if (output) output.classList.toggle("hidden");
  }
});