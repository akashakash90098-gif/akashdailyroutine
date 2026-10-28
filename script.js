/**
 * Akash Daily Routine — Personal Productivity Dashboard
 * Pastel Lavender Zen Theme (Mobile & Web View Optimized)
 * Author: Pair programmed for Akash V (B.Tech 2nd Year CSE-AIML)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA MODELS & LOCALSTORAGE INITIALIZATION
  // ==========================================================================
  const STORAGE_KEY = 'akash_daily_routine_v1';

  // Default timetable updated for Akash V (B.Tech CSE-AIML • Web Dev Intern • NxtWave Learner)
  const DEFAULT_WEEKDAY_TIMETABLE = [
    {
      id: 'tt-1',
      name: 'Studying, learning new skills, and personal development',
      startTime: '05:00',
      endTime: '07:00',
      category: 'Study & Skills',
      description: 'Studying, learning new skills, and personal development.',
      notes: 'Early morning deep focus study and skill mastery',
      reminder: true,
      completedDate: null
    },
    {
      id: 'tt-2',
      name: 'Exercise, workout, and meditation',
      startTime: '07:00',
      endTime: '08:00',
      category: 'Health & Fitness',
      description: 'Exercise, workout, and meditation.',
      notes: 'Boost physical health, stamina, and mental calm',
      reminder: true,
      completedDate: null
    },
    {
      id: 'tt-3',
      name: 'Getting ready for college and having breakfast',
      startTime: '08:00',
      endTime: '09:00',
      category: 'Morning Routine',
      description: 'Getting ready for college and having breakfast.',
      notes: 'Nutritious breakfast and commute prep',
      reminder: false,
      completedDate: null
    },
    {
      id: 'tt-4',
      name: 'College classes, lectures, and academic activities',
      startTime: '09:00',
      endTime: '16:00',
      category: 'College',
      description: 'College classes, lectures, and academic activities.',
      notes: 'Engage actively in lectures, labs & coursework',
      reminder: true,
      completedDate: null
    },
    {
      id: 'tt-5',
      name: 'Office internship and practical web development work',
      startTime: '16:00',
      endTime: '20:00',
      category: 'Internship',
      description: 'Office internship and practical web development work.',
      notes: 'Production web development sprints & team tasks',
      reminder: true,
      completedDate: null
    },
    {
      id: 'tt-6',
      name: 'Dinner, refreshment, and preparation for class',
      startTime: '20:00',
      endTime: '21:00',
      category: 'Personal Time',
      description: 'Dinner, refreshment, and preparation for class.',
      notes: 'Healthy dinner, rest, and workspace setup',
      reminder: false,
      completedDate: null
    },
    {
      id: 'tt-7',
      name: 'NxtWave CCBP online class and coursework',
      startTime: '21:00',
      endTime: '22:00',
      category: 'Online Learning',
      description: 'NxtWave CCBP online class and coursework.',
      notes: 'CCBP 4.0 modules, assignments & live exercises',
      reminder: true,
      completedDate: null
    },
    {
      id: 'tt-8',
      name: 'Building projects, content writing, and personal development',
      startTime: '22:00',
      endTime: '23:00',
      category: 'Projects & Content',
      description: 'Building projects, content writing, and personal development.',
      notes: 'Develop portfolio projects and document tech learnings',
      reminder: false,
      completedDate: null
    },
    {
      id: 'tt-9',
      name: 'Sleep and recovery',
      startTime: '23:00',
      endTime: '05:00',
      category: 'Sleep',
      description: 'Sleep and recovery.',
      notes: 'Restful 6 hours sleep for peak daily focus',
      reminder: false,
      completedDate: null
    }
  ];

  const DEFAULT_WEEKEND_TIMETABLE = [
    {
      id: 'wtt-1',
      name: 'Relaxed Morning, Workout & Breakfast',
      startTime: '07:00',
      endTime: '08:30',
      category: 'Morning Routine',
      description: 'Wake up naturally, morning fitness, healthy breakfast, and meditation.',
      notes: 'Weekend recovery and mindfulness',
      reminder: false,
      completedDate: null
    },
    {
      id: 'wtt-2',
      name: 'NxtWave Coursework & Advanced Skill Practice',
      startTime: '09:00',
      endTime: '12:00',
      category: 'Online Learning',
      description: 'Deep dive into NxtWave CCBP modules, coding assignments, and AI/ML exercises.',
      notes: 'Skill mastery and problem solving',
      reminder: true,
      completedDate: null
    },
    {
      id: 'wtt-3',
      name: 'Portfolio Web Projects & Technical Content',
      startTime: '14:00',
      endTime: '17:00',
      category: 'Projects & Content',
      description: 'Building innovative web applications, GitHub portfolio commits, and writing technical articles.',
      notes: 'Hands-on project work and documentation',
      reminder: false,
      completedDate: null
    },
    {
      id: 'wtt-4',
      name: 'Socializing, Sports & Family Time',
      startTime: '17:30',
      endTime: '21:00',
      category: 'Personal Time',
      description: 'Outdoors, sports/gym, hangout with friends, family dinner, and unwinding.',
      notes: 'Recharge for the week ahead',
      reminder: false,
      completedDate: null
    },
    {
      id: 'wtt-5',
      name: 'Sleep and recovery',
      startTime: '23:00',
      endTime: '05:00',
      category: 'Sleep',
      description: 'Restful sleep to start the week energized and ready.',
      notes: 'Quality sleep hygiene',
      reminder: false,
      completedDate: null
    }
  ];

  const DEFAULT_SUBJECTS = [
    'Python Fundamentals',
    'Python Problem Solving',
    'SQL and DBMS',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Mathematics and Statistics for Machine Learning',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'College Subjects',
    'Revision and Practice'
  ];

  const DEFAULT_ROADMAP_STAGES = [
    {
      id: 'stage-1',
      title: 'Stage 1: Python Fundamentals',
      status: 'Not Started',
      goals: 'Master Python syntax, OOP concepts, and modular code writing.',
      notes: '',
      topics: [
        { text: 'Python Syntax, Variables & Data Types', done: false },
        { text: 'Control Flow (if-else, loops, list comprehensions)', done: false },
        { text: 'Functions, *args, **kwargs & Lambda', done: false },
        { text: 'Object-Oriented Programming (Classes, Inheritance, Dunder)', done: false },
        { text: 'File Handling, JSON & Exception Handling', done: false },
        { text: 'Virtual Environments, pip & project packaging', done: false }
      ]
    },
    {
      id: 'stage-2',
      title: 'Stage 2: Data Structures and Problem Solving',
      status: 'Not Started',
      goals: 'Strengthen core computer science foundations and algorithmic thinking.',
      notes: '',
      topics: [
        { text: 'Time and Space Complexity (Big-O Notation)', done: false },
        { text: 'Arrays, Strings & Two-Pointers Technique', done: false },
        { text: 'Hash Tables, Sets & Dictionaries', done: false },
        { text: 'Linked Lists, Stacks & Queues', done: false },
        { text: 'Binary Search & Recursion', done: false },
        { text: 'Trees, Binary Search Trees & Tree Traversals', done: false },
        { text: 'Graphs (BFS, DFS) & LeetCode 50+ Easy/Medium', done: false }
      ]
    },
    {
      id: 'stage-3',
      title: 'Stage 3: NumPy, Pandas, and Matplotlib',
      status: 'Not Started',
      goals: 'Data manipulation and exploratory data analysis (EDA).',
      notes: '',
      topics: [
        { text: 'NumPy N-dimensional Arrays & Vectorization', done: false },
        { text: 'Broadcasting, Indexing & Matrix Operations', done: false },
        { text: 'Pandas Series, DataFrames & Reading CSV/JSON/SQL', done: false },
        { text: 'Data Cleaning, Handling Missing Values & Types', done: false },
        { text: 'Groupby, Aggregations, Merging & Pivot Tables', done: false },
        { text: 'Data Visualization with Matplotlib & Seaborn', done: false },
        { text: 'End-to-End EDA on a real Kaggle dataset', done: false }
      ]
    },
    {
      id: 'stage-4',
      title: 'Stage 4: Mathematics and Statistics',
      status: 'Not Started',
      goals: 'Build strong theoretical intuition behind machine learning equations.',
      notes: '',
      topics: [
        { text: 'Linear Algebra: Vectors, Vector Spaces & Dot Products', done: false },
        { text: 'Matrices, Determinants, Inverses & Transformations', done: false },
        { text: 'Eigenvalues, Eigenvectors & Principal Component Analysis', done: false },
        { text: 'Calculus: Derivatives, Partial Derivatives & Gradients', done: false },
        { text: 'Probability: Bayes Theorem, Conditional Probability', done: false },
        { text: 'Descriptive & Inferential Statistics, Hypothesis Testing', done: false }
      ]
    },
    {
      id: 'stage-5',
      title: 'Stage 5: Machine Learning',
      status: 'Not Started',
      goals: 'Implement classical supervised and unsupervised ML algorithms from scratch & with Scikit-Learn.',
      notes: '',
      topics: [
        { text: 'Linear Regression & Gradient Descent', done: false },
        { text: 'Logistic Regression & Classification Metrics', done: false },
        { text: 'Overfitting, Underfitting, Bias-Variance Tradeoff', done: false },
        { text: 'Decision Trees, Bagging & Random Forests', done: false },
        { text: 'Boosting Algorithms (XGBoost, LightGBM)', done: false },
        { text: 'Unsupervised: K-Means Clustering & PCA', done: false },
        { text: 'Cross-Validation, Hyperparameter Tuning & Pipelines', done: false }
      ]
    },
    {
      id: 'stage-6',
      title: 'Stage 6: Deep Learning',
      status: 'Not Started',
      goals: 'Understand neural networks, backpropagation, and deep vision/sequence models.',
      notes: '',
      topics: [
        { text: 'Perceptrons & Multi-Layer Neural Networks (ANN)', done: false },
        { text: 'Activation Functions, Loss Functions & Optimizers (Adam, SGD)', done: false },
        { text: 'Backpropagation Mathematical Formulation', done: false },
        { text: 'Convolutional Neural Networks (CNN) for Image Processing', done: false },
        { text: 'Recurrent Neural Networks (RNN) & LSTMs', done: false },
        { text: 'Hands-on PyTorch or TensorFlow model development', done: false }
      ]
    },
    {
      id: 'stage-7',
      title: 'Stage 7: Generative AI and LLMs',
      status: 'Not Started',
      goals: 'Master modern transformer architectures and LLM application development.',
      notes: '',
      topics: [
        { text: 'Attention Mechanism & Transformer Architecture (Encoder/Decoder)', done: false },
        { text: 'BERT, GPT and modern open-weight LLMs (Llama, Mistral)', done: false },
        { text: 'Prompt Engineering Techniques (Chain-of-Thought, ReAct)', done: false },
        { text: 'Hugging Face Transformers library, Tokenizers & Pipelines', done: false },
        { text: 'Fine-Tuning Techniques (LoRA, QLoRA, PEFT)', done: false }
      ]
    },
    {
      id: 'stage-8',
      title: 'Stage 8: RAG and AI Agents',
      status: 'Not Started',
      goals: 'Build intelligent Retrieval-Augmented Generation workflows and tool-calling agents.',
      notes: '',
      topics: [
        { text: 'Embeddings & Vector Search Intuition', done: false },
        { text: 'Vector Databases: ChromaDB, Pinecone, FAISS', done: false },
        { text: 'Document Ingestion, Chunking Strategies & Hybrid Search', done: false },
        { text: 'Building RAG Applications with LangChain / LlamaIndex', done: false },
        { text: 'Autonomous AI Agents with Function/Tool Calling', done: false }
      ]
    },
    {
      id: 'stage-9',
      title: 'Stage 9: Real-World AI Projects',
      status: 'Not Started',
      goals: 'Take models from Jupyter notebooks to production-grade services.',
      notes: '',
      topics: [
        { text: 'REST API Development for ML using FastAPI', done: false },
        { text: 'Docker Containerization of AI Applications', done: false },
        { text: 'Model Versioning & Experiment Tracking (MLflow/Weights&Biases)', done: false },
        { text: 'Cloud Deployment (AWS / GCP / HuggingFace Spaces)', done: false },
        { text: 'Building a Full-Stack AI Project with Web UI', done: false }
      ]
    },
    {
      id: 'stage-10',
      title: 'Stage 10: Portfolio, Resume, and Interview Preparation',
      status: 'Not Started',
      goals: 'Polish GitHub profile, build standout portfolio, and crack AI/ML interviews.',
      notes: '',
      topics: [
        { text: 'Professional GitHub Readmes & Open-Source Contributions', done: false },
        { text: 'Interactive Portfolio Website with Live Demos', done: false },
        { text: 'Resume Optimization highlighting AI/ML & Web Dev projects', done: false },
        { text: 'Technical Interview Prep: Python, SQL, DSA & ML fundamentals', done: false },
        { text: 'AI System Design & Behavioral Interview Practice', done: false }
      ]
    }
  ];

  const DEFAULT_INITIAL_STATE = {
    version: 2,
    profile: {
      name: 'Akash V',
      role: 'B.Tech CSE (AI & ML) • Web Dev Intern',
      studyGoalHours: 4
    },
    settings: {
      theme: 'lavender', // Lavender Pastel Zen by default
      clock12h: true,
      weekendHoliday: true,
      soundEffects: true,
      browserNotifs: false,
      timezone: 'Asia/Kolkata'
    },
    timetable: DEFAULT_WEEKDAY_TIMETABLE,
    weekendTimetable: DEFAULT_WEEKEND_TIMETABLE,
    tasks: [
      {
        id: 'task-1',
        title: 'Solve LeetCode Daily Coding Challenge in Python',
        category: 'Python',
        priority: 'High',
        dueDate: getTodayYMD(),
        completed: false,
        completedAt: null,
        description: 'Focus on Arrays, Two-pointers, or Hash Maps.'
      },
      {
        id: 'task-2',
        title: 'Practice SQL Joins & Aggregate Functions',
        category: 'SQL',
        priority: 'Medium',
        dueDate: getTodayYMD(),
        completed: false,
        completedAt: null,
        description: 'Write queries using INNER, LEFT, RIGHT JOIN and GROUP BY with HAVING.'
      },
      {
        id: 'task-3',
        title: 'Study Linear Algebra (Matrix Multiplication & Vectors) for ML',
        category: 'AI/ML',
        priority: 'High',
        dueDate: getTodayYMD(),
        completed: false,
        completedAt: null,
        description: 'Solidify dot products and vector projection intuition.'
      },
      {
        id: 'task-4',
        title: 'Build Responsive Web Layout for Personal Portfolio',
        category: 'Web Development',
        priority: 'Medium',
        dueDate: getFutureYMD(1),
        completed: false,
        completedAt: null,
        description: 'Clean HTML structure, CSS grid & flexbox, accessible navigation.'
      },
      {
        id: 'task-5',
        title: 'Review College Operating Systems & DSA Lecture Notes',
        category: 'College',
        priority: 'Low',
        dueDate: getFutureYMD(2),
        completed: false,
        completedAt: null,
        description: 'Prepare notes for upcoming internal assessment.'
      }
    ],
    studySessions: [],
    customSubjects: DEFAULT_SUBJECTS,
    projects: [
      {
        id: 'proj-1',
        name: 'Akash Daily Routine & Portfolio Dashboard',
        description: 'Full-featured personal productivity dashboard with timetable, study timer, roadmap, and task manager.',
        category: 'Frontend Development',
        techStack: 'HTML5, CSS3, JavaScript, LocalStorage, Chart.js',
        startDate: getTodayYMD(),
        targetDate: getFutureYMD(14),
        status: 'In Progress',
        subtasks: [
          { id: 'st-1', text: 'Design serene pastel lavender wellness theme', completed: true },
          { id: 'st-2', text: 'Implement live IST digital clock & time tracking', completed: true },
          { id: 'st-3', text: 'Build interactive timetable with current activity detector', completed: true },
          { id: 'st-4', text: 'Implement focus study timer with LocalStorage persistence', completed: true },
          { id: 'st-5', text: 'Create 10-stage AI/ML career roadmap tracker', completed: false }
        ]
      }
    ],
    roadmap: DEFAULT_ROADMAP_STAGES,
    activeTimer: {
      isRunning: false,
      startTime: null,
      accumulatedSeconds: 0,
      subject: 'Python Fundamentals',
      goal: ''
    },
    dismissedReminders: []
  };

  // State in Memory
  let appState = null;

  // Chart instances
  let weeklyChartInstance = null;
  let studyDistChartInstance = null;
  let tasksCatChartInstance = null;
  let roadmapChartInstance = null;

  // Web Audio Synthesizer
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playChime(type = 'success') {
    if (!appState || !appState.settings.soundEffects) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880.00, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'celebration') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        osc.frequency.setValueAtTime(1046.50, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'alert') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#7C3AED', '#EC4899', '#10B981', '#F59E0B']
        });
      } catch (err) {
        // ignore
      }
    }
  }

  // ==========================================================================
  // 2. HELPER UTILITIES
  // ==========================================================================
  function getTodayYMD() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getFutureYMD(daysAhead = 1) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        appState = Object.assign({}, DEFAULT_INITIAL_STATE, parsed);
        if (!appState.tasks) appState.tasks = DEFAULT_INITIAL_STATE.tasks;
        if (!appState.timetable) appState.timetable = DEFAULT_INITIAL_STATE.timetable;
        if (!appState.weekendTimetable) appState.weekendTimetable = DEFAULT_INITIAL_STATE.weekendTimetable;
        if (!appState.studySessions) appState.studySessions = [];
        if (!appState.customSubjects) appState.customSubjects = DEFAULT_SUBJECTS;
        if (!appState.projects) appState.projects = DEFAULT_INITIAL_STATE.projects;
        if (!appState.roadmap) appState.roadmap = DEFAULT_INITIAL_STATE.roadmap;
        if (!appState.activeTimer) appState.activeTimer = DEFAULT_INITIAL_STATE.activeTimer;
        if (!appState.settings) appState.settings = DEFAULT_INITIAL_STATE.settings;
        if (!appState.profile) appState.profile = DEFAULT_INITIAL_STATE.profile;
        if (!appState.dismissedReminders) appState.dismissedReminders = [];

        // Automatic seamless migration to Version 2 (Akash's updated 2026 timetable)
        if (!parsed.version || parsed.version < 2) {
          appState.version = 2;
          appState.timetable = JSON.parse(JSON.stringify(DEFAULT_WEEKDAY_TIMETABLE));
          appState.weekendTimetable = JSON.parse(JSON.stringify(DEFAULT_WEEKEND_TIMETABLE));
          if (appState.profile) {
            appState.profile.role = 'B.Tech CSE (AI & ML) • Web Dev Intern';
          }
          saveState();
        }
      } else {
        appState = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
        saveState();
      }
    } catch (e) {
      console.error('Error loading state from LocalStorage:', e);
      appState = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Failed to save state to LocalStorage:', e);
      showToast('Storage error: Could not save data', 'error');
    }
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'x-circle';

    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span style="font-size: 0.9rem; font-weight: 600;">${escapeHTML(message)}</span>
    `;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function parseTimeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  }

  function calculateDurationText(startTime, endTime) {
    if (!startTime || !endTime) return '';
    const start = parseTimeToMinutes(startTime);
    let end = parseTimeToMinutes(endTime);
    let diff = end - start;
    if (diff < 0) diff += 1440;
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    if (hours > 0 && mins > 0) {
      return `${hours} hr${hours > 1 ? 's' : ''} ${mins} min${mins > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hr${hours > 1 ? 's' : ''}`;
    } else {
      return `${mins} min${mins > 1 ? 's' : ''}`;
    }
  }

  function formatTimeDisplay(timeStr, is12h = true) {
    if (!timeStr) return '';
    const [hStr, mStr] = timeStr.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    if (!is12h) return `${String(h).padStart(2, '0')}:${m}`;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${m} ${ampm}`;
  }

  function getCategoryColor(category) {
    switch (category) {
      case 'Study & Skills':
        return '#7C3AED'; // Pastel Royal Purple
      case 'Health & Fitness':
        return '#10B981'; // Emerald Green
      case 'Morning Routine':
        return '#F59E0B'; // Sunrise Amber
      case 'College':
      case 'College classes & assignments':
      case 'College prep & travel':
        return '#3B82F6'; // Academic Blue
      case 'Internship':
      case 'Travel & office work':
        return '#0D9488'; // Teal
      case 'Personal Time':
      case 'Personal time':
      case 'Personal':
        return '#F43F5E'; // Coral Rose
      case 'Online Learning':
      case 'NxtWave':
        return '#8B5CF6'; // Amethyst Lavender
      case 'Projects & Content':
        return '#EA580C'; // Sunset Orange
      case 'Sleep':
      case 'Dinner and sleep':
        return '#6366F1'; // Midnight Indigo
      case 'Python learning':
      case 'Python':
        return '#7C3AED';
      case 'AI/ML learning':
      case 'AI/ML':
        return '#8B5CF6';
      case 'SQL practice':
      case 'SQL':
        return '#F59E0B';
      case 'Web development projects':
      case 'Web Development':
        return '#0284C7';
      default:
        return '#7C3AED';
    }
  }

  function getCategoryIcon(category) {
    switch (category) {
      case 'Study & Skills':
        return 'book-open';
      case 'Health & Fitness':
        return 'activity';
      case 'Morning Routine':
        return 'sunrise';
      case 'College':
      case 'College classes & assignments':
      case 'College prep & travel':
        return 'graduation-cap';
      case 'Internship':
      case 'Travel & office work':
        return 'briefcase';
      case 'Personal Time':
      case 'Personal time':
      case 'Personal':
        return 'smile';
      case 'Online Learning':
      case 'NxtWave':
        return 'monitor-play';
      case 'Projects & Content':
        return 'folder-code';
      case 'Sleep':
      case 'Dinner and sleep':
        return 'moon';
      case 'Python learning':
      case 'Python':
        return 'code';
      case 'SQL practice':
      case 'SQL':
        return 'database';
      case 'AI/ML learning':
      case 'AI/ML':
        return 'brain';
      case 'Web development projects':
      case 'Web Development':
        return 'laptop';
      default:
        return 'calendar';
    }
  }

  // ==========================================================================
  // 3. LIVE CLOCK (IST) & GREETING
  // ==========================================================================
  function updateLiveClock() {
    const now = new Date();
    const istTimeOptions = {
      timeZone: 'Asia/Kolkata',
      hour12: appState ? appState.settings.clock12h : true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const istDateOptions = {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };

    const timeString = new Intl.DateTimeFormat('en-IN', istTimeOptions).format(now);
    const dateString = new Intl.DateTimeFormat('en-IN', istDateOptions).format(now);

    const clockTimeEl = document.getElementById('liveClockTime');
    const clockDateEl = document.getElementById('liveClockDate');
    if (clockTimeEl) clockTimeEl.textContent = timeString;
    if (clockDateEl) clockDateEl.textContent = dateString;

    const istHourStr = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      hour12: false
    }).format(now);
    const istHour = parseInt(istHourStr, 10);

    let greeting = 'Hello, Akash! ☀️';
    if (istHour >= 5 && istHour < 12) {
      greeting = 'Good Morning, Akash! ☀️';
    } else if (istHour >= 12 && istHour < 17) {
      greeting = 'Good Afternoon, Akash! ☀️';
    } else if (istHour >= 17 && istHour < 22) {
      greeting = 'Good Evening, Akash! ☀️';
    } else {
      greeting = 'Good Night, Akash! 🌙';
    }

    const greetingEl = document.getElementById('welcomeGreeting');
    if (greetingEl) greetingEl.textContent = greeting;
  }

  // ==========================================================================
  // 4. CURRENT ACTIVITY DETECTOR
  // ==========================================================================
  function checkCurrentActivity() {
    if (!appState) return;

    const now = new Date();
    const dayOfWeek = now.getDay();
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const isHolidayMode = isWeekend && appState.settings.weekendHoliday;

    const weekendBanner = document.getElementById('weekendHolidayBanner');
    if (weekendBanner) {
      weekendBanner.style.display = isHolidayMode ? 'flex' : 'none';
    }

    const activeSchedule = isHolidayMode ? appState.weekendTimetable : appState.timetable;

    let istHour = parseInt(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false, hourCycle: 'h23' }).format(now), 10);
    if (istHour === 24) istHour = 0;
    const istMin = parseInt(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', minute: 'numeric' }).format(now), 10);
    const currentMins = istHour * 60 + istMin;

    let currentActivity = null;
    let nextActivity = null;
    let minDiffToNext = Infinity;

    if (activeSchedule && activeSchedule.length > 0) {
      for (let i = 0; i < activeSchedule.length; i++) {
        const item = activeSchedule[i];
        const start = parseTimeToMinutes(item.startTime);
        let end = parseTimeToMinutes(item.endTime);
        
        let isActive = false;
        if (end < start) {
          if (currentMins >= start || currentMins < end) isActive = true;
        } else {
          if (currentMins >= start && currentMins < end) isActive = true;
        }

        if (isActive) {
          currentActivity = item;
          nextActivity = activeSchedule[(i + 1) % activeSchedule.length];
          break;
        }

        let diff = start - currentMins;
        if (diff < 0) diff += 1440;
        if (diff < minDiffToNext) {
          minDiffToNext = diff;
          nextActivity = item;
        }
      }
    }

    const nameEl = document.getElementById('currentActivityName');
    const pillEl = document.getElementById('currentCategoryPill');
    const slotTimesEl = document.getElementById('currentSlotTimes');
    const remainingTextEl = document.getElementById('currentRemainingText');
    const barEl = document.getElementById('activityProgressBar');
    const pctEl = document.getElementById('activityElapsedPct');
    const timeLeftEl = document.getElementById('currentRemainingTime');
    const nextTitleEl = document.getElementById('nextActivityTitle');
    const statusBadge = document.getElementById('currentStatusBadge');

    if (currentActivity) {
      nameEl.textContent = currentActivity.name;
      pillEl.textContent = currentActivity.category;
      pillEl.style.backgroundColor = '#FFFFFF';
      pillEl.style.color = getCategoryColor(currentActivity.category);

      const startFormatted = formatTimeDisplay(currentActivity.startTime, appState.settings.clock12h);
      const endFormatted = formatTimeDisplay(currentActivity.endTime, appState.settings.clock12h);
      const durationText = calculateDurationText(currentActivity.startTime, currentActivity.endTime);
      slotTimesEl.textContent = `${startFormatted} – ${endFormatted} (${durationText})`;

      const start = parseTimeToMinutes(currentActivity.startTime);
      let end = parseTimeToMinutes(currentActivity.endTime);
      let totalMins = end - start;
      if (totalMins < 0) totalMins += 1440;

      let elapsedMins = currentMins - start;
      if (elapsedMins < 0) elapsedMins += 1440;

      const progressPct = Math.min(100, Math.max(0, Math.round((elapsedMins / totalMins) * 100)));
      const remainingMins = Math.max(0, totalMins - elapsedMins);

      barEl.style.width = `${progressPct}%`;
      pctEl.textContent = `${progressPct}%`;
      timeLeftEl.textContent = `${remainingMins} mins left`;
      remainingTextEl.textContent = `${remainingMins}m remaining in this session`;

      if (statusBadge) {
        statusBadge.innerHTML = `<span class="clock-live-indicator"></span> In Progress`;
        statusBadge.style.color = 'var(--primary)';
      }
    } else {
      if (isHolidayMode) {
        nameEl.textContent = 'Weekend Holiday & Leisure';
        pillEl.textContent = 'Holiday Mode';
        pillEl.style.backgroundColor = 'var(--success-light)';
        pillEl.style.color = 'var(--success)';
        slotTimesEl.textContent = 'All Day';
        remainingTextEl.textContent = 'Saturday & Sunday are holidays by default';
        barEl.style.width = '100%';
        pctEl.textContent = '100%';
        timeLeftEl.textContent = 'Recharge & Relax';
      } else {
        nameEl.textContent = 'Free Time / Break';
        pillEl.textContent = 'Open Slot';
        pillEl.style.backgroundColor = '#FFFFFF';
        pillEl.style.color = 'var(--text-secondary)';
        slotTimesEl.textContent = 'No active scheduled block';
        remainingTextEl.textContent = 'Perfect time for a quick break or self-study';
        barEl.style.width = '0%';
        pctEl.textContent = '0%';
        timeLeftEl.textContent = 'Free';
      }

      if (statusBadge) {
        statusBadge.innerHTML = `<span>☕</span> Free Time`;
        statusBadge.style.color = 'var(--text-secondary)';
      }
    }

    if (nextActivity) {
      const nextStart = formatTimeDisplay(nextActivity.startTime, appState.settings.clock12h);
      nextTitleEl.innerHTML = `<strong>${escapeHTML(nextActivity.name)}</strong> at ${nextStart} <span class="tag-badge" style="margin-left: 6px; font-size: 0.72rem;">${escapeHTML(nextActivity.category)}</span>`;
    } else {
      nextTitleEl.textContent = 'No further activities scheduled for today.';
    }
  }

  // ==========================================================================
  // 5. SUMMARY STATS CALCULATOR
  // ==========================================================================
  function updateSummaryStats() {
    if (!appState) return;

    const todayStr = getTodayYMD();

    const totalTasks = appState.tasks.length;
    const completedTasks = appState.tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const dayOfWeek = new Date().getDay();
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const activeSchedule = (isWeekend && appState.settings.weekendHoliday) ? appState.weekendTimetable : appState.timetable;

    const totalRoutine = activeSchedule.length;
    const completedRoutine = activeSchedule.filter(i => i.completedDate === todayStr).length;

    const combinedTotal = totalTasks + totalRoutine;
    const combinedCompleted = completedTasks + completedRoutine;
    const completionRate = combinedTotal > 0 ? Math.round((combinedCompleted / combinedTotal) * 100) : 0;

    const totalEl = document.getElementById('statTotalTasks');
    const compEl = document.getElementById('statCompletedTasks');
    const pendEl = document.getElementById('statPendingTasks');
    const rateEl = document.getElementById('statCompletionRate');
    const badgeEl = document.getElementById('pendingTasksBadge');

    if (totalEl) totalEl.textContent = totalTasks;
    if (compEl) compEl.textContent = completedTasks;
    if (pendEl) pendEl.textContent = pendingTasks;
    if (rateEl) rateEl.textContent = `${completionRate}%`;
    if (badgeEl) badgeEl.textContent = pendingTasks;
  }

  // ==========================================================================
  // 6. DAILY ROUTINE TIMELINE RENDERING
  // ==========================================================================
  let routineFilterActiveOnly = false;

  function renderRoutineTimelines() {
    const todayStr = getTodayYMD();
    const dayOfWeek = new Date().getDay();
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const activeSchedule = (isWeekend && appState.settings.weekendHoliday) ? appState.weekendTimetable : appState.timetable;

    const now = new Date();
    let istHour = parseInt(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false, hourCycle: 'h23' }).format(now), 10);
    if (istHour === 24) istHour = 0;
    const istMin = parseInt(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', minute: 'numeric' }).format(now), 10);
    const currentMins = istHour * 60 + istMin;

    const fullContainer = document.getElementById('fullTimelineContainer');
    const dashContainer = document.getElementById('dashboardTimelinePreview');

    if (!fullContainer && !dashContainer) return;

    if (!activeSchedule || activeSchedule.length === 0) {
      const emptyHTML = `
        <div class="empty-state">
          <i data-lucide="calendar" class="empty-state-icon"></i>
          <h4>No activities configured</h4>
          <p>Click "+ Add Activity" to set up your custom routine.</p>
        </div>
      `;
      if (fullContainer) fullContainer.innerHTML = emptyHTML;
      if (dashContainer) dashContainer.innerHTML = emptyHTML;
      if (window.lucide) lucide.createIcons();
      return;
    }

    let itemsHTML = '';

    activeSchedule.forEach((item, index) => {
      const isCompleted = (item.completedDate === todayStr);

      const start = parseTimeToMinutes(item.startTime);
      let end = parseTimeToMinutes(item.endTime);
      let isActiveNow = false;
      if (end < start) {
        if (currentMins >= start || currentMins < end) isActiveNow = true;
      } else {
        if (currentMins >= start && currentMins < end) isActiveNow = true;
      }

      if (routineFilterActiveOnly && !isActiveNow && isCompleted) {
        return;
      }

      const iconName = getCategoryIcon(item.category);
      const catColor = getCategoryColor(item.category);
      const startFmt = formatTimeDisplay(item.startTime, appState.settings.clock12h);
      const endFmt = formatTimeDisplay(item.endTime, appState.settings.clock12h);
      const durationText = calculateDurationText(item.startTime, item.endTime);
      const indexNumber = String(index + 1).padStart(2, '0');

      itemsHTML += `
        <div class="timeline-item ${isCompleted ? 'completed' : ''} ${isActiveNow ? 'active-now' : ''}" data-id="${item.id}">
          <div class="timeline-node" style="border-color: ${catColor}; color: ${catColor};">
            <span style="font-size: 0.85rem; font-weight: 800; font-family: var(--font-heading);">${indexNumber}</span>
          </div>

          <div class="timeline-card">
            <div class="timeline-card-header">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="timeline-time-badge">
                  <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
                  ${startFmt} – ${endFmt}
                </span>
                <span class="timeline-duration-badge" style="color: ${catColor}; background: ${catColor}15;">
                  <i data-lucide="hourglass" style="width: 13px; height: 13px;"></i>
                  ${durationText}
                </span>
              </div>
              <div class="timeline-actions">
                ${isActiveNow ? '<span class="tag-badge" style="background: var(--primary); color: #FFFFFF; font-weight: 700;">Active Now</span>' : ''}
                <button class="btn-icon btn-sm edit-activity-btn" data-id="${item.id}" title="Edit Activity">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn-icon btn-sm delete-activity-btn" data-id="${item.id}" title="Delete Activity" style="color: var(--danger);">
                  <i data-lucide="trash"></i>
                </button>
              </div>
            </div>

            <h4 class="timeline-title">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: ${catColor}15; color: ${catColor}; flex-shrink: 0;">
                <i data-lucide="${iconName}" style="width: 18px; height: 18px;"></i>
              </span>
              <span>${escapeHTML(item.name)}</span>
              <span class="tag-badge" style="background: ${catColor}15; color: ${catColor}; font-size: 0.74rem; font-weight: 700; margin-left: auto;">
                ${escapeHTML(item.category)}
              </span>
            </h4>

            ${item.description ? `<p class="timeline-desc">${escapeHTML(item.description)}</p>` : ''}

            <div class="timeline-footer">
              <label class="custom-checkbox">
                <input type="checkbox" class="routine-check" data-id="${item.id}" ${isCompleted ? 'checked' : ''}>
                <span class="checkbox-mark"></span>
                <span>Mark completed for today</span>
              </label>

              ${item.notes ? `<span style="color: var(--text-muted); font-size: 0.8rem;"><i data-lucide="file-text" style="width: 14px; height: 14px; vertical-align: middle;"></i> ${escapeHTML(item.notes)}</span>` : ''}
            </div>
          </div>
        </div>
      `;
    });

    // Update dynamic routine progress indicators
    const totalRoutine = activeSchedule.length;
    const completedRoutine = activeSchedule.filter(i => i.completedDate === todayStr).length;
    const routinePct = totalRoutine > 0 ? Math.round((completedRoutine / totalRoutine) * 100) : 0;

    const dashBadge = document.getElementById('dashboardRoutineProgressBadge');
    if (dashBadge) {
      dashBadge.textContent = `${completedRoutine} / ${totalRoutine} Completed (${routinePct}%)`;
    }

    const routineProgressText = document.getElementById('routineSectionProgressText');
    const routineProgressBar = document.getElementById('routineSectionProgressBar');
    if (routineProgressText) {
      routineProgressText.textContent = `${completedRoutine} / ${totalRoutine} Activities Done (${routinePct}%)`;
    }
    if (routineProgressBar) {
      routineProgressBar.style.width = `${routinePct}%`;
    }

    if (fullContainer) fullContainer.innerHTML = itemsHTML;
    if (dashContainer) dashContainer.innerHTML = itemsHTML;

    if (window.lucide) lucide.createIcons();
    attachRoutineEventListeners();
  }

  function attachRoutineEventListeners() {
    document.querySelectorAll('.routine-check').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const isChecked = e.target.checked;
        const todayStr = getTodayYMD();

        const dayOfWeek = new Date().getDay();
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const list = (isWeekend && appState.settings.weekendHoliday) ? appState.weekendTimetable : appState.timetable;

        const item = list.find(x => x.id === id);
        if (item) {
          item.completedDate = isChecked ? todayStr : null;
          saveState();
          updateSummaryStats();
          renderRoutineTimelines();
          checkCurrentActivity();

          if (isChecked) {
            playChime('celebration');
            triggerConfetti();
            showToast(`Completed: ${item.name}`, 'success');
          }
        }
      });
    });

    document.querySelectorAll('.edit-activity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        openActivityModal(id);
      });
    });

    document.querySelectorAll('.delete-activity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        openConfirmModal('Delete Routine Activity', 'Are you sure you want to remove this activity from your timetable?', () => {
          const dayOfWeek = new Date().getDay();
          const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
          if (isWeekend && appState.settings.weekendHoliday) {
            appState.weekendTimetable = appState.weekendTimetable.filter(x => x.id !== id);
          } else {
            appState.timetable = appState.timetable.filter(x => x.id !== id);
          }
          saveState();
          renderRoutineTimelines();
          checkCurrentActivity();
          updateSummaryStats();
          showToast('Activity deleted', 'info');
        });
      });
    });
  }

  // ==========================================================================
  // 7. WEEKLY PLANNER VIEW
  // ==========================================================================
  let selectedWeekDay = new Date().getDay();

  function initWeeklyPlanner() {
    const tabsContainer = document.getElementById('weekTabsContainer');
    if (!tabsContainer) return;

    tabsContainer.querySelectorAll('.week-tab-btn').forEach(btn => {
      const dayNum = parseInt(btn.getAttribute('data-day'), 10);
      btn.classList.toggle('active', dayNum === selectedWeekDay);

      btn.onclick = () => {
        selectedWeekDay = dayNum;
        tabsContainer.querySelectorAll('.week-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderWeeklyPlannerDay();
      };
    });

    renderWeeklyPlannerDay();
  }

  function renderWeeklyPlannerDay() {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const titleEl = document.getElementById('weeklySelectedDayTitle');
    const bannerEl = document.getElementById('weeklyHolidayBanner');
    const scheduleContainer = document.getElementById('weeklyDayScheduleList');

    if (titleEl) titleEl.textContent = `Schedule for ${dayNames[selectedWeekDay]}`;

    const isWeekend = (selectedWeekDay === 0 || selectedWeekDay === 6);

    if (bannerEl) {
      bannerEl.style.display = isWeekend ? 'flex' : 'none';
    }

    const schedule = isWeekend ? appState.weekendTimetable : appState.timetable;

    if (!schedule || schedule.length === 0) {
      scheduleContainer.innerHTML = `
        <div class="empty-state">
          <i data-lucide="coffee" class="empty-state-icon"></i>
          <h4>No activities scheduled for this day</h4>
          <p>Enjoy your free time or add custom tasks using the button above.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    let html = '';
    schedule.forEach((item, idx) => {
      const catColor = getCategoryColor(item.category);
      const iconName = getCategoryIcon(item.category);
      const startFmt = formatTimeDisplay(item.startTime, appState.settings.clock12h);
      const endFmt = formatTimeDisplay(item.endTime, appState.settings.clock12h);
      const durationText = calculateDurationText(item.startTime, item.endTime);
      const indexNumber = String(idx + 1).padStart(2, '0');

      html += `
        <div class="timeline-item" data-id="${item.id}">
          <div class="timeline-node" style="border-color: ${catColor}; color: ${catColor};">
            <span style="font-size: 0.85rem; font-weight: 800;">${indexNumber}</span>
          </div>
          <div class="timeline-card">
            <div class="timeline-card-header">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="timeline-time-badge">${startFmt} – ${endFmt}</span>
                <span class="timeline-duration-badge" style="color: ${catColor}; background: ${catColor}15;">
                  <i data-lucide="hourglass" style="width: 12px; height: 12px;"></i>
                  ${durationText}
                </span>
              </div>
              <span class="tag-badge" style="background: ${catColor}15; color: ${catColor}; font-weight: 700;">${escapeHTML(item.category)}</span>
            </div>
            <h4 class="timeline-title">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: ${catColor}15; color: ${catColor}; flex-shrink: 0;">
                <i data-lucide="${iconName}" style="width: 16px; height: 16px;"></i>
              </span>
              ${escapeHTML(item.name)}
            </h4>
            ${item.description ? `<p class="timeline-desc">${escapeHTML(item.description)}</p>` : ''}
          </div>
        </div>
      `;
    });

    scheduleContainer.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }

  // ==========================================================================
  // 8. TASK MANAGER
  // ==========================================================================
  let currentTaskStatusFilter = 'all';
  let currentTaskCategoryFilter = 'all';
  let currentTaskPriorityFilter = 'all';
  let currentTaskSearchQuery = '';

  function renderTasks() {
    const grid = document.getElementById('tasksListGrid');
    const quickList = document.getElementById('dashboardQuickTasksList');
    if (!grid && !quickList) return;

    const todayStr = getTodayYMD();

    let filtered = appState.tasks.filter(task => {
      if (currentTaskStatusFilter === 'today' && task.dueDate !== todayStr) return false;
      if (currentTaskStatusFilter === 'pending' && task.completed) return false;
      if (currentTaskStatusFilter === 'completed' && !task.completed) return false;
      if (currentTaskStatusFilter === 'overdue' && (task.completed || !task.dueDate || task.dueDate >= todayStr)) return false;

      if (currentTaskCategoryFilter !== 'all' && task.category !== currentTaskCategoryFilter) return false;
      if (currentTaskPriorityFilter !== 'all' && task.priority !== currentTaskPriorityFilter) return false;

      if (currentTaskSearchQuery) {
        const query = currentTaskSearchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      return true;
    });

    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <i data-lucide="check-circle-2" class="empty-state-icon"></i>
            <h4>No tasks found</h4>
            <p>Try adjusting your search filters or click "+ Add New Task" to create one.</p>
          </div>
        `;
      } else {
        grid.innerHTML = filtered.map(task => {
          const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
          const isToday = task.dueDate === todayStr;

          let dueClass = '';
          let dueLabel = task.dueDate || 'No date';
          if (isOverdue) {
            dueClass = 'overdue';
            dueLabel = `Overdue (${task.dueDate})`;
          } else if (isToday) {
            dueClass = 'today';
            dueLabel = 'Due Today';
          }

          const catColor = getCategoryColor(task.category);

          return `
            <div class="task-card priority-${(task.priority || 'medium').toLowerCase()} ${task.completed ? 'completed' : ''}" data-id="${task.id}">
              <div>
                <div class="task-header">
                  <label class="custom-checkbox">
                    <input type="checkbox" class="task-check-toggle" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                    <span class="checkbox-mark"></span>
                  </label>
                  <h4 class="task-title">${escapeHTML(task.title)}</h4>
                </div>

                ${task.description ? `<p class="task-desc">${escapeHTML(task.description)}</p>` : ''}

                <div class="task-tags">
                  <span class="tag-badge" style="background: ${catColor}15; color: ${catColor}; font-weight: 700;">
                    ${escapeHTML(task.category)}
                  </span>
                  <span class="tag-badge" style="font-weight: 700;">
                    ${escapeHTML(task.priority)} Priority
                  </span>
                </div>
              </div>

              <div class="task-footer">
                <span class="due-date-badge ${dueClass}">
                  <i data-lucide="calendar"></i>
                  ${dueLabel}
                </span>

                <div style="display: flex; gap: 0.35rem;">
                  <button class="btn-icon btn-sm edit-task-btn" data-id="${task.id}" title="Edit Task">
                    <i data-lucide="edit-2"></i>
                  </button>
                  <button class="btn-icon btn-sm delete-task-btn" data-id="${task.id}" title="Delete Task" style="color: var(--danger);">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (quickList) {
      const priorityTasks = appState.tasks
        .filter(t => !t.completed)
        .slice(0, 4);

      if (priorityTasks.length === 0) {
        quickList.innerHTML = `
          <div style="text-align: center; padding: 1.5rem; color: var(--text-muted);">
            <i data-lucide="smile" style="width: 36px; height: 36px; margin-bottom: 0.5rem; color: var(--success);"></i>
            <p style="font-size: 0.95rem; font-weight: 600;">All priority tasks completed for today! Awesome job Akash.</p>
          </div>
        `;
      } else {
        quickList.innerHTML = priorityTasks.map(task => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.15rem; background: var(--pastel-lavender); border-radius: var(--radius-md); border-left: 4px solid ${getCategoryColor(task.category)};">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <label class="custom-checkbox">
                <input type="checkbox" class="task-check-toggle" data-id="${task.id}">
                <span class="checkbox-mark"></span>
              </label>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">${escapeHTML(task.title)}</div>
                <div style="font-size: 0.76rem; color: var(--text-secondary);">${escapeHTML(task.category)} • Due ${task.dueDate || 'Today'}</div>
              </div>
            </div>
            <span class="tag-badge" style="font-size: 0.72rem;">${escapeHTML(task.priority)}</span>
          </div>
        `).join('');
      }
    }

    if (window.lucide) lucide.createIcons();
    attachTaskEventListeners();
  }

  function attachTaskEventListeners() {
    document.querySelectorAll('.task-check-toggle').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = chk.getAttribute('data-id');
        const task = appState.tasks.find(t => t.id === id);
        if (task) {
          task.completed = chk.checked;
          task.completedAt = chk.checked ? new Date().toISOString() : null;
          saveState();
          updateSummaryStats();
          renderTasks();

          if (chk.checked) {
            playChime('celebration');
            triggerConfetti();
            showToast(`Task completed: ${task.title}`, 'success');
          }
        }
      });
    });

    document.querySelectorAll('.edit-task-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openTaskModal(id);
      });
    });

    document.querySelectorAll('.delete-task-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openConfirmModal('Delete Task', 'Are you sure you want to delete this task?', () => {
          appState.tasks = appState.tasks.filter(t => t.id !== id);
          saveState();
          updateSummaryStats();
          renderTasks();
          showToast('Task removed', 'info');
        });
      });
    });
  }

  function openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const form = document.getElementById('taskForm');
    const titleEl = document.getElementById('taskModalTitle');
    if (!modal || !form) return;

    form.reset();

    if (taskId) {
      const task = appState.tasks.find(t => t.id === taskId);
      if (task) {
        titleEl.textContent = 'Edit Task';
        document.getElementById('taskIdInput').value = task.id;
        document.getElementById('taskTitleInput').value = task.title;
        document.getElementById('taskCategorySelect').value = task.category;
        document.getElementById('taskPrioritySelect').value = task.priority || 'Medium';
        document.getElementById('taskDueDateInput').value = task.dueDate || '';
        document.getElementById('taskDescriptionInput').value = task.description || '';
      }
    } else {
      titleEl.textContent = 'Add New Task';
      document.getElementById('taskIdInput').value = '';
      document.getElementById('taskDueDateInput').value = getTodayYMD();
    }

    modal.classList.add('active');
  }

  // ==========================================================================
  // 9. STUDY TRACKER & FOCUS TIMER ENGINE
  // ==========================================================================
  let timerInterval = null;

  function initStudyTracker() {
    renderStudySubjects();
    renderStudySessionsHistory();
    initTimerFromState();

    const subjectSelect = document.getElementById('timerSubjectSelect');
    if (subjectSelect) {
      subjectSelect.innerHTML = appState.customSubjects.map(sub => `
        <option value="${escapeHTML(sub)}" ${sub === appState.activeTimer.subject ? 'selected' : ''}>
          ${escapeHTML(sub)}
        </option>
      `).join('');

      subjectSelect.addEventListener('change', (e) => {
        appState.activeTimer.subject = e.target.value;
        const badge = document.getElementById('timerSubjectBadge');
        if (badge) badge.textContent = e.target.value;
        saveState();
      });
    }

    const goalInput = document.getElementById('timerGoalInput');
    if (goalInput) {
      goalInput.value = appState.activeTimer.goal || '';
      goalInput.addEventListener('input', (e) => {
        appState.activeTimer.goal = e.target.value;
        saveState();
      });
    }

    const startStopBtn = document.getElementById('startStopTimerBtn');
    const resetBtn = document.getElementById('resetTimerBtn');
    const logBtn = document.getElementById('logSessionBtn');

    if (startStopBtn) startStopBtn.addEventListener('click', toggleTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);
    if (logBtn) logBtn.addEventListener('click', logStudySession);
  }

  function initTimerFromState() {
    if (appState.activeTimer.isRunning && appState.activeTimer.startTime) {
      startTimerInterval();
    } else {
      updateTimerDisplay(appState.activeTimer.accumulatedSeconds || 0);
    }
    updateTimerButtonUI();
  }

  function toggleTimer() {
    initAudio();
    if (appState.activeTimer.isRunning) {
      const now = Date.now();
      const elapsed = Math.floor((now - appState.activeTimer.startTime) / 1000);
      appState.activeTimer.accumulatedSeconds += elapsed;
      appState.activeTimer.isRunning = false;
      appState.activeTimer.startTime = null;
      clearInterval(timerInterval);
      showToast('Study timer paused', 'info');
    } else {
      appState.activeTimer.isRunning = true;
      appState.activeTimer.startTime = Date.now();
      startTimerInterval();
      showToast('Focus session started! Good luck, Akash.', 'success');
      playChime('success');
    }
    saveState();
    updateTimerButtonUI();
  }

  function startTimerInterval() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const now = Date.now();
      const sessionSeconds = Math.floor((now - appState.activeTimer.startTime) / 1000);
      const totalSeconds = (appState.activeTimer.accumulatedSeconds || 0) + sessionSeconds;
      updateTimerDisplay(totalSeconds);
    }, 1000);
  }

  function resetTimer() {
    openConfirmModal('Reset Timer', 'Are you sure you want to reset the study timer back to zero?', () => {
      clearInterval(timerInterval);
      appState.activeTimer.isRunning = false;
      appState.activeTimer.startTime = null;
      appState.activeTimer.accumulatedSeconds = 0;
      saveState();
      updateTimerDisplay(0);
      updateTimerButtonUI();
      showToast('Timer reset', 'info');
    });
  }

  function logStudySession() {
    let currentSeconds = appState.activeTimer.accumulatedSeconds || 0;
    if (appState.activeTimer.isRunning && appState.activeTimer.startTime) {
      currentSeconds += Math.floor((Date.now() - appState.activeTimer.startTime) / 1000);
    }

    const durationMins = Math.round(currentSeconds / 60);

    if (durationMins < 1) {
      showToast('Session too short to log (less than 1 minute). Keep learning!', 'warning');
      return;
    }

    const subject = document.getElementById('timerSubjectSelect').value || 'General Study';
    const goal = document.getElementById('timerGoalInput').value || 'Focus learning session';

    openConfirmModal('Log Completed Study Session', `Log ${durationMins} minutes of study for ${subject}?`, () => {
      const sessionRecord = {
        id: 'sess-' + Date.now(),
        subject: subject,
        goal: goal,
        durationMinutes: durationMins,
        timestamp: new Date().toISOString()
      };

      appState.studySessions.unshift(sessionRecord);

      clearInterval(timerInterval);
      appState.activeTimer.isRunning = false;
      appState.activeTimer.startTime = null;
      appState.activeTimer.accumulatedSeconds = 0;
      appState.activeTimer.goal = '';

      saveState();
      updateTimerDisplay(0);
      updateTimerButtonUI();
      renderStudySessionsHistory();
      if (document.getElementById('timerGoalInput')) {
        document.getElementById('timerGoalInput').value = '';
      }

      playChime('celebration');
      triggerConfetti();
      showToast(`Logged ${durationMins}m study session for ${subject}!`, 'success');
    });
  }

  function updateTimerDisplay(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const formatted = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const displayEl = document.getElementById('studyTimerDisplay');
    if (displayEl) displayEl.textContent = formatted;
  }

  function updateTimerButtonUI() {
    const icon = document.getElementById('timerActionIcon');
    if (icon) {
      icon.setAttribute('data-lucide', appState.activeTimer.isRunning ? 'pause' : 'play');
      if (window.lucide) lucide.createIcons();
    }
  }

  function renderStudySessionsHistory() {
    const container = document.getElementById('studySessionsHistoryList');
    const todayTotalBadge = document.getElementById('todayStudyTotalHours');
    if (!container) return;

    const todayStr = getTodayYMD();

    let todayMinutes = 0;
    appState.studySessions.forEach(s => {
      if (s.timestamp && s.timestamp.startsWith(todayStr)) {
        todayMinutes += (s.durationMinutes || 0);
      }
    });

    if (todayTotalBadge) {
      todayTotalBadge.textContent = `Today: ${(todayMinutes / 60).toFixed(1)} hrs`;
    }

    if (!appState.studySessions || appState.studySessions.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 2rem 1rem;">
          <i data-lucide="book-open" class="empty-state-icon"></i>
          <h4>No study sessions logged yet</h4>
          <p>Start the study timer to track your learning journey.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = appState.studySessions.slice(0, 10).map(s => {
      const date = new Date(s.timestamp).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      const catColor = getCategoryColor(s.subject);

      return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.95rem 1.15rem; background: var(--pastel-lavender); border-radius: var(--radius-md); border-left: 4px solid ${catColor};">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
              <span style="font-weight: 700; font-size: 0.98rem; color: var(--text-main);">${escapeHTML(s.subject)}</span>
              <span class="tag-badge" style="background: #FFFFFF; color: var(--primary); font-size: 0.74rem;">${s.durationMinutes} mins</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">${escapeHTML(s.goal || 'General Study')}</div>
            <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 0.2rem;">${date}</div>
          </div>
          <button class="btn-icon btn-sm delete-session-btn" data-id="${s.id}" title="Delete Log" style="color: var(--danger);">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();

    container.querySelectorAll('.delete-session-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openConfirmModal('Delete Study Log', 'Are you sure you want to remove this logged session?', () => {
          appState.studySessions = appState.studySessions.filter(s => s.id !== id);
          saveState();
          renderStudySessionsHistory();
          showToast('Session record deleted', 'info');
        });
      });
    });
  }

  function renderStudySubjects() {
    const list = document.getElementById('curriculumSubjectsList');
    if (!list) return;

    list.innerHTML = appState.customSubjects.map(sub => {
      const totalMins = appState.studySessions
        .filter(s => s.subject === sub)
        .reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
      const hours = (totalMins / 60).toFixed(1);

      return `
        <div class="subject-item-card">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${getCategoryColor(sub)};"></div>
            <div>
              <div style="font-weight: 700; font-size: 0.98rem; color: var(--text-main);">${escapeHTML(sub)}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${hours} hours logged</div>
            </div>
          </div>
          <button class="btn-icon btn-sm" onclick="startTimerWithSubject('${escapeHTML(sub)}')">
            <i data-lucide="play"></i>
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  window.startTimerWithSubject = function (subName) {
    const subjectSelect = document.getElementById('timerSubjectSelect');
    if (subjectSelect) subjectSelect.value = subName;
    appState.activeTimer.subject = subName;
    saveState();
    window.location.hash = '#study';
    showToast(`Timer subject set to ${subName}`, 'info');
  };

  // ==========================================================================
  // 10. WEB DEVELOPMENT & PROJECT TRACKER
  // ==========================================================================
  function renderProjects() {
    const grid = document.getElementById('projectsListGrid');
    if (!grid) return;

    if (!appState.projects || appState.projects.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i data-lucide="folder-code" class="empty-state-icon"></i>
          <h4>No projects registered yet</h4>
          <p>Click "+ Add New Project" to start tracking your development builds.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    grid.innerHTML = appState.projects.map(proj => {
      const subtasks = proj.subtasks || [];
      const completedSubtasks = subtasks.filter(st => st.completed).length;
      const progress = subtasks.length > 0 ? Math.round((completedSubtasks / subtasks.length) * 100) : 0;

      const techPills = (proj.techStack || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
        .map(t => `<span class="tech-pill">${escapeHTML(t)}</span>`)
        .join('');

      return `
        <div class="project-card" data-id="${proj.id}">
          <div>
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.65rem;">
              <span class="project-category-badge">${escapeHTML(proj.category)}</span>
              <span class="tag-badge" style="font-weight: 700; background: ${proj.status === 'Completed' ? 'var(--success-light)' : 'var(--primary-light)'}; color: ${proj.status === 'Completed' ? 'var(--success)' : 'var(--primary)'};">
                ${escapeHTML(proj.status)}
              </span>
            </div>

            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.4rem; color: var(--text-main);">${escapeHTML(proj.name)}</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.85rem;">${escapeHTML(proj.description || '')}</p>

            <div class="project-tech-pills">${techPills}</div>

            <div style="margin: 1.15rem 0;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                <span>Subtask Progress</span>
                <span><strong>${completedSubtasks}/${subtasks.length}</strong> (${progress}%)</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${progress}%;"></div>
              </div>
            </div>

            <div class="project-subtasks">
              ${subtasks.map(st => `
                <label class="custom-checkbox project-subtask-item">
                  <input type="checkbox" class="proj-subtask-check" data-proj-id="${proj.id}" data-st-id="${st.id}" ${st.completed ? 'checked' : ''}>
                  <span class="checkbox-mark"></span>
                  <span style="${st.completed ? 'text-decoration: line-through; opacity: 0.7;' : ''}">${escapeHTML(st.text)}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border-subtle); margin-top: 1rem;">
            <span style="font-size: 0.78rem; color: var(--text-muted);">
              <i data-lucide="calendar" style="width: 14px; height: 14px; vertical-align: middle;"></i> Target: ${proj.targetDate || 'Flexible'}
            </span>

            <div style="display: flex; gap: 0.35rem;">
              <button class="btn-icon btn-sm edit-project-btn" data-id="${proj.id}" title="Edit Project">
                <i data-lucide="edit-2"></i>
              </button>
              <button class="btn-icon btn-sm delete-project-btn" data-id="${proj.id}" title="Delete Project" style="color: var(--danger);">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
    attachProjectEventListeners();
  }

  function attachProjectEventListeners() {
    document.querySelectorAll('.proj-subtask-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const projId = chk.getAttribute('data-proj-id');
        const stId = chk.getAttribute('data-st-id');
        const proj = appState.projects.find(p => p.id === projId);
        if (proj) {
          const st = proj.subtasks.find(s => s.id === stId);
          if (st) {
            st.completed = chk.checked;
            saveState();
            renderProjects();
            if (chk.checked) {
              playChime('success');
            }
          }
        }
      });
    });

    document.querySelectorAll('.edit-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
      });
    });

    document.querySelectorAll('.delete-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openConfirmModal('Delete Project', 'Are you sure you want to remove this project?', () => {
          appState.projects = appState.projects.filter(p => p.id !== id);
          saveState();
          renderProjects();
          showToast('Project removed', 'info');
        });
      });
    });
  }

  function openProjectModal(projectId = null) {
    const modal = document.getElementById('projectModal');
    const form = document.getElementById('projectForm');
    const titleEl = document.getElementById('projectModalTitle');
    if (!modal || !form) return;

    form.reset();

    if (projectId) {
      const proj = appState.projects.find(p => p.id === projectId);
      if (proj) {
        titleEl.textContent = 'Edit Project';
        document.getElementById('projectIdInput').value = proj.id;
        document.getElementById('projectNameInput').value = proj.name;
        document.getElementById('projectCategorySelect').value = proj.category;
        document.getElementById('projectStatusSelect').value = proj.status;
        document.getElementById('projectTechInput').value = proj.techStack || '';
        document.getElementById('projectStartDate').value = proj.startDate || '';
        document.getElementById('projectTargetDate').value = proj.targetDate || '';
        document.getElementById('projectDescInput').value = proj.description || '';
        document.getElementById('projectSubtasksInput').value = (proj.subtasks || []).map(s => s.text).join('\n');
      }
    } else {
      titleEl.textContent = 'Add Web Project';
      document.getElementById('projectIdInput').value = '';
      document.getElementById('projectStartDate').value = getTodayYMD();
      document.getElementById('projectTargetDate').value = getFutureYMD(14);
    }

    modal.classList.add('active');
  }

  // ==========================================================================
  // 11. AI/ML CAREER ROADMAP
  // ==========================================================================
  function renderRoadmap() {
    const container = document.getElementById('roadmapStagesContainer');
    const overallProgressBadge = document.getElementById('roadmapOverallProgress');
    if (!container) return;

    let totalChecklistItems = 0;
    let completedChecklistItems = 0;

    const html = appState.roadmap.map((stage, idx) => {
      const topics = stage.topics || [];
      const stageDone = topics.filter(t => t.done).length;
      totalChecklistItems += topics.length;
      completedChecklistItems += stageDone;

      const stagePct = topics.length > 0 ? Math.round((stageDone / topics.length) * 100) : 0;
      const statusClass = (stage.status || 'Not Started').toLowerCase().replace(' ', '-');

      return `
        <div class="roadmap-stage-card stage-${statusClass}" data-stage-id="${stage.id}">
          <div class="stage-header">
            <div>
              <span class="stage-badge ${statusClass}">${escapeHTML(stage.status)}</span>
              <h3 class="stage-title" style="margin-top: 0.35rem;">${escapeHTML(stage.title)}</h3>
            </div>
            
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <select class="form-select stage-status-select" data-stage-id="${stage.id}" style="padding: 0.4rem 0.85rem; font-size: 0.84rem; min-width: 145px; border-radius: var(--radius-full);">
                <option value="Not Started" ${stage.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                <option value="In Progress" ${stage.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${stage.status === 'Completed' ? 'selected' : ''}>Completed</option>
              </select>
              <span class="tag-badge" style="font-weight: 700; font-size: 0.85rem;">${stagePct}% Done</span>
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${stagePct}%;"></div>
          </div>

          <div style="margin: 1rem 0;">
            <label class="form-label" style="font-size: 0.8rem;">Personal Stage Goals:</label>
            <input type="text" class="form-input stage-goals-input" data-stage-id="${stage.id}" value="${escapeHTML(stage.goals || '')}" placeholder="What do you plan to build or solve in this stage?">
          </div>

          <div class="stage-topics-checklist">
            ${topics.map((t, tIdx) => `
              <label class="custom-checkbox stage-topic-item">
                <input type="checkbox" class="roadmap-topic-check" data-stage-id="${stage.id}" data-topic-idx="${tIdx}" ${t.done ? 'checked' : ''}>
                <span class="checkbox-mark"></span>
                <span>${escapeHTML(t.text)}</span>
              </label>
            `).join('')}
          </div>

          <div style="margin-top: 0.85rem;">
            <label class="form-label" style="font-size: 0.8rem;">Learning Notes & Resources:</label>
            <textarea class="form-textarea stage-notes-input" data-stage-id="${stage.id}" placeholder="Key equations, GitHub repos, documentation links..." style="min-height: 60px;">${escapeHTML(stage.notes || '')}</textarea>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;

    const overallPct = totalChecklistItems > 0 ? Math.round((completedChecklistItems / totalChecklistItems) * 100) : 0;
    if (overallProgressBadge) {
      overallProgressBadge.textContent = `Roadmap Progress: ${overallPct}% (${completedChecklistItems}/${totalChecklistItems} topics)`;
    }

    if (window.lucide) lucide.createIcons();
    attachRoadmapEventListeners();
  }

  function attachRoadmapEventListeners() {
    document.querySelectorAll('.roadmap-topic-check').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const stageId = chk.getAttribute('data-stage-id');
        const topicIdx = parseInt(chk.getAttribute('data-topic-idx'), 10);
        const stage = appState.roadmap.find(s => s.id === stageId);
        if (stage && stage.topics[topicIdx]) {
          stage.topics[topicIdx].done = chk.checked;
          const allDone = stage.topics.every(t => t.done);
          if (allDone) {
            stage.status = 'Completed';
            playChime('celebration');
            triggerConfetti();
          } else if (stage.topics.some(t => t.done) && stage.status === 'Not Started') {
            stage.status = 'In Progress';
          }
          saveState();
          renderRoadmap();
        }
      });
    });

    document.querySelectorAll('.stage-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const stageId = sel.getAttribute('data-stage-id');
        const stage = appState.roadmap.find(s => s.id === stageId);
        if (stage) {
          stage.status = e.target.value;
          saveState();
          renderRoadmap();
        }
      });
    });

    document.querySelectorAll('.stage-goals-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const stageId = input.getAttribute('data-stage-id');
        const stage = appState.roadmap.find(s => s.id === stageId);
        if (stage) {
          stage.goals = e.target.value;
          saveState();
        }
      });
    });

    document.querySelectorAll('.stage-notes-input').forEach(textarea => {
      textarea.addEventListener('change', (e) => {
        const stageId = textarea.getAttribute('data-stage-id');
        const stage = appState.roadmap.find(s => s.id === stageId);
        if (stage) {
          stage.notes = e.target.value;
          saveState();
        }
      });
    });
  }

  // ==========================================================================
  // 12. CALENDAR & REMINDERS VIEW
  // ==========================================================================
  let calendarCurrentDate = new Date();
  let calendarSelectedDateStr = getTodayYMD();

  function initCalendar() {
    renderCalendar();

    const prevBtn = document.getElementById('prevMonthBtn');
    const nextBtn = document.getElementById('nextMonthBtn');
    const todayBtn = document.getElementById('todayMonthBtn');

    if (prevBtn) {
      prevBtn.onclick = () => {
        calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
        renderCalendar();
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
        renderCalendar();
      };
    }
    if (todayBtn) {
      todayBtn.onclick = () => {
        calendarCurrentDate = new Date();
        calendarSelectedDateStr = getTodayYMD();
        renderCalendar();
      };
    }

    renderRemindersList();
  }

  function renderCalendar() {
    const grid = document.getElementById('calendarGridDays');
    const titleEl = document.getElementById('calendarMonthYearDisplay');
    if (!grid) return;

    const year = calendarCurrentDate.getFullYear();
    const month = calendarCurrentDate.getMonth();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (titleEl) titleEl.textContent = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let gridHTML = `
      <div class="calendar-day-head">Sun</div>
      <div class="calendar-day-head">Mon</div>
      <div class="calendar-day-head">Tue</div>
      <div class="calendar-day-head">Wed</div>
      <div class="calendar-day-head">Thu</div>
      <div class="calendar-day-head">Fri</div>
      <div class="calendar-day-head">Sat</div>
    `;

    for (let i = 0; i < firstDayIndex; i++) {
      gridHTML += `<div class="calendar-day-cell" style="opacity: 0.25; pointer-events: none;"></div>`;
    }

    const todayYMD = getTodayYMD();

    for (let d = 1; d <= daysInMonth; d++) {
      const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = (cellDateStr === todayYMD);
      const isSelected = (cellDateStr === calendarSelectedDateStr);

      const hasTasks = appState.tasks.some(t => t.dueDate === cellDateStr);
      const hasStudy = appState.studySessions.some(s => s.timestamp && s.timestamp.startsWith(cellDateStr));

      gridHTML += `
        <div class="calendar-day-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" data-date="${cellDateStr}">
          <span class="calendar-day-num">${d}</span>
          <div class="calendar-day-dots">
            ${hasTasks ? '<span class="event-dot dot-task" title="Task due"></span>' : ''}
            ${hasStudy ? '<span class="event-dot dot-study" title="Study session"></span>' : ''}
          </div>
        </div>
      `;
    }

    grid.innerHTML = gridHTML;

    grid.querySelectorAll('.calendar-day-cell[data-date]').forEach(cell => {
      cell.addEventListener('click', () => {
        calendarSelectedDateStr = cell.getAttribute('data-date');
        renderCalendar();
        renderCalendarSelectedDayEvents();
      });
    });

    renderCalendarSelectedDayEvents();
  }

  function renderCalendarSelectedDayEvents() {
    const container = document.getElementById('calendarSelectedDayEvents');
    const titleEl = document.getElementById('calendarSelectedDayTitle');
    if (!container) return;

    if (titleEl) {
      titleEl.innerHTML = `<i data-lucide="calendar-check"></i> Events for ${calendarSelectedDateStr}`;
    }

    const tasksOnDate = appState.tasks.filter(t => t.dueDate === calendarSelectedDateStr);
    const studyOnDate = appState.studySessions.filter(s => s.timestamp && s.timestamp.startsWith(calendarSelectedDateStr));

    let html = '';

    if (tasksOnDate.length === 0 && studyOnDate.length === 0) {
      html = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          No tasks or recorded study logs for this date.
        </div>
      `;
    } else {
      tasksOnDate.forEach(t => {
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--pastel-lavender); border-radius: var(--radius-sm); border-left: 4px solid var(--primary);">
            <div style="font-size: 0.92rem; font-weight: 700; color: var(--text-main);">${escapeHTML(t.title)}</div>
            <span class="tag-badge" style="font-size: 0.72rem;">${t.completed ? 'Completed' : 'Pending'}</span>
          </div>
        `;
      });

      studyOnDate.forEach(s => {
        html += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--pastel-lavender); border-radius: var(--radius-sm); border-left: 4px solid var(--success);">
            <div>
              <div style="font-size: 0.92rem; font-weight: 700; color: var(--text-main);">${escapeHTML(s.subject)}</div>
              <div style="font-size: 0.76rem; color: var(--text-secondary);">${s.durationMinutes} mins study</div>
            </div>
            <i data-lucide="check" style="color: var(--success); width: 18px; height: 18px;"></i>
          </div>
        `;
      });
    }

    container.innerHTML = html;
    if (window.lucide) lucide.createIcons();
  }

  function renderRemindersList() {
    const list = document.getElementById('calendarRemindersList');
    if (!list) return;

    const reminderItems = appState.timetable.filter(item => item.reminder);

    if (reminderItems.length === 0) {
      list.innerHTML = `<div style="color: var(--text-muted); font-size: 0.88rem; padding: 1rem 0;">No active reminders configured in timetable.</div>`;
      return;
    }

    list.innerHTML = reminderItems.map(item => `
      <div class="reminder-item">
        <div>
          <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-main);">${escapeHTML(item.name)}</div>
          <div style="font-size: 0.78rem; color: var(--primary);">${formatTimeDisplay(item.startTime, appState.settings.clock12h)} • ${escapeHTML(item.category)}</div>
        </div>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn-icon btn-sm snooze-reminder-btn" data-id="${item.id}" title="Snooze 15m">
            <i data-lucide="clock"></i>
          </button>
          <button class="btn-icon btn-sm dismiss-reminder-btn" data-id="${item.id}" title="Dismiss">
            <i data-lucide="check"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();

    list.querySelectorAll('.snooze-reminder-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Reminder snoozed for 15 minutes', 'info');
      });
    });

    list.querySelectorAll('.dismiss-reminder-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Reminder dismissed for today', 'info');
      });
    });
  }

  function checkScheduledReminders() {
    if (!appState) return;
    const now = new Date();
    const istHour = parseInt(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }).format(now), 10);
    const istMin = parseInt(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', minute: 'numeric' }).format(now), 10);
    const timeStr = `${String(istHour).padStart(2, '0')}:${String(istMin).padStart(2, '0')}`;
    const todayStr = getTodayYMD();

    appState.timetable.forEach(item => {
      if (item.reminder && item.startTime === timeStr) {
        const reminderKey = `${todayStr}-${item.id}`;
        if (!appState.dismissedReminders.includes(reminderKey)) {
          appState.dismissedReminders.push(reminderKey);
          saveState();
          playChime('alert');
          showToast(`Reminder: Time for ${item.name}!`, 'info');

          if (Notification && Notification.permission === 'granted') {
            try {
              new Notification('Akash Daily Routine Reminder', {
                body: `It's time for ${item.name} (${item.category})`
              });
            } catch (e) {
              // ignore
            }
          }
        }
      }
    });
  }

  // ==========================================================================
  // 13. PRODUCTIVITY ANALYTICS & CHARTS
  // ==========================================================================
  function renderAnalyticsCharts() {
    if (typeof Chart === 'undefined') return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#C4B5FD' : '#6B7280';
    const gridColor = isDark ? 'rgba(167, 139, 250, 0.1)' : 'rgba(221, 214, 254, 0.4)';

    // 1. Weekly Tasks & Study Hours Chart
    const weeklyCtx = document.getElementById('weeklyProductivityChart');
    if (weeklyCtx) {
      if (weeklyChartInstance) weeklyChartInstance.destroy();

      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const studyHoursPerDay = [1.5, 2.0, 2.5, 1.0, 3.0, 4.0, 2.0];
      const completedTasksPerDay = [3, 4, 2, 5, 3, 2, 1];

      weeklyChartInstance = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [
            {
              label: 'Study Hours',
              data: studyHoursPerDay,
              backgroundColor: 'rgba(124, 58, 237, 0.85)',
              borderColor: '#7C3AED',
              borderWidth: 1,
              borderRadius: 8
            },
            {
              label: 'Tasks Completed',
              data: completedTasksPerDay,
              backgroundColor: 'rgba(236, 72, 153, 0.85)',
              borderColor: '#EC4899',
              borderWidth: 1,
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: textColor, font: { family: 'Inter', weight: 600 } }
            }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor }
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor }
            }
          }
        }
      });
    }

    // 2. Study Distribution by Subject
    const studyDistCtx = document.getElementById('studyDistributionChart');
    if (studyDistCtx) {
      if (studyDistChartInstance) studyDistChartInstance.destroy();

      const subjects = ['Python', 'SQL', 'AI/ML', 'NumPy & Pandas', 'College DSA', 'Web Dev'];
      const dataHours = [5.5, 3.0, 7.0, 4.5, 3.5, 4.0];

      studyDistChartInstance = new Chart(studyDistCtx, {
        type: 'doughnut',
        data: {
          labels: subjects,
          datasets: [{
            data: dataHours,
            backgroundColor: [
              '#7C3AED',
              '#F59E0B',
              '#8B5CF6',
              '#10B981',
              '#0284C7',
              '#EC4899'
            ],
            borderWidth: 3,
            borderColor: isDark ? '#1D183A' : '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: { color: textColor, font: { family: 'Inter', weight: 600 } }
            }
          }
        }
      });
    }

    // 3. Tasks by Category
    const tasksCatCtx = document.getElementById('tasksCategoryChart');
    if (tasksCatCtx) {
      if (tasksCatChartInstance) tasksCatChartInstance.destroy();

      const categories = ['College', 'Python', 'SQL', 'AI/ML', 'Web Development', 'Personal'];
      const counts = categories.map(cat => appState.tasks.filter(t => t.category === cat).length);

      tasksCatChartInstance = new Chart(tasksCatCtx, {
        type: 'bar',
        data: {
          labels: categories,
          datasets: [{
            label: 'Total Tasks',
            data: counts,
            backgroundColor: [
              '#10B981',
              '#7C3AED',
              '#F59E0B',
              '#8B5CF6',
              '#0284C7',
              '#EC4899'
            ],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor }
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor, stepSize: 1 }
            }
          }
        }
      });
    }

    // 4. Roadmap Progress Chart
    const roadmapCtx = document.getElementById('roadmapProgressChart');
    if (roadmapCtx) {
      if (roadmapChartInstance) roadmapChartInstance.destroy();

      const stageLabels = appState.roadmap.map(s => s.title.split(':')[0]);
      const stagePcts = appState.roadmap.map(s => {
        const topics = s.topics || [];
        const done = topics.filter(t => t.done).length;
        return topics.length > 0 ? Math.round((done / topics.length) * 100) : 0;
      });

      roadmapChartInstance = new Chart(roadmapCtx, {
        type: 'bar',
        data: {
          labels: stageLabels,
          datasets: [{
            label: 'Completion %',
            data: stagePcts,
            backgroundColor: '#7C3AED',
            borderRadius: 8
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              max: 100,
              grid: { color: gridColor },
              ticks: { color: textColor, callback: v => `${v}%` }
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor }
            }
          }
        }
      });
    }
  }

  // ==========================================================================
  // 14. SETTINGS & DATA MANAGEMENT
  // ==========================================================================
  function initSettings() {
    const nameInput = document.getElementById('settingNameInput');
    const roleInput = document.getElementById('settingRoleInput');
    const studyGoalInput = document.getElementById('settingStudyGoalInput');
    const clock12hChk = document.getElementById('settingClock12h');
    const weekendHolidayChk = document.getElementById('settingWeekendHoliday');
    const soundChk = document.getElementById('settingSoundEffects');

    if (nameInput) nameInput.value = appState.profile.name || 'Akash V';
    if (roleInput) roleInput.value = appState.profile.role || 'B.Tech 2nd Year CSE-AIML';
    if (studyGoalInput) studyGoalInput.value = appState.profile.studyGoalHours || 4;
    if (clock12hChk) clock12hChk.checked = appState.settings.clock12h;
    if (weekendHolidayChk) weekendHolidayChk.checked = appState.settings.weekendHoliday;
    if (soundChk) soundChk.checked = appState.settings.soundEffects;

    const saveProfileBtn = document.getElementById('saveProfileSettingsBtn');
    if (saveProfileBtn) {
      saveProfileBtn.addEventListener('click', () => {
        appState.profile.name = nameInput.value.trim() || 'Akash V';
        appState.profile.role = roleInput.value.trim() || 'B.Tech CSE-AIML';
        appState.profile.studyGoalHours = parseInt(studyGoalInput.value, 10) || 4;
        saveState();
        updateProfileDisplay();
        showToast('Profile information updated', 'success');
      });
    }

    if (clock12hChk) {
      clock12hChk.addEventListener('change', (e) => {
        appState.settings.clock12h = e.target.checked;
        saveState();
        updateLiveClock();
        renderRoutineTimelines();
        checkCurrentActivity();
      });
    }

    if (weekendHolidayChk) {
      weekendHolidayChk.addEventListener('change', (e) => {
        appState.settings.weekendHoliday = e.target.checked;
        saveState();
        renderRoutineTimelines();
        checkCurrentActivity();
      });
    }

    if (soundChk) {
      soundChk.addEventListener('change', (e) => {
        appState.settings.soundEffects = e.target.checked;
        saveState();
      });
    }

    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `akash_routine_backup_${getTodayYMD()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast('Data exported successfully', 'success');
      });
    }

    const importFileInput = document.getElementById('importJsonFileInput');
    if (importFileInput) {
      importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target.result);
            if (importedData && importedData.timetable && importedData.tasks) {
              appState = importedData;
              saveState();
              refreshAllUI();
              showToast('Backup restored successfully!', 'success');
            } else {
              showToast('Invalid backup file structure.', 'error');
            }
          } catch (err) {
            showToast('Failed to parse JSON file.', 'error');
          }
        };
        reader.readAsText(file);
      });
    }

    const restoreBtn = document.getElementById('restoreDefaultsBtn');
    if (restoreBtn) {
      restoreBtn.addEventListener('click', () => {
        openConfirmModal('Restore Default Timetable', 'Restore recommended starter timetable without resetting your tasks or study records?', () => {
          appState.timetable = JSON.parse(JSON.stringify(DEFAULT_WEEKDAY_TIMETABLE));
          appState.weekendTimetable = JSON.parse(JSON.stringify(DEFAULT_WEEKEND_TIMETABLE));
          saveState();
          renderRoutineTimelines();
          checkCurrentActivity();
          showToast('Timetable restored to recommended schedule', 'success');
        });
      });
    }

    const resetAllBtn = document.getElementById('resetAllDataBtn');
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', () => {
        openConfirmModal('RESET ALL APPLICATION DATA', 'WARNING: This will completely erase all your tasks, timetable edits, study sessions, and roadmap progress. Are you absolutely sure?', () => {
          localStorage.removeItem(STORAGE_KEY);
          appState = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
          saveState();
          refreshAllUI();
          showToast('Application reset to factory defaults', 'info');
        });
      });
    }
  }

  function updateProfileDisplay() {
    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarAvatar');

    if (nameEl) nameEl.textContent = appState.profile.name;
    if (roleEl) roleEl.textContent = appState.profile.role;
    if (avatarEl) {
      const parts = (appState.profile.name || 'Akash V').split(' ');
      const initials = parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
      avatarEl.textContent = initials;
    }
  }

  // ==========================================================================
  // 15. MODAL DIALOGS & FORMS
  // ==========================================================================
  let confirmCallback = null;

  function openConfirmModal(title, message, callback) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmModalTitle');
    const msgEl = document.getElementById('confirmModalMessage');
    const actionBtn = document.getElementById('confirmModalActionBtn');

    if (!modal) return;
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;

    confirmCallback = callback;
    modal.classList.add('active');

    actionBtn.onclick = () => {
      if (typeof confirmCallback === 'function') confirmCallback();
      modal.classList.remove('active');
    };
  }

  function openActivityModal(activityId = null) {
    const modal = document.getElementById('activityModal');
    const form = document.getElementById('activityForm');
    const titleEl = document.getElementById('activityModalTitle');
    if (!modal || !form) return;

    form.reset();

    const dayOfWeek = new Date().getDay();
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const activeSchedule = (isWeekend && appState.settings.weekendHoliday) ? appState.weekendTimetable : appState.timetable;

    if (activityId) {
      const item = activeSchedule.find(x => x.id === activityId);
      if (item) {
        titleEl.textContent = 'Edit Routine Activity';
        document.getElementById('activityIdInput').value = item.id;
        document.getElementById('activityNameInput').value = item.name;
        document.getElementById('activityStartInput').value = item.startTime;
        document.getElementById('activityEndInput').value = item.endTime;
        document.getElementById('activityCategorySelect').value = item.category;
        document.getElementById('activityDescInput').value = item.description || '';
        document.getElementById('activityReminderToggle').checked = !!item.reminder;
      }
    } else {
      titleEl.textContent = 'Add Routine Activity';
      document.getElementById('activityIdInput').value = '';
      document.getElementById('activityStartInput').value = '17:00';
      document.getElementById('activityEndInput').value = '18:00';
    }

    modal.classList.add('active');
  }

  function initModals() {
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });

    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('taskIdInput').value;
        const title = document.getElementById('taskTitleInput').value.trim();
        const category = document.getElementById('taskCategorySelect').value;
        const priority = document.getElementById('taskPrioritySelect').value;
        const dueDate = document.getElementById('taskDueDateInput').value;
        const desc = document.getElementById('taskDescriptionInput').value.trim();

        if (id) {
          const task = appState.tasks.find(t => t.id === id);
          if (task) {
            task.title = title;
            task.category = category;
            task.priority = priority;
            task.dueDate = dueDate;
            task.description = desc;
          }
        } else {
          const newTask = {
            id: 'task-' + Date.now(),
            title: title,
            category: category,
            priority: priority,
            dueDate: dueDate || getTodayYMD(),
            completed: false,
            completedAt: null,
            description: desc
          };
          appState.tasks.unshift(newTask);
        }

        saveState();
        updateSummaryStats();
        renderTasks();
        document.getElementById('taskModal').classList.remove('active');
        playChime('success');
        showToast('Task saved successfully', 'success');
      });
    }

    const activityForm = document.getElementById('activityForm');
    if (activityForm) {
      activityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('activityIdInput').value;
        const name = document.getElementById('activityNameInput').value.trim();
        const start = document.getElementById('activityStartInput').value;
        const end = document.getElementById('activityEndInput').value;
        const category = document.getElementById('activityCategorySelect').value;
        const desc = document.getElementById('activityDescInput').value.trim();
        const reminder = document.getElementById('activityReminderToggle').checked;

        const dayOfWeek = new Date().getDay();
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const list = (isWeekend && appState.settings.weekendHoliday) ? appState.weekendTimetable : appState.timetable;

        if (id) {
          const item = list.find(x => x.id === id);
          if (item) {
            item.name = name;
            item.startTime = start;
            item.endTime = end;
            item.category = category;
            item.description = desc;
            item.reminder = reminder;
          }
        } else {
          const newItem = {
            id: 'tt-' + Date.now(),
            name: name,
            startTime: start,
            endTime: end,
            category: category,
            description: desc,
            notes: '',
            reminder: reminder,
            completedDate: null
          };
          list.push(newItem);
          list.sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime));
        }

        saveState();
        renderRoutineTimelines();
        checkCurrentActivity();
        updateSummaryStats();
        document.getElementById('activityModal').classList.remove('active');
        playChime('success');
        showToast('Timetable activity saved', 'success');
      });
    }

    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
      projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('projectIdInput').value;
        const name = document.getElementById('projectNameInput').value.trim();
        const category = document.getElementById('projectCategorySelect').value;
        const status = document.getElementById('projectStatusSelect').value;
        const techStack = document.getElementById('projectTechInput').value.trim();
        const startDate = document.getElementById('projectStartDate').value;
        const targetDate = document.getElementById('projectTargetDate').value;
        const desc = document.getElementById('projectDescInput').value.trim();
        const subtasksRaw = document.getElementById('projectSubtasksInput').value.split('\n').filter(Boolean);

        if (id) {
          const proj = appState.projects.find(p => p.id === id);
          if (proj) {
            proj.name = name;
            proj.category = category;
            proj.status = status;
            proj.techStack = techStack;
            proj.startDate = startDate;
            proj.targetDate = targetDate;
            proj.description = desc;
            const existingMap = {};
            (proj.subtasks || []).forEach(s => existingMap[s.text] = s.completed);
            proj.subtasks = subtasksRaw.map((txt, idx) => ({
              id: 'st-' + idx + '-' + Date.now(),
              text: txt.trim(),
              completed: !!existingMap[txt.trim()]
            }));
          }
        } else {
          const newProj = {
            id: 'proj-' + Date.now(),
            name: name,
            category: category,
            status: status,
            techStack: techStack,
            startDate: startDate || getTodayYMD(),
            targetDate: targetDate || getFutureYMD(14),
            description: desc,
            subtasks: subtasksRaw.map((txt, idx) => ({
              id: 'st-' + idx + '-' + Date.now(),
              text: txt.trim(),
              completed: false
            }))
          };
          appState.projects.unshift(newProj);
        }

        saveState();
        renderProjects();
        document.getElementById('projectModal').classList.remove('active');
        playChime('success');
        showToast('Web project saved', 'success');
      });
    }

    const subjectForm = document.getElementById('subjectForm');
    if (subjectForm) {
      subjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('newSubjectNameInput').value.trim();
        if (name && !appState.customSubjects.includes(name)) {
          appState.customSubjects.push(name);
          saveState();
          initStudyTracker();
          document.getElementById('subjectModal').classList.remove('active');
          showToast(`Subject "${name}" added`, 'success');
        }
      });
    }

    const openTaskBtn = document.getElementById('openAddTaskModalBtn');
    const quickTaskBtn = document.getElementById('quickAddTaskBtn');
    if (openTaskBtn) openTaskBtn.onclick = () => openTaskModal();
    if (quickTaskBtn) quickTaskBtn.onclick = () => openTaskModal();

    const addActivityBtn = document.getElementById('addRoutineActivityBtn');
    if (addActivityBtn) addActivityBtn.onclick = () => openActivityModal();

    const addWeeklyBtn = document.getElementById('addWeeklyActivityBtn');
    if (addWeeklyBtn) addWeeklyBtn.onclick = () => openActivityModal();

    const addProjectBtn = document.getElementById('openAddProjectModalBtn');
    if (addProjectBtn) addProjectBtn.onclick = () => openProjectModal();

    const addSubBtn = document.getElementById('addNewSubjectBtn');
    const manageSubBtn = document.getElementById('manageSubjectsBtn');
    if (addSubBtn) addSubBtn.onclick = () => document.getElementById('subjectModal').classList.add('active');
    if (manageSubBtn) manageSubBtn.onclick = () => document.getElementById('subjectModal').classList.add('active');
  }

  // ==========================================================================
  // 16. SPA NAVIGATION & ROUTING (MOBILE & WEB VIEWS)
  // ==========================================================================
  const viewTitles = {
    dashboard: 'Dashboard',
    routine: 'Daily Routine',
    weekly: 'Weekly Planner',
    tasks: 'Task Manager',
    study: 'Study Tracker',
    projects: 'Web Projects',
    roadmap: 'AI/ML Roadmap',
    calendar: 'Calendar & Reminders',
    analytics: 'Analytics',
    settings: 'Settings'
  };

  function closeMobileSidebar() {
    const sidebar = document.getElementById('appSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
  }

  function switchView(viewName) {
    if (!viewTitles[viewName]) viewName = 'dashboard';

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) targetSection.classList.add('active');

    const breadcrumb = document.getElementById('activeBreadcrumbTitle');
    if (breadcrumb) breadcrumb.textContent = viewTitles[viewName];

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewName);
    });

    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-view') === viewName);
    });

    if (viewName === 'analytics') {
      setTimeout(renderAnalyticsCharts, 50);
    } else if (viewName === 'roadmap') {
      renderRoadmap();
    } else if (viewName === 'projects') {
      renderProjects();
    } else if (viewName === 'calendar') {
      renderCalendar();
    } else if (viewName === 'tasks') {
      renderTasks();
    } else if (viewName === 'routine') {
      renderRoutineTimelines();
    } else if (viewName === 'weekly') {
      initWeeklyPlanner();
    }

    closeMobileSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initRouting() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      switchView(hash);
    });

    const initialHash = window.location.hash.replace('#', '') || 'dashboard';
    switchView(initialHash);

    // Desktop Collapse Button
    const collapseBtn = document.getElementById('sidebarCollapseBtn');
    const sidebar = document.getElementById('appSidebar');
    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        const icon = document.getElementById('collapseIcon');
        if (icon) {
          icon.setAttribute('data-lucide', isCollapsed ? 'chevron-right' : 'chevron-left');
          if (window.lucide) lucide.createIcons();
        }
      });
    }

    // Mobile Hamburger Menu Button
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const backdrop = document.getElementById('sidebarBackdrop');
    const closeBtn = document.getElementById('sidebarCloseBtn');

    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.add('mobile-open');
        if (backdrop) backdrop.classList.add('active');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileSidebar);
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileSidebar);
    }

    // Theme Toggle Button
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Routine Filter Toggle
    const filterRoutineBtn = document.getElementById('routineFilterActiveOnly');
    const filterRoutineLabel = document.getElementById('filterRoutineLabel');
    if (filterRoutineBtn) {
      filterRoutineBtn.addEventListener('click', () => {
        routineFilterActiveOnly = !routineFilterActiveOnly;
        if (filterRoutineLabel) filterRoutineLabel.textContent = routineFilterActiveOnly ? 'Show All' : 'Hide Inactive';
        renderRoutineTimelines();
      });
    }

    // Task Search & Filters
    const searchInput = document.getElementById('taskSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentTaskSearchQuery = e.target.value.trim();
        renderTasks();
      });
    }

    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentTaskStatusFilter = chip.getAttribute('data-filter');
        renderTasks();
      });
    });

    const catFilter = document.getElementById('taskCategoryFilter');
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        currentTaskCategoryFilter = e.target.value;
        renderTasks();
      });
    }

    const priorityFilter = document.getElementById('taskPriorityFilter');
    if (priorityFilter) {
      priorityFilter.addEventListener('change', (e) => {
        currentTaskPriorityFilter = e.target.value;
        renderTasks();
      });
    }

    const notifBtn = document.getElementById('requestNotifPermBtn');
    if (notifBtn) {
      notifBtn.addEventListener('click', requestNotificationPermission);
    }

    const headerNotifBtn = document.getElementById('notificationsBtn');
    if (headerNotifBtn) {
      headerNotifBtn.addEventListener('click', () => {
        window.location.hash = '#calendar';
      });
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'lavender';
    const next = current === 'dark' ? 'lavender' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    appState.settings.theme = next;
    saveState();

    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.setAttribute('data-lucide', next === 'dark' ? 'sun' : 'moon');
      if (window.lucide) lucide.createIcons();
    }

    renderAnalyticsCharts();
    showToast(`Switched to ${next === 'dark' ? 'Midnight Lavender' : 'Pastel Lavender Zen'} theme`, 'info');
  }

  function requestNotificationPermission() {
    if (!('Notification' in window)) {
      showToast('Browser notifications are not supported by this browser.', 'warning');
      return;
    }

    Notification.requestPermission().then(permission => {
      const btnText = document.getElementById('notifPermBtnText');
      if (permission === 'granted') {
        if (btnText) btnText.textContent = 'Alerts Enabled';
        showToast('Browser notifications enabled! Reminders will trigger when the tab is open.', 'success');
      } else {
        if (btnText) btnText.textContent = 'Alerts Blocked';
        showToast('Notification permission was denied.', 'warning');
      }
    });
  }

  function refreshAllUI() {
    updateProfileDisplay();
    updateLiveClock();
    checkCurrentActivity();
    updateSummaryStats();
    renderRoutineTimelines();
    renderTasks();
    initStudyTracker();
    renderProjects();
    renderRoadmap();
    renderCalendar();
    renderAnalyticsCharts();
  }

  // ==========================================================================
  // 17. APPLICATION BOOTSTRAP
  // ==========================================================================
  function bootstrap() {
    loadState();

    const activeTheme = appState.settings.theme || 'lavender';
    document.documentElement.setAttribute('data-theme', activeTheme);
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', activeTheme === 'dark' ? 'sun' : 'moon');
    }

    updateProfileDisplay();
    initRouting();
    initModals();
    initSettings();
    initWeeklyPlanner();
    initStudyTracker();
    renderProjects();
    renderRoadmap();
    initCalendar();

    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    checkCurrentActivity();
    setInterval(checkCurrentActivity, 30000);

    updateSummaryStats();
    renderRoutineTimelines();
    renderTasks();
    setInterval(checkScheduledReminders, 60000);

    if (window.lucide) {
      lucide.createIcons();
    }

    console.log('Akash Daily Routine initialized: HTML, CSS, and JS only. Fully responsive on Mobile & Web.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

})();
