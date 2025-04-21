const subjects = {
  physics: [
    "Units and Measurements", "Laws of Motion", "Work, Energy and Power",
    "Gravitation", "Thermodynamics", "Kinetic Theory", "Oscillations",
    "Waves", "Current Electricity", "Magnetism", "Optics", "Atoms", "Nuclei"
  ],
  chemistry: [
    "Some Basic Concepts", "Structure of Atom", "Thermodynamics",
    "Equilibrium", "Redox Reactions", "Hydrocarbons", "Chemical Kinetics",
    "Coordination Compounds", "Biomolecules", "Polymers"
  ],
  biology: [
    "Cell - The Unit of Life", "Plant Kingdom", "Animal Kingdom",
    "Structural Organisation in Animals", "Biomolecules", "Digestion and Absorption",
    "Photosynthesis", "Respiration", "Reproduction", "Evolution", "Human Health and Disease"
  ]
};

let currentSubject = 'physics';

function loadSubject(subject) {
  currentSubject = subject;
  const chapterList = document.getElementById('chapter-list');
  const progressBar = document.getElementById('subject-progress-bar');
  const container = document.body;

  container.className = 'subject-' + subject;
  chapterList.innerHTML = '';

  subjects[subject].forEach((chapter, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = localStorage.getItem(`${subject}_chapter_${index}`) === 'true';

    checkbox.addEventListener('change', () => {
      localStorage.setItem(`${subject}_chapter_${index}`, checkbox.checked);
      updateProgress();
    });

    const label = document.createElement('span');
    label.textContent = chapter;

    li.appendChild(label);
    li.appendChild(checkbox);
    chapterList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const subjectChapters = subjects[currentSubject];
  const completed = subjectChapters.filter((_, i) =>
    localStorage.getItem(`${currentSubject}_chapter_${i}`) === 'true'
  ).length;
  const percent = Math.round((completed / subjectChapters.length) * 100);
  document.getElementById('subject-progress-bar').style.width = percent + '%';
  document.getElementById('subject-progress-bar').textContent = percent + '%';

  // Overall progress
  let total = 0, done = 0;
  for (let subject in subjects) {
    total += subjects[subject].length;
    for (let i = 0; i < subjects[subject].length; i++) {
      if (localStorage.getItem(`${subject}_chapter_${i}`) === 'true') done++;
    }
  }
  const overall = Math.round((done / total) * 100);
  document.getElementById('overall-progress-bar').style.width = overall + '%';
  document.getElementById('overall-progress-bar').textContent = overall + '%';
}

// Initial load
loadSubject('physics');
