// FAQ accordion
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('active');
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('active');
    q.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('active');
    answer.classList.add('open');
  }
}

// Contact form
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

// Scroll-based active nav link
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) link.style.color = '#238c8c';
    });
  }, { passive: true });
});
