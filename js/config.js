/**
 * Application configuration and assessment data
 * ADHD BrightStart - CBSE SKILL EXPO Project
 */

const APP_CONFIG = {
  studentName: 'A Sri Nidhi',
  studentClass: 'Class VIII B',
  school: 'Amrita Vidyalayam, Thuckalay',
  project: 'CBSE SKILL EXPO',
  disclaimer:
    'This assessment is intended for educational awareness only. It cannot diagnose ADHD. Please consult a qualified healthcare professional for a comprehensive evaluation.',
};

/** Assessment questions grouped by section */
const ASSESSMENT_QUESTIONS = [
  {
    section: 'A',
    sectionTitle: 'Inattention',
    items: [
      'Makes careless mistakes in school work.',
      'Difficulty paying attention.',
      'Does not seem to listen.',
      'Fails to finish homework.',
      'Difficulty organizing tasks.',
      'Avoids mentally demanding work.',
      'Frequently loses school materials.',
      'Easily distracted.',
      'Forgetful in daily activities.',
    ],
  },
  {
    section: 'B',
    sectionTitle: 'Hyperactivity / Impulsivity',
    items: [
      'Often fidgets.',
      'Leaves seat frequently.',
      'Runs or climbs excessively.',
      'Difficulty playing quietly.',
      'Always "on the go."',
      'Talks excessively.',
      'Blurts out answers.',
      'Difficulty waiting for turn.',
      'Interrupts others.',
    ],
  },
];

/** Response options with numeric values for scoring */
const RESPONSE_OPTIONS = [
  { label: 'Never', value: 0 },
  { label: 'Sometimes', value: 1 },
  { label: 'Often', value: 2 },
  { label: 'Very Often', value: 3 },
];

/** Morning routine checklist items */
const MORNING_ROUTINE_ITEMS = [
  'Brush teeth',
  'Wear uniform',
  'Breakfast',
  'Pack bag',
  'Homework',
  'Water bottle',
  'Shoes',
  'Leave on time',
];

/** Parent tips carousel content */
const PARENT_TIPS = [
  { icon: 'fa-star', title: 'Praise Effort', text: 'Focus on effort and progress rather than perfection. Celebrate small wins to build confidence and motivation.' },
  { icon: 'fa-heart', title: 'Avoid Punishment', text: 'Use positive guidance instead of punishment. ADHD-related behaviours are not intentional misbehaviour.' },
  { icon: 'fa-moon', title: 'Good Sleep', text: 'Ensure 9–11 hours of sleep for children. A consistent bedtime routine improves focus the next day.' },
  { icon: 'fa-apple-whole', title: 'Healthy Breakfast', text: 'A balanced breakfast with protein helps sustain attention and energy throughout the school day.' },
  { icon: 'fa-bag-shopping', title: 'Prepare Previous Night', text: 'Pack bags, lay out uniforms, and review schedules the night before to reduce morning stress.' },
];

/** Teacher tips carousel content */
const TEACHER_TIPS = [
  { icon: 'fa-chair', title: 'Front Row Seating', text: 'Seat the student near the teacher to minimise distractions and provide gentle reminders.' },
  { icon: 'fa-pen-to-square', title: 'Written Instructions', text: 'Provide step-by-step written instructions alongside verbal directions for clarity.' },
  { icon: 'fa-person-walking', title: 'Movement Breaks', text: 'Allow brief movement breaks between tasks to help release excess energy productively.' },
  { icon: 'fa-list-check', title: 'Short Assignments', text: 'Break large tasks into smaller, manageable chunks with clear deadlines.' },
  { icon: 'fa-thumbs-up', title: 'Positive Feedback', text: 'Offer immediate, specific praise when the student demonstrates focus or completes tasks.' },
  { icon: 'fa-calendar-days', title: 'Visual Classroom Schedule', text: 'Display a visual daily schedule so students know what to expect throughout the day.' },
];

/** External reference links */
const REFERENCES = [
  {
    title: 'AIIMS ADHD Training Module',
    url: 'https://www.aiims.edu/en.html',
    icon: 'fa-hospital',
    desc: 'All India Institute of Medical Sciences resources on ADHD awareness.',
  },
  {
    title: 'CDC ADHD',
    url: 'https://www.cdc.gov/adhd/',
    icon: 'fa-globe',
    desc: 'Centers for Disease Control and Prevention ADHD information.',
  },
  {
    title: 'NIMH',
    url: 'https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd',
    icon: 'fa-brain',
    desc: 'National Institute of Mental Health ADHD overview.',
  },
  {
    title: 'Indian ADHD Research',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=ADHD+India+children',
    icon: 'fa-book-medical',
    desc: 'Published research on ADHD prevalence in Indian children.',
  }
];

/** Inattentive profile recommendations */
const INATTENTIVE_RECOMMENDATIONS = [
  { icon: 'fa-calendar-check', title: 'Visual Schedules', text: 'Use picture or written schedules for daily routines at home and school.' },
  { icon: 'fa-clipboard-list', title: 'Morning Checklist', text: 'Post a laminated morning checklist in the bedroom or kitchen.' },
  { icon: 'fa-clock', title: 'Timers', text: 'Use visual timers to help with task transitions and time awareness.' },
  { icon: 'fa-book-open', title: 'Break Homework', text: 'Divide homework into 15–20 minute blocks with short breaks between.' },
  { icon: 'fa-backpack', title: 'Night-Before School Bag', text: 'Pack the school bag every evening to avoid morning rush and forgotten items.' },
  { icon: 'fa-palette', title: 'Colour-Coded Notebooks', text: 'Assign a colour to each subject for easy organisation.' },
];

/** Hyperactive profile recommendations */
const HYPERACTIVE_RECOMMENDATIONS = [
  { icon: 'fa-person-running', title: 'Movement Breaks', text: 'Schedule regular movement breaks during study and classroom time.' },
  { icon: 'fa-dumbbell', title: 'Physical Activity', text: 'Encourage daily sports, yoga, or outdoor play to channel energy positively.' },
  { icon: 'fa-hourglass-half', title: 'Short Study Sessions', text: 'Keep study periods brief and engaging to maintain focus.' },
  { icon: 'fa-hands', title: 'Hands-On Learning', text: 'Use manipulatives, experiments, and interactive activities when possible.' },
  { icon: 'fa-medal', title: 'Positive Reinforcement', text: 'Reward desired behaviours with praise, stickers, or small privileges.' },
];
