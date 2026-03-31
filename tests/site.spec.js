// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'https://rojalbati-plerion.github.io';

const PAGES = [
  { name: 'Home',                url: '/',                      title: /Rojal Bati/ },
  { name: 'Career Guidance',    url: '/career-guidance.html',  title: /Career Guidance/ },
  { name: 'Learn',              url: '/learn.html',            title: /Learn/ },
  { name: 'CV',                 url: '/cv.html',               title: /CV/ },
  { name: 'Apply',              url: '/apply.html',            title: /Apply/ },
  { name: 'Interview',          url: '/interview.html',        title: /Interview/ },
  { name: 'Team',               url: '/team.html',             title: /Team/ },
  { name: 'Motivational Quotes',url: '/motivational-quotes.html', title: /Quotes/ },
];

// ── 1. PAGE LOADS ──────────────────────────────────────────────────────────────
test.describe('Page loads', () => {
  for (const page of PAGES) {
    test(`${page.name} returns 200 and has correct title`, async ({ page: pw }) => {
      const res = await pw.goto(BASE + page.url);
      expect(res.status()).toBe(200);
      await expect(pw).toHaveTitle(page.title);
    });
  }
});

// ── 2. NAVIGATION ──────────────────────────────────────────────────────────────
test.describe('Navigation', () => {
  test('Logo links back to home', async ({ page }) => {
    await page.goto(BASE + '/career-guidance.html');
    await page.click('.site-logo');
    await expect(page).toHaveURL(/index\.html|\/$/);
  });

  test('Career Guidance nav link works', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.hover('.has-dropdown > .nav-link');
    await page.click('text=Career Guidance', { timeout: 5000 });
    await expect(page).toHaveURL(/career-guidance/);
  });

  test('Dropdown: Learn link works', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.hover('.has-dropdown > .nav-link');
    await page.hover('.has-flyout > a');
    await page.click('.level-2 a[href="learn.html"]');
    await expect(page).toHaveURL(/learn\.html/);
  });

  test('Dropdown: CV link works', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.hover('.has-dropdown > .nav-link');
    await page.hover('.has-flyout > a');
    await page.click('.level-2 a[href="cv.html"]');
    await expect(page).toHaveURL(/cv\.html/);
  });

  test('Dropdown: Apply link works', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.hover('.has-dropdown > .nav-link');
    await page.hover('.has-flyout > a');
    await page.click('.level-2 a[href="apply.html"]');
    await expect(page).toHaveURL(/apply\.html/);
  });

  test('Dropdown: Interview link works', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.hover('.has-dropdown > .nav-link');
    await page.hover('.has-flyout > a');
    await page.click('.level-2 a[href="interview.html"]');
    await expect(page).toHaveURL(/interview\.html/);
  });

  test('Team nav link works', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.click('text=Team');
    await expect(page).toHaveURL(/team\.html/);
  });

  test('Motivational Quotes nav link works', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.click('text=Motivational Quotes');
    await expect(page).toHaveURL(/motivational-quotes\.html/);
  });

  test('Mobile: hamburger menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE + '/');
    const nav = page.locator('.site-nav');
    await expect(nav).not.toHaveClass(/open/);
    await page.click('.nav-toggle');
    await expect(nav).toHaveClass(/open/);
    await page.click('.nav-toggle');
    await expect(nav).not.toHaveClass(/open/);
  });
});

