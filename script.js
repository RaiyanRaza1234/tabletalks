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

// Array of expert profile URLs
const expertUrls = [
  "https://www.unsw.edu.au/staff/sebastian-sequoiah-grayson",
  // Add more URLs as needed
];

// Function to fetch expert info from UNSW page
async function fetchExpertData(url) {
  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = response.contents;
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');

    const name = doc.querySelector("h1")?.textContent.trim() || "Name not found";
    const title = doc.querySelector(".field--name-field-job-title")?.textContent.trim() || "Title not available";
    const summary = doc.querySelector(".field--name-field-bio")?.textContent.trim().substring(0, 150) + "..." || "No summary available.";
    const imageUrl = doc.querySelector(".field--name-field-profile-image img")?.src || "";

    return { name, title, summary, imageUrl: imageUrl.startsWith("//") ? "https:" + imageUrl : imageUrl };
  } catch (e) {
    console.error("Error fetching", url);
    return null;
  }
}

// Load all experts
async function loadExperts() {
  const container = document.getElementById("expert-cards");

  for (const url of expertUrls) {
    const expert = await fetchExpertData(url);
    if (expert) {
      const card = document.createElement("div");
      card.className = "expert-card";
      card.innerHTML = `
        ${expert.imageUrl ? `<img src="${expert.imageUrl}" alt="${expert.name}" class="expert-image">` : ""}
        <h3>${expert.name}</h3>
        <p><strong>${expert.title}</strong></p>
        <p>${expert.summary}</p>
      `;
      container.appendChild(card);
    }
  }
}

// Run on load
document.addEventListener("DOMContentLoaded", loadExperts);