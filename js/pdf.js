/**
 * PDF report generation using jsPDF
 */

/**
 * Generate and download a PDF summary of assessment results
 */
function downloadPDFReport() {
  const results = loadResults();
  if (!results) {
    showToast('No assessment results found. Please complete the assessment first.');
    return;
  }

  if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
    showToast('PDF library not loaded. Please refresh the page.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  doc.setFillColor(21, 101, 192);
  doc.rect(0, 0, pageWidth, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text('ADHD SmartAware', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.text('AI-Powered Awareness & Early Screening Report', pageWidth / 2, 24, { align: 'center' });

  y = 45;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.text(`Generated: ${new Date(results.timestamp).toLocaleString()}`, 14, y);
  y += 10;
  doc.text(`Presented by: ${APP_CONFIG.studentName}`, 14, y);
  y += 6;
  doc.text(`${APP_CONFIG.school} | ${APP_CONFIG.project}`, 14, y);
  y += 14;

  doc.setFontSize(13);
  doc.setTextColor(21, 101, 192);
  doc.text('Assessment Scores', 14, y);
  y += 10;

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const scores = [
    ['Inattention Score', `${results.inattentionScore} / 27`],
    ['Hyperactivity Score', `${results.hyperactivityScore} / 27`],
    ['Total Score', `${results.totalScore} / 54`],
    ['Symptom Count (Often + Very Often)', `${results.symptomCount} / 18`],
    ['Inattention Symptom Count', `${results.inattentionCount} / 9`],
    ['Hyperactivity Symptom Count', `${results.hyperactivityCount} / 9`],
  ];
  scores.forEach(([label, val]) => {
    doc.text(`${label}: ${val}`, 14, y);
    y += 7;
  });

  y += 8;
  doc.setFontSize(13);
  doc.setTextColor(21, 101, 192);
  doc.text('Outcome', 14, y);
  y += 10;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`${results.outcome.label}`, 14, y);
  y += 8;
  const message =
    'Your responses indicate a possible symptom pattern that may benefit from professional evaluation.';
  const splitMsg = doc.splitTextToSize(message, pageWidth - 28);
  doc.text(splitMsg, 14, y);
  y += splitMsg.length * 6 + 10;

  doc.setFillColor(255, 243, 205);
  doc.rect(14, y, pageWidth - 28, 28, 'F');
  doc.setFontSize(9);
  doc.setTextColor(100, 80, 0);
  const disclaimer = doc.splitTextToSize(APP_CONFIG.disclaimer, pageWidth - 36);
  doc.text(disclaimer, 18, y + 8);

  y += 38;
  doc.setFontSize(13);
  doc.setTextColor(21, 101, 192);
  doc.text('Recommendations Summary', 14, y);
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);

  let recs = [];
  const type = results.outcome.type;
  if (type === 'inattentive' || type === 'combined') recs = recs.concat(INATTENTIVE_RECOMMENDATIONS);
  if (type === 'hyperactive' || type === 'combined') recs = recs.concat(HYPERACTIVE_RECOMMENDATIONS);
  if (type === 'low') {
    recs = [
      { title: 'Continue Healthy Habits', text: 'Maintain good sleep and routines.' },
      { title: 'Stay Informed', text: 'Learn about ADHD for awareness.' },
    ];
  }

  recs.slice(0, 6).forEach((r) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFont(undefined, 'bold');
    doc.text(`• ${r.title}`, 14, y);
    doc.setFont(undefined, 'normal');
    y += 5;
    const lines = doc.splitTextToSize(r.text, pageWidth - 28);
    doc.text(lines, 18, y);
    y += lines.length * 5 + 4;
  });

  doc.save('ADHD-SmartAware-Report.pdf');
  showToast('PDF report downloaded successfully!');
}
