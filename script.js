// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll Indicator
const scrollIndicator = document.getElementById('scroll-indicator');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const scrollPercentage = (scrolled / scrollHeight) * 100;

  scrollIndicator.style.height = `${scrollPercentage}%`;

  // Highlight active section
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
});