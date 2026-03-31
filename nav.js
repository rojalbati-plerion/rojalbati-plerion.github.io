// Shared header & footer injected into every page
(function () {
  // Inject Inter font on every page
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Maven+Pro:wght@400;600;700&display=swap';
  document.head.appendChild(fontLink);

  const NAV_HTML = `
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="site-logo">Rojal Bati</a>
      <button class="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
      <nav class="site-nav">
        <ul class="nav-list">

          <li class="nav-item has-dropdown">
            <a href="career-guidance.html" class="nav-link">Career Guidance <span class="caret">&#9660;</span></a>
            <ul class="dropdown level-1">
              <li class="has-flyout">
                <a href="career-guidance.html">Beginner <span class="flyout-arrow">&#8250;</span></a>
                <ul class="dropdown level-2">
                  <li><a href="learn.html">Learn</a></li>
                  <li><a href="cv.html">CV</a></li>
                  <li><a href="apply.html">Apply</a></li>
                  <li><a href="interview.html">Interview</a></li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="nav-item"><a href="index.html#about" class="nav-link">About Me</a></li>
          <li class="nav-item"><a href="team.html" class="nav-link">Team</a></li>
          <li class="nav-item"><a href="index.html#contact" class="nav-link">Contact Me</a></li>
          <li class="nav-item"><a href="index.html#faq" class="nav-link">FAQ</a></li>
          <li class="nav-item"><a href="motivational-quotes.html" class="nav-link">Motivational Quotes</a></li>

          <li class="nav-item nav-search">
            <button class="search-btn" aria-label="Search" onclick="toggleSearch()">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="search-bar" id="searchBar">
      <div class="search-inner">
        <input type="text" id="searchInput" placeholder="Search pages…" />
        <button onclick="toggleSearch()">&#10005;</button>
      </div>
    </div>
  </header>`;

  const FOOTER_HTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">Rojal Bati</span>
        <p class="footer-tagline">Learn, Earn and Serve in Testing</p>
      </div>
      <div class="footer-links">
        <a href="career-guidance.html">Career Guidance</a>
        <a href="team.html">Team</a>
        <a href="motivational-quotes.html">Quotes</a>
        <a href="mailto:rojalbati@gmail.com">Email</a>
        <a href="https://linkedin.com/in/rojalbati" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Rojal Bati. All rights reserved.</span>
      <span>Built with &hearts; for the QA community</span>
    </div>
  </footer>`;

  document.addEventListener('DOMContentLoaded', function () {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) headerPlaceholder.outerHTML = NAV_HTML;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

    // Highlight active nav link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith(path)) link.classList.add('active');
    });

    // Mobile toggle
    document.addEventListener('click', function (e) {
      const toggle = e.target.closest('.nav-toggle');
      const nav = document.querySelector('.site-nav');
      if (toggle) { nav.classList.toggle('open'); return; }
      if (!e.target.closest('.site-header')) nav && nav.classList.remove('open');

      const flyoutTrigger = e.target.closest('.has-flyout > a');
      if (flyoutTrigger && window.innerWidth <= 768) {
        e.preventDefault();
        flyoutTrigger.parentElement.classList.toggle('open');
        return;
      }
      const dropdownTrigger = e.target.closest('.has-dropdown > .nav-link');
      if (dropdownTrigger && window.innerWidth <= 768) {
        e.preventDefault();
        dropdownTrigger.parentElement.classList.toggle('open');
      }
    });
  });
})();

function toggleSearch() {
  const bar = document.getElementById('searchBar');
  if (bar) {
    bar.classList.toggle('visible');
    if (bar.classList.contains('visible')) document.getElementById('searchInput').focus();
  }
}