// ── 3. HOMEPAGE CONTENT ────────────────────────────────────────────────────────
test.describe('Homepage content', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/'); });

  test('Hero: avatar, name and role visible', async ({ page }) => {
    await expect(page.locator('.hero-avatar')).toBeVisible();
    await expect(page.locator('.hero-title')).toContainText('Rojal Bati');
    await expect(page.locator('.hero-role')).toBeVisible();
  });

  test('Hero: stat numbers visible', async ({ page }) => {
    const stats = page.locator('.hero-stat-num');
    await expect(stats).toHaveCount(4);
    for (const s of await stats.all()) await expect(s).toBeVisible();
  });

  test('Hero: CTA buttons present', async ({ page }) => {
    await expect(page.locator('.hero a.btn-hero-primary')).toBeVisible();
    await expect(page.locator('.hero a.btn-hero-outline')).toBeVisible();
  });

  test('About section: skill chips present', async ({ page }) => {
    const chips = page.locator('.chip');
    await expect(chips).toHaveCount(8);
  });

  test('About section: 4 feature cards', async ({ page }) => {
    await expect(page.locator('.about-card')).toHaveCount(4);
  });

  test('CTA section: 4-step journey visible', async ({ page }) => {
    await expect(page.locator('.cta-step')).toHaveCount(4);
  });

  test('Companies: 4 pills visible with correct names', async ({ page }) => {
    await expect(page.locator('.company-pill')).toHaveCount(4);
    await expect(page.locator('.company-pill').nth(0)).toContainText('Omniblue');
    await expect(page.locator('.company-pill').nth(1)).toContainText('Bajra');
    await expect(page.locator('.company-pill').nth(2)).toContainText('Cloud Factory');
    await expect(page.locator('.company-pill').nth(3)).toContainText('Plerion');
  });

  test('Contact: email link is correct', async ({ page }) => {
    const emailLink = page.locator('a[href="mailto:rojalbati@gmail.com"]').first();
    await expect(emailLink).toBeVisible();
  });

  test('FAQ: 4 items present', async ({ page }) => {
    await expect(page.locator('.faq-item')).toHaveCount(4);
  });

  test('FAQ accordion: opens and closes', async ({ page }) => {
    const firstBtn = page.locator('.faq-question').first();
    const firstAnswer = page.locator('.faq-answer').first();
    await expect(firstAnswer).not.toHaveClass(/open/);
    await firstBtn.click();
    await expect(firstAnswer).toHaveClass(/open/);
    await firstBtn.click();
    await expect(firstAnswer).not.toHaveClass(/open/);
  });

  test('Footer: logo, links and copyright present', async ({ page }) => {
    await expect(page.locator('.footer-logo')).toBeVisible();
    await expect(page.locator('.footer-links')).toBeVisible();
    await expect(page.locator('.footer-bottom')).toContainText('2026');
  });
});

// ── 4. CAREER GUIDANCE PAGE ────────────────────────────────────────────────────
test.describe('Career Guidance page', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/career-guidance.html'); });

  test('4 step cards visible', async ({ page }) => {
    await expect(page.locator('.step-card')).toHaveCount(4);
  });

  test('Step buttons navigate correctly', async ({ page }) => {
    await page.click('.step-card:nth-child(1) .step-btn');
    await expect(page).toHaveURL(/learn\.html/);
  });

  test('Flow indicator shows 4 labels', async ({ page }) => {
    await expect(page.locator('.flow-label')).toHaveCount(4);
  });
});

// ── 5. LEARN PAGE ──────────────────────────────────────────────────────────────
test.describe('Learn page', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/learn.html'); });

  test('5 course cards present', async ({ page }) => {
    await expect(page.locator('.course-card')).toHaveCount(5);
  });

  test('All course time badges visible', async ({ page }) => {
    const badges = page.locator('.course-time');
    await expect(badges).toHaveCount(5);
  });

  test('YouTube iframes are present (11 videos)', async ({ page }) => {
    const iframes = page.locator('iframe[src*="youtube"]');
    const count = await iframes.count();
    expect(count).toBeGreaterThanOrEqual(11);
  });

  test('CV template resource link present', async ({ page }) => {
    await expect(page.locator('a[href*="docs.google.com"]').first()).toBeVisible();
  });

  test('Bonus card and certification links visible', async ({ page }) => {
    await expect(page.locator('.bonus-card')).toBeVisible();
    await expect(page.locator('.bonus-link').first()).toBeVisible();
  });

  test('Next button goes to cv.html', async ({ page }) => {
    await page.click('a[href="cv.html"].btn');
    await expect(page).toHaveURL(/cv\.html/);
  });
});

