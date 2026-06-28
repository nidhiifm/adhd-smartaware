/**
 * Chart.js visualizations for statistics section
 */

let pieChartInstance = null;
let barChartInstance = null;

/** Chart color palette matching brand */
const CHART_COLORS = {
  primary: '#1565C0',
  secondary: '#42A5F5',
  primaryLight: 'rgba(21, 101, 192, 0.7)',
  secondaryLight: 'rgba(66, 165, 245, 0.7)',
  gray: '#6c757d',
};

/**
 * Get chart text/label color based on theme
 * @returns {string}
 */
function getChartTextColor() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? '#e9ecef' : '#495057';
}

/**
 * Initialize or refresh statistics charts
 */
function initCharts() {
  if (typeof Chart === 'undefined') return;

  const textColor = getChartTextColor();
  Chart.defaults.color = textColor;
  Chart.defaults.font.family = "'Poppins', sans-serif";

  renderPieChart(textColor);
  renderBarChart(textColor);
}

/**
 * Render ADHD prevalence pie chart
 * @param {string} textColor
 */
function renderPieChart(textColor) {
  const canvas = document.getElementById('pieChart');
  if (!canvas) return;

  if (pieChartInstance) pieChartInstance.destroy();

  pieChartInstance = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['ADHD (India ~6.3%)', 'Other Children (~93.7%)'],
      datasets: [
        {
          data: [6.3, 93.7],
          backgroundColor: [CHART_COLORS.primary, CHART_COLORS.secondary],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor, padding: 16, font: { size: 13 } },
        },
        title: {
          display: true,
          text: 'Estimated ADHD Prevalence in India',
          color: textColor,
          font: { size: 16, weight: '600' },
        },
      },
      animation: { animateRotate: true, duration: 1200 },
    },
  });
}

/**
 * Render India vs Global comparison bar chart
 * @param {string} textColor
 */
function renderBarChart(textColor) {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;

  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['India (School Studies)', 'Global Average', 'India (1 in 16 Est.)'],
      datasets: [
        {
          label: 'Prevalence (%)',
          data: [7.5, 5.0, 6.3],
          backgroundColor: [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.primaryLight],
          borderRadius: 10,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'India vs Global ADHD Prevalence Comparison',
          color: textColor,
          font: { size: 16, weight: '600' },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          ticks: { color: textColor, callback: (v) => `${v}%` },
          grid: { color: 'rgba(128,128,128,0.15)' },
        },
        x: {
          ticks: { color: textColor, font: { size: 11 } },
          grid: { display: false },
        },
      },
      animation: { duration: 1200, easing: 'easeOutQuart' },
    },
  });
}

/**
 * Refresh charts when dark mode toggles
 */
function refreshChartsForTheme() {
  initCharts();
}
