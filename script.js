// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Animate Elements on Scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('h2, p');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Custom Cursor
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

document.addEventListener('mouseleave', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0)';
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tabletalks-form');
  const status = document.getElementById('my-form-status');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        status.textContent = "Thanks for joining! We'll notify you soon.";
        status.style.color = "#00ff88";
        form.reset();
      } else {
        return response.json().then(data => {
          if (data.errors && data.errors.length > 0) {
            status.textContent = data.errors.map(e => e.message).join(', ');
          } else {
            status.textContent = "Oops! There was a problem submitting your form.";
          }
        });
      }
    })
    .catch(error => {
      status.textContent = "Oops! There was a problem submitting your form.";
    });
  });
});

// Theme toggle
const toggle = document.getElementById('theme-toggle-input');
const body = document.body;

// Check for saved user preference
function getCurrentTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    return 'dark';
  } else if (localStorage.getItem('theme') === 'light') {
    return 'light';
  } else {
    // Default to light
    return 'light';
  }
}

// Apply theme
function applyTheme(themeName) {
  body.classList.remove('dark-theme');
  if (themeName === 'dark') {
    body.classList.add('dark-theme');
  }
  toggle.checked = themeName === 'dark';
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function () {
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);
});

// Handle toggle
toggle.addEventListener('change', function () {
  if (this.checked) {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
});