// ── 6. CV PAGE ─────────────────────────────────────────────────────────────────
test.describe('CV page', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/cv.html'); });

  test('CV Template button present', async ({ page }) => {
    await expect(page.locator('a[href*="docs.google.com"]').first()).toBeVisible();
  });

  test('LinkedIn Example button present', async ({ page }) => {
    await expect(page.locator('a[href*="linkedin.com/in/rojalbati"]').first()).toBeVisible();
  });

  test('CV structure list has 8 items', async ({ page }) => {
    const items = page.locator('.content-card ol li');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test('10 best practice tips present', async ({ page }) => {
    await expect(page.locator('.tip-item')).toHaveCount(10);
  });

  test('Next: Apply button works', async ({ page }) => {
    await page.click('a[href="apply.html"].btn');
    await expect(page).toHaveURL(/apply\.html/);
  });
});

// ── 7. APPLY PAGE ──────────────────────────────────────────────────────────────
test.describe('Apply page', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/apply.html'); });

  test('6 content cards present', async ({ page }) => {
    const cards = page.locator('.content-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('LinkedIn jobs link present', async ({ page }) => {
    await expect(page.locator('a[href*="linkedin.com/jobs"]')).toBeVisible();
  });

  test('Interview Preparation button works', async ({ page }) => {
    await page.click('a[href="interview.html"].btn');
    await expect(page).toHaveURL(/interview\.html/);
  });
});

// ── 8. INTERVIEW PAGE ──────────────────────────────────────────────────────────
test.describe('Interview page', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/interview.html'); });

  test('9 tip cards present', async ({ page }) => {
    await expect(page.locator('.content-card')).toHaveCount(9);
  });

  test('Congratulations closing card visible', async ({ page }) => {
    const card = page.locator('div:has-text("Congratulations")').last();
    await expect(card).toBeVisible();
  });

  test('Contact button links to contact section', async ({ page }) => {
    const btn = page.locator('a[href*="contact"].btn');
    await expect(btn).toBeVisible();
  });
});

// ── 9. TEAM PAGE ───────────────────────────────────────────────────────────────
test.describe('Team page', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/team.html'); });

  test('5 team cards visible', async ({ page }) => {
    await expect(page.locator('.team-card')).toHaveCount(5);
  });

  test('Rojal Bati is listed first', async ({ page }) => {
    const firstName = page.locator('.team-card h3').first();
    await expect(firstName).toContainText('Rojal Bati');
  });

  test('Each card has an avatar', async ({ page }) => {
    await expect(page.locator('.team-avatar')).toHaveCount(5);
  });
});

// ── 10. QUOTES PAGE ────────────────────────────────────────────────────────────
test.describe('Motivational Quotes page', () => {
  test.beforeEach(async ({ page }) => { await page.goto(BASE + '/motivational-quotes.html'); });

  test('10 quote cards present', async ({ page }) => {
    await expect(page.locator('.quote-card')).toHaveCount(10);
  });

  test('Each quote card has quote-text', async ({ page }) => {
    await expect(page.locator('.quote-text')).toHaveCount(10);
  });
});

// ── 11. BREADCRUMBS ────────────────────────────────────────────────────────────
test.describe('Breadcrumbs', () => {
  const subpages = [
    { url: '/learn.html',       homeHref: 'index.html' },
    { url: '/cv.html',          homeHref: 'index.html' },
    { url: '/apply.html',       homeHref: 'index.html' },
    { url: '/interview.html',   homeHref: 'index.html' },
    { url: '/team.html',        homeHref: 'index.html' },
  ];

  for (const { url, homeHref } of subpages) {
    test(`${url}: Home breadcrumb navigates`, async ({ page }) => {
      await page.goto(BASE + url);
      await page.click(`.breadcrumb a[href="${homeHref}"]`);
      await expect(page).toHaveURL(/index\.html|\/$/);
    });
  }
});

// ── 12. CONTACT FORM ──────────────────────────────────────────────────────────
test.describe('Contact form', () => {
  test('Form fields accept input and button text changes on submit', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'This is a QA test message');
    await page.click('button[type="submit"]');
    await expect(page.locator('button[type="submit"]')).toContainText('Sent!');
  });
});

// ── 13. SEARCH TOGGLE ─────────────────────────────────────────────────────────
test.describe('Search bar', () => {
  test('Search bar toggles open and closed', async ({ page }) => {
    await page.goto(BASE + '/');
    const bar = page.locator('#searchBar');
    await expect(bar).not.toHaveClass(/visible/);
    await page.click('.search-btn');
    await expect(bar).toHaveClass(/visible/);
    await page.click('.search-btn');
    await expect(bar).not.toHaveClass(/visible/);
  });
});

// ── 14. RESPONSIVE LAYOUT ─────────────────────────────────────────────────────
test.describe('Responsive layout', () => {
  test('Desktop: nav links visible, hamburger hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto(BASE + '/');
    await expect(page.locator('.nav-toggle')).toBeHidden();
    await expect(page.locator('.site-nav')).toBeVisible();
  });

  test('Mobile: hamburger visible, nav hidden by default', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE + '/');
    await expect(page.locator('.nav-toggle')).toBeVisible();
  });

  test('Hero renders correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE + '/');
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('.hero-avatar')).toBeVisible();
  });
});
