/**
 * Main application bootstrap — navigation, theme, loading, utilities
 */

/**
 * Initialize the application on DOM ready
 */
function initApp() {
  showLoadingScreen();
  populateConfigText();
  initNavigation();
  initDarkMode();
  initSmoothScroll();
  initAssessment();
  initResults();
  initCharts();
  initMorningRoutine();
  initParentTips();
  initTeacherTips();
  initReferences();
  initRecommendationsSection();
  bindGlobalEvents();

  window.addEventListener('load', () => {
    hideLoadingScreen();
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, once: true, offset: 80 });
    }
  });
}

/**
 * Populate dynamic text from config (name, school, disclaimer)
 */
function populateConfigText() {
  document.querySelectorAll('[data-student-name]').forEach((el) => {
    el.textContent = APP_CONFIG.studentName;
  });
  document.querySelectorAll('[data-student-class]').forEach((el) => {
    el.textContent = APP_CONFIG.studentClass;
  });
  document.querySelectorAll('[data-school]').forEach((el) => {
    el.textContent = APP_CONFIG.school;
  });
  document.querySelectorAll('[data-project]').forEach((el) => {
    el.textContent = APP_CONFIG.project;
  });
  document.querySelectorAll('[data-disclaimer]').forEach((el) => {
    el.textContent = APP_CONFIG.disclaimer;
  });
}

/**
 * Set up SPA section navigation
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const navbarCollapse = document.getElementById('navbarNav');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      navigateToSection(section);
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      if (navbarCollapse?.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });

  document.getElementById('btn-start-assessment')?.addEventListener('click', () => {
    navigateToSection('assessment');
    setActiveNav('assessment');
  });
  document.getElementById('btn-learn-adhd')?.addEventListener('click', () => {
    navigateToSection('about');
    setActiveNav('about');
  });
  document.getElementById('scroll-indicator')?.addEventListener('click', () => {
    navigateToSection('about');
    setActiveNav('about');
  });

  document.querySelector('.navbar-brand')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToSection('home');
    setActiveNav('home');
  });
}

/**
 * Navigate to a section by ID
 * @param {string} sectionId
 */
function navigateToSection(sectionId) {
  document.querySelectorAll('.page-section').forEach((sec) => {
    sec.classList.remove('active');
  });
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (sectionId === 'results') {
      const results = loadResults();
      if (results) renderResults(results);
    }
    if (sectionId === 'statistics') {
      setTimeout(initCharts, 100);
    }
    if (typeof AOS !== 'undefined') AOS.refresh();
  }
}

/**
 * Set active nav link by section id
 * @param {string} sectionId
 */
function setActiveNav(sectionId) {
  document.querySelectorAll('.nav-link[data-section]').forEach((l) => {
    l.classList.toggle('active', l.dataset.section === sectionId);
  });
}

/**
 * Initialize dark mode toggle from saved preference
 */
function initDarkMode() {
  const isDark = loadDarkMode();
  applyTheme(isDark);
  document.getElementById('dark-mode-toggle')?.addEventListener('click', toggleDarkMode);
}

/**
 * Toggle between light and dark themes
 */
function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'dark';
  applyTheme(isDark);
  saveDarkMode(isDark);
  refreshChartsForTheme();
}

/**
 * Apply theme to document
 * @param {boolean} isDark
 */
function applyTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const icon = document.querySelector('#dark-mode-toggle i');
  if (icon) {
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/**
 * Enable smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

/**
 * Show loading overlay
 */
function showLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (loader) loader.classList.remove('hidden');
}

/**
 * Hide loading overlay with fade
 */
function hideLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }
}

/**
 * Display a toast notification
 * @param {string} message
 */
function showToast(message) {
  const toastEl = document.getElementById('app-toast');
  const body = document.getElementById('toast-message');
  if (!toastEl || !body) return;
  body.textContent = message;
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 });
  toast.show();
}

/**
 * Bind global button events
 */
function bindGlobalEvents() {
  document.getElementById('btn-prev')?.addEventListener('click', prevQuestion);
  document.getElementById('btn-next')?.addEventListener('click', nextQuestion);
  document.getElementById('btn-reset')?.addEventListener('click', resetAssessment);
  document.getElementById('btn-download-pdf')?.addEventListener('click', downloadPDFReport);
  document.getElementById('btn-go-assessment')?.addEventListener('click', () => {
    navigateToSection('assessment');
    setActiveNav('assessment');
  });
}

document.addEventListener('DOMContentLoaded', initApp);
