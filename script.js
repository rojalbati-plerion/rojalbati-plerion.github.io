// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

// Mobile submenu toggle
const hasSubmenus = document.querySelectorAll('.has-submenu');
hasSubmenus.forEach(item => {
  const link = item.querySelector('.nav-link');
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      item.classList.toggle('open');
    }
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.site-header')) {
    siteNav.classList.remove('open');
  }
});

// ---- FAQ accordion ----
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('active');
    q.nextElementSibling.classList.remove('open');
  });

  // Open clicked (unless it was already open)
  if (!isOpen) {
    btn.classList.add('active');
    answer.classList.add('open');
  }
}

// ---- Contact form (static — shows success message) ----
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sent!';
  btn.style.background = '#29f48f';
  btn.disabled = true;
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Submit';
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
}

// ---- Smooth active link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#238c8c';
    }
  });
}, { passive: true });
