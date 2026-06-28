/**
 * LocalStorage helpers for persisting app state
 */

const STORAGE_KEYS = {
  responses: 'smartaware_responses',
  results: 'smartaware_results',
  darkMode: 'smartaware_dark_mode',
  morningRoutine: 'smartaware_morning_routine',
};

/**
 * Save assessment responses to localStorage
 * @param {number[]} responses - Array of 18 numeric values (0-3)
 */
function saveResponses(responses) {
  localStorage.setItem(STORAGE_KEYS.responses, JSON.stringify(responses));
}

/**
 * Load saved assessment responses
 * @returns {number[]|null}
 */
function loadResponses() {
  const raw = localStorage.getItem(STORAGE_KEYS.responses);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Save computed results object to localStorage
 * @param {Object} results
 */
function saveResults(results) {
  localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(results));
}

/**
 * Load saved results
 * @returns {Object|null}
 */
function loadResults() {
  const raw = localStorage.getItem(STORAGE_KEYS.results);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Persist dark mode preference
 * @param {boolean} isDark
 */
function saveDarkMode(isDark) {
  localStorage.setItem(STORAGE_KEYS.darkMode, isDark ? '1' : '0');
}

/**
 * Load dark mode preference
 * @returns {boolean}
 */
function loadDarkMode() {
  return localStorage.getItem(STORAGE_KEYS.darkMode) === '1';
}

/**
 * Save morning routine checklist state
 * @param {boolean[]} checked
 */
function saveMorningRoutine(checked) {
  localStorage.setItem(STORAGE_KEYS.morningRoutine, JSON.stringify(checked));
}

/**
 * Load morning routine checklist state
 * @param {number} length - Expected array length
 * @returns {boolean[]}
 */
function loadMorningRoutine(length) {
  const raw = localStorage.getItem(STORAGE_KEYS.morningRoutine);
  if (raw) {
    return JSON.parse(raw);
  }
  return new Array(length).fill(false);
}

/**
 * Clear all assessment data
 */
function clearAssessmentData() {
  localStorage.removeItem(STORAGE_KEYS.responses);
  localStorage.removeItem(STORAGE_KEYS.results);
}
