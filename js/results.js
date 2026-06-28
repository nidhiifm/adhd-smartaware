/**
 * Scoring logic and results dashboard rendering
 */

/**
 * Calculate all assessment scores from responses
 * @param {number[]} responses - 18 values (0-3)
 * @returns {Object} Complete results object
 */
function calculateScores(responses) {
  const inattention = responses.slice(0, 9);
  const hyperactivity = responses.slice(9, 18);

  const inattentionScore = inattention.reduce((sum, v) => sum + v, 0);
  const hyperactivityScore = hyperactivity.reduce((sum, v) => sum + v, 0);
  const totalScore = inattentionScore + hyperactivityScore;

  const countSymptoms = (arr) => arr.filter((v) => v >= 2).length;
  const inattentionCount = countSymptoms(inattention);
  const hyperactivityCount = countSymptoms(hyperactivity);
  const symptomCount = inattentionCount + hyperactivityCount;

  const outcome = determineOutcome(inattentionCount, hyperactivityCount);

  return {
    responses,
    inattentionScore,
    hyperactivityScore,
    totalScore,
    inattentionCount,
    hyperactivityCount,
    symptomCount,
    outcome,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Determine symptom pattern outcome based on counts
 * @param {number} inattentionCount
 * @param {number} hyperactivityCount
 * @returns {Object}
 */
function determineOutcome(inattentionCount, hyperactivityCount) {
  const meetsInattention = inattentionCount >= 6;
  const meetsHyperactivity = hyperactivityCount >= 6;

  if (meetsInattention && meetsHyperactivity) {
    return {
      emoji: '🔴',
      label: 'Possible Combined ADHD Symptom Pattern',
      type: 'combined',
      color: '#dc3545',
    };
  }
  if (meetsInattention) {
    return {
      emoji: '🟡',
      label: 'Possible Predominantly Inattentive Symptom Pattern',
      type: 'inattentive',
      color: '#ffc107',
    };
  }
  if (meetsHyperactivity) {
    return {
      emoji: '🟠',
      label: 'Possible Predominantly Hyperactive/Impulsive Symptom Pattern',
      type: 'hyperactive',
      color: '#fd7e14',
    };
  }
  return {
    emoji: '🟢',
    label: 'Low likelihood of significant ADHD symptoms',
    type: 'low',
    color: '#28a745',
  };
}

/**
 * Animate a counter from 0 to target value
 * @param {HTMLElement} el
 * @param {number} target
 * @param {number} duration
 */
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/**
 * Animate circular progress ring
 * @param {SVGElement} circle
 * @param {number} percent - 0 to 100
 */
function animateCircularProgress(circle, percent) {
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  requestAnimationFrame(() => {
    circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
    circle.style.strokeDashoffset = `${circumference - (percent / 100) * circumference}`;
  });
}

/**
 * Render the full results dashboard
 * @param {Object} results
 */
function renderResults(results) {
  if (!results) {
    results = loadResults();
  }
  if (!results) {
    document.getElementById('results-empty').classList.remove('d-none');
    document.getElementById('results-dashboard').classList.add('d-none');
    return;
  }

  document.getElementById('results-empty').classList.add('d-none');
  document.getElementById('results-dashboard').classList.remove('d-none');

  const outcomeEl = document.getElementById('outcome-display');
  outcomeEl.innerHTML = `
    <span class="outcome-emoji">${results.outcome.emoji}</span>
    <h3 class="outcome-label">${results.outcome.label}</h3>
    <p class="outcome-message">
      Your responses indicate a possible symptom pattern that may benefit from professional evaluation.
    </p>`;

  animateCounter(document.getElementById('score-inattention'), results.inattentionScore);
  animateCounter(document.getElementById('score-hyperactivity'), results.hyperactivityScore);
  animateCounter(document.getElementById('score-total'), results.totalScore);
  animateCounter(document.getElementById('score-symptoms'), results.symptomCount);

  document.getElementById('max-inattention').textContent = '/ 27';
  document.getElementById('max-hyperactivity').textContent = '/ 27';
  document.getElementById('max-total').textContent = '/ 54';
  document.getElementById('max-symptoms').textContent = '/ 18';

  animateCircularProgress(
    document.getElementById('ring-inattention'),
    (results.inattentionScore / 27) * 100
  );
  animateCircularProgress(
    document.getElementById('ring-hyperactivity'),
    (results.hyperactivityScore / 27) * 100
  );
  animateCircularProgress(
    document.getElementById('ring-total'),
    (results.totalScore / 54) * 100
  );
  animateCircularProgress(
    document.getElementById('ring-symptoms'),
    (results.symptomCount / 18) * 100
  );

  renderRecommendations(results.outcome.type);
}

/**
 * Initialize results section on page load if data exists
 */
function initResults() {
  const results = loadResults();
  if (results) {
    renderResults(results);
  } else {
    document.getElementById('results-empty')?.classList.remove('d-none');
    document.getElementById('results-dashboard')?.classList.add('d-none');
  }
}
