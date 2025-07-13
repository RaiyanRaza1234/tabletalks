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

// Theme Toggle
const toggle = document.getElementById('theme-toggle-input');
const body = document.body;

function getCurrentTheme() {
  return localStorage.getItem('theme') || 'light';
}

function applyTheme(themeName) {
  body.classList.remove('dark-theme');
  if (themeName === 'dark') {
    body.classList.add('dark-theme');
  }
  toggle.checked = themeName === 'dark';
}

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);
});

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
});

// Form Submission
const form = document.getElementById('tabletalks-form');
const statusMsg = document.getElementById('my-form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
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
      statusMsg.textContent = "Thanks for joining!";
      statusMsg.style.color = "#00ff88";
      form.reset();
    } else {
      response.json().then(data => {
        if (data.errors && data.errors.length > 0) {
          statusMsg.textContent = data.errors.map(e => e.message).join(', ');
        } else {
          statusMsg.textContent = "Oops! There was a problem submitting your form.";
        }
      });
    }
  })
  .catch(() => {
    statusMsg.textContent = "Oops! There was a problem submitting your form.";
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('theme-toggle-input');
  const body = document.body;

  // Load saved theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    toggle.checked = true;
  }

  // Handle toggle change
  toggle.addEventListener('change', function () {
    if (this.checked) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
});