/**
 * Assessment questionnaire logic — one question at a time
 */

let currentQuestionIndex = 0;
let assessmentResponses = new Array(18).fill(null);

/**
 * Flatten questions from config into a single array with metadata
 * @returns {Array<{text: string, section: string, sectionTitle: string, globalIndex: number}>}
 */
function getFlatQuestions() {
  const flat = [];
  let idx = 0;
  ASSESSMENT_QUESTIONS.forEach((group) => {
    group.items.forEach((text) => {
      flat.push({
        text,
        section: group.section,
        sectionTitle: group.sectionTitle,
        globalIndex: idx,
      });
      idx += 1;
    });
  });
  return flat;
}

/**
 * Initialize assessment — restore from storage or start fresh
 */
function initAssessment() {
  const saved = loadResponses();
  if (saved && saved.length === 18 && saved.every((v) => v !== null && v !== undefined)) {
    assessmentResponses = saved;
    currentQuestionIndex = 17;
  } else if (saved && saved.some((v) => v !== null)) {
    assessmentResponses = saved;
    currentQuestionIndex = saved.findIndex((v) => v === null);
    if (currentQuestionIndex === -1) currentQuestionIndex = 17;
  } else {
    assessmentResponses = new Array(18).fill(null);
    currentQuestionIndex = 0;
  }
  renderQuestion();
}

/**
 * Render the current question card
 */
function renderQuestion() {
  const questions = getFlatQuestions();
  const q = questions[currentQuestionIndex];
  const container = document.getElementById('question-container');
  const progressBar = document.getElementById('assessment-progress');
  const counter = document.getElementById('question-counter');
  const sectionLabel = document.getElementById('section-label');

  if (!container) return;

  const progress = ((currentQuestionIndex + 1) / 18) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', progress);
  counter.textContent = `Question ${currentQuestionIndex + 1} of 18`;
  sectionLabel.textContent = `Section ${q.section}: ${q.sectionTitle}`;

  const optionsHtml = RESPONSE_OPTIONS.map(
    (opt) => `
    <label class="option-card ${assessmentResponses[q.globalIndex] === opt.value ? 'selected' : ''}" role="radio" aria-checked="${assessmentResponses[q.globalIndex] === opt.value}">
      <input type="radio" name="q${q.globalIndex}" value="${opt.value}"
        ${assessmentResponses[q.globalIndex] === opt.value ? 'checked' : ''}
        aria-label="${opt.label}">
      <span class="option-value">${opt.value}</span>
      <span class="option-label">${opt.label}</span>
    </label>`
  ).join('');

  container.innerHTML = `
    <div class="question-card glass-card">
      <p class="question-number">Q${currentQuestionIndex + 1}</p>
      <h3 class="question-text">${q.text}</h3>
      <div class="options-grid" role="radiogroup" aria-label="Response options">
        ${optionsHtml}
      </div>
    </div>`;

  container.querySelectorAll('.option-card').forEach((card) => {
    card.addEventListener('click', () => {
      const input = card.querySelector('input');
      selectOption(parseInt(input.value, 10));
    });
  });

  document.getElementById('btn-prev').disabled = currentQuestionIndex === 0;
  document.getElementById('btn-next').textContent =
    currentQuestionIndex === 17 ? 'Submit Assessment' : 'Next';
}

/**
 * Handle option selection
 * @param {number} value - 0 to 3
 */
function selectOption(value) {
  assessmentResponses[currentQuestionIndex] = value;
  saveResponses(assessmentResponses);
  document.querySelectorAll('#question-container .option-card').forEach((card) => {
    const input = card.querySelector('input');
    const isSelected = parseInt(input.value, 10) === value;
    card.classList.toggle('selected', isSelected);
    input.checked = isSelected;
    card.setAttribute('aria-checked', isSelected);
  });
}

/**
 * Navigate to previous question
 */
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    renderQuestion();
  }
}

/**
 * Navigate to next question or submit
 */
function nextQuestion() {
  if (assessmentResponses[currentQuestionIndex] === null) {
    showToast('Please select an answer before continuing.');
    return;
  }
  if (currentQuestionIndex < 17) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    submitAssessment();
  }
}

/**
 * Compute scores and navigate to results
 */
function submitAssessment() {
  const results = calculateScores(assessmentResponses);
  saveResults(results);
  saveResponses(assessmentResponses);
  navigateToSection('results');
  renderResults(results);
  showToast('Assessment submitted successfully!');
}

/**
 * Reset assessment to start over
 */
function resetAssessment() {
  assessmentResponses = new Array(18).fill(null);
  currentQuestionIndex = 0;
  clearAssessmentData();
  renderQuestion();
  navigateToSection('assessment');
}
