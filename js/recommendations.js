/**
 * Dynamic recommendations, morning routine, and tip carousels
 */

let parentTipIndex = 0;
let teacherTipIndex = 0;

/**
 * Render recommendation cards based on outcome type
 * @param {string} type - 'inattentive' | 'hyperactive' | 'combined' | 'low'
 */
function renderRecommendations(type) {
  const container = document.getElementById('recommendations-list');
  if (!container) return;

  let items = [];
  if (type === 'inattentive' || type === 'combined') {
    items = items.concat(INATTENTIVE_RECOMMENDATIONS);
  }
  if (type === 'hyperactive' || type === 'combined') {
    items = items.concat(HYPERACTIVE_RECOMMENDATIONS);
  }
  if (type === 'low') {
    items = [
      {
        icon: 'fa-seedling',
        title: 'Continue Healthy Habits',
        text: 'Maintain good sleep, nutrition, and structured routines to support focus and wellbeing.',
      },
      {
        icon: 'fa-book-open-reader',
        title: 'Stay Informed',
        text: 'Learn about ADHD to better support peers and family members who may need understanding.',
      },
      {
        icon: 'fa-heart-pulse',
        title: 'Regular Check-ins',
        text: 'If concerns arise in the future, consult a healthcare professional for guidance.',
      },
    ];
  }

  container.innerHTML = items
    .map(
      (item, i) => `
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="rec-card glass-card h-100">
        <div class="rec-icon"><i class="fas ${item.icon}"></i></div>
        <h4>${item.title}</h4>
        <p>${item.text}</p>
      </div>
    </div>`
    )
    .join('');

  if (typeof AOS !== 'undefined') AOS.refresh();
}

/**
 * Initialize morning routine interactive checklist
 */
function initMorningRoutine() {
  const list = document.getElementById('morning-checklist');
  if (!list) return;

  const checked = loadMorningRoutine(MORNING_ROUTINE_ITEMS.length);

  list.innerHTML = MORNING_ROUTINE_ITEMS.map(
    (item, i) => `
    <label class="checklist-item ${checked[i] ? 'checked' : ''}">
      <input type="checkbox" data-index="${i}" ${checked[i] ? 'checked' : ''} aria-label="${item}">
      <span class="check-box"><i class="fas fa-check"></i></span>
      <span class="check-label">${item}</span>
    </label>`
  ).join('');

  list.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener('change', () => {
      const state = loadMorningRoutine(MORNING_ROUTINE_ITEMS.length);
      state[parseInt(cb.dataset.index, 10)] = cb.checked;
      saveMorningRoutine(state);
      cb.closest('.checklist-item').classList.toggle('checked', cb.checked);
      updateMorningProgress(state);
    });
  });

  updateMorningProgress(checked);
}

/**
 * Update morning routine completion percentage
 * @param {boolean[]} checked
 */
function updateMorningProgress(checked) {
  const done = checked.filter(Boolean).length;
  const pct = Math.round((done / checked.length) * 100);
  const bar = document.getElementById('morning-progress-bar');
  const label = document.getElementById('morning-progress-label');
  if (bar) {
    bar.style.width = `${pct}%`;
    bar.setAttribute('aria-valuenow', pct);
  }
  if (label) label.textContent = `${pct}% Complete (${done}/${checked.length})`;
}

/**
 * Initialize parent tips carousel
 */
function initParentTips() {
  renderTipCarousel('parent', PARENT_TIPS, parentTipIndex);
  document.getElementById('parent-prev')?.addEventListener('click', () => {
    parentTipIndex = (parentTipIndex - 1 + PARENT_TIPS.length) % PARENT_TIPS.length;
    renderTipCarousel('parent', PARENT_TIPS, parentTipIndex);
  });
  document.getElementById('parent-next')?.addEventListener('click', () => {
    parentTipIndex = (parentTipIndex + 1) % PARENT_TIPS.length;
    renderTipCarousel('parent', PARENT_TIPS, parentTipIndex);
  });
}

/**
 * Initialize teacher tips carousel
 */
function initTeacherTips() {
  renderTipCarousel('teacher', TEACHER_TIPS, teacherTipIndex);
  document.getElementById('teacher-prev')?.addEventListener('click', () => {
    teacherTipIndex = (teacherTipIndex - 1 + TEACHER_TIPS.length) % TEACHER_TIPS.length;
    renderTipCarousel('teacher', TEACHER_TIPS, teacherTipIndex);
  });
  document.getElementById('teacher-next')?.addEventListener('click', () => {
    teacherTipIndex = (teacherTipIndex + 1) % TEACHER_TIPS.length;
    renderTipCarousel('teacher', TEACHER_TIPS, teacherTipIndex);
  });
}

/**
 * Render a single tip in a carousel
 * @param {string} prefix - 'parent' or 'teacher'
 * @param {Array} tips
 * @param {number} index
 */
function renderTipCarousel(prefix, tips, index) {
  const card = document.getElementById(`${prefix}-tip-card`);
  const dots = document.getElementById(`${prefix}-tip-dots`);
  if (!card) return;

  const tip = tips[index];
  card.innerHTML = `
    <div class="tip-icon"><i class="fas ${tip.icon}"></i></div>
    <h4>${tip.title}</h4>
    <p>${tip.text}</p>`;
  card.setAttribute('data-aos', 'fade-left');

  if (dots) {
    dots.innerHTML = tips
      .map(
        (_, i) =>
          `<button class="tip-dot ${i === index ? 'active' : ''}" aria-label="Tip ${i + 1}" data-index="${i}"></button>`
      )
      .join('');
    dots.querySelectorAll('.tip-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index, 10);
        if (prefix === 'parent') parentTipIndex = idx;
        else teacherTipIndex = idx;
        renderTipCarousel(prefix, tips, idx);
      });
    });
  }
}

/**
 * Render reference link cards
 */
function initReferences() {
  const container = document.getElementById('references-grid');
  if (!container) return;

  container.innerHTML = REFERENCES.map(
    (ref, i) => `
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${i * 100}">
      <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-card glass-card h-100">
        <div class="ref-icon"><i class="fas ${ref.icon}"></i></div>
        <h4>${ref.title}</h4>
        <p>${ref.desc}</p>
        <span class="ref-link">Visit Resource <i class="fas fa-arrow-up-right-from-square"></i></span>
      </a>
    </div>`
  ).join('');
}

/**
 * Initialize recommendations section defaults when no assessment done
 */
function initRecommendationsSection() {
  const results = loadResults();
  renderRecommendations(results ? results.outcome.type : 'low');
}
