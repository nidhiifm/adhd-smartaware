# 🧠 ADHD SmartAware

**An AI-Powered ADHD Awareness & Early Screening Assistant**

Developed for the **INSPIRE MANAK Innovation Project** at **Amrita Vidyalayam**.

> ⚠️ **Disclaimer:** This assessment is intended for educational awareness only. It cannot diagnose ADHD. Please consult a qualified healthcare professional for a comprehensive evaluation.

## Features

- Single-page application with smooth section navigation
- 18-question screening assessment (Inattention + Hyperactivity/Impulsivity)
- Animated results dashboard with circular progress indicators
- Dynamic recommendations based on symptom patterns
- Interactive morning routine checklist (saved in LocalStorage)
- Parent & teacher tip carousels
- Chart.js statistics (India vs Global prevalence)
- Dark mode toggle
- Downloadable PDF report
- Fully responsive (desktop, tablet, mobile)
- AOS scroll animations & glassmorphism design

## Quick Start

1. Open `index.html` in any modern web browser
2. No server or installation required — runs entirely in the browser

Alternatively, serve locally:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`

## Customization

Edit `js/config.js` to update:

- `studentName` — Your name
- `studentClass` — Your class
- `school` — School name
- `project` — Project title

## Tech Stack

- HTML5, CSS3, Bootstrap 5
- Vanilla JavaScript (modular)
- Chart.js, Font Awesome, AOS
- jsPDF for report generation
- LocalStorage for persistence

## Project Structure

```
adhd-smartaware/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js          # App config & question data
│   ├── storage.js         # LocalStorage helpers
│   ├── assessment.js      # Questionnaire logic
│   ├── results.js         # Scoring & results display
│   ├── charts.js          # Chart.js visualizations
│   ├── recommendations.js # Tips, checklists, references
│   ├── pdf.js             # PDF report generation
│   └── app.js             # Main bootstrap & navigation
└── README.md
```

## License

Educational project — Amrita Vidyalayam INSPIRE MANAK Innovation Project.
