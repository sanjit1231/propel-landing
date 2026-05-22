// AP Exam Prep Tool
// Browse and solve 50+ real AP FRQs with solutions and hints

let frqsData = [];
let currentFRQ = null;
let progress = {};
let selectedSubject = 'All';

async function initExamPrep() {
  // Load FRQ data
  try {
    const response = await fetch('js/data/ap-frqs.json');
    frqsData = await response.json();
  } catch (error) {
    console.error('Error loading FRQs:', error);
    document.getElementById('examPrepContent').innerHTML = '<p>Error loading data</p>';
    return;
  }

  // Load progress from localStorage
  const saved = localStorage.getItem('examPrepProgress');
  if (saved) {
    progress = JSON.parse(saved);
  }

  renderExamPrepUI();
}

function renderExamPrepUI() {
  const content = document.getElementById('examPrepContent');
  const subjects = ['All', ...new Set(frqsData.map(f => f.subject))];
  const filteredFRQs = selectedSubject === 'All' ? frqsData : frqsData.filter(f => f.subject === selectedSubject);
  const completed = Object.keys(progress).filter(id => progress[id].solved).length;

  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px; max-width: 1200px;">
      <!-- Sidebar -->
      <div>
        <div style="background: linear-gradient(145deg, rgba(124,58,237,0.1), rgba(79,70,229,0.05)); border: 1px solid rgba(124,58,237,0.2); border-radius: 20px; padding: 24px; position: sticky; top: 80px;">
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">Progress</h3>
          <div style="font-size: 24px; font-weight: 800; color: var(--violet-light); margin-bottom: 24px;">${completed}/${frqsData.length}</div>

          <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Subjects</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${subjects.map(subject => {
              const subjectFRQs = subject === 'All' ? frqsData : frqsData.filter(f => f.subject === subject);
              const subjectCompleted = subjectFRQs.filter(f => progress[f.id]?.solved).length;
              const isActive = selectedSubject === subject;
              return `
                <button onclick="changeSubject('${subject}')" style="text-align: left; padding: 12px; border: 1px solid ${isActive ? 'var(--violet)' : 'var(--border)'}; background: ${isActive ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.02)'}; color: #fff; border-radius: 8px; cursor: pointer; font-family: 'Outfit', sans-serif; display: flex; justify-content: space-between;">
                  <span>${subject}</span>
                  <span style="color: var(--text-muted); font-size: 12px;">${subjectCompleted}/${subjectFRQs.length}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div>
        ${currentFRQ ? renderFRQDetail() : renderFRQList(filteredFRQs)}
      </div>
    </div>
  `;
}

function renderFRQList(frqs) {
  return `
    <div>
      <div style="display: grid; gap: 12px;">
        ${frqs.map(frq => {
          const isSolved = progress[frq.id]?.solved;
          const difficulty = frq.difficulty.charAt(0).toUpperCase() + frq.difficulty.slice(1);
          return `
            <div onclick="selectFRQ(${frq.id})" style="background: linear-gradient(145deg, rgba(124,58,237,0.1), rgba(79,70,229,0.05)); border: 1px solid rgba(124,58,237,0.2); border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.3s; display: flex; justify-content: space-between; align-items: center;">
              <div style="flex: 1;">
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 12px; background: rgba(124,58,237,0.2); color: var(--violet-light); padding: 4px 10px; border-radius: 999px;">${frq.subject}</span>
                  <span style="font-size: 12px; color: var(--text-muted);">AP ${frq.year}</span>
                  <span style="font-size: 12px; color: var(--text-muted);">${difficulty}</span>
                </div>
                <div style="font-size: 14px; color: #fff; line-height: 1.5;">${frq.question.substring(0, 80)}...</div>
              </div>
              <div style="margin-left: 16px; text-align: center;">
                ${isSolved ? '<div style="font-size: 24px;">✓</div><div style="font-size: 12px; color: var(--text-muted);">Solved</div>' : '<div style="font-size: 24px;">→</div>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderFRQDetail() {
  if (!currentFRQ) return '';

  const frq = currentFRQ;
  const isSolved = progress[frq.id]?.solved;
  const showSolution = progress[frq.id]?.showSolution;
  const hintsShown = progress[frq.id]?.hintsShown || 0;

  return `
    <div>
      <button onclick="selectFRQ(null)" style="margin-bottom: 16px; background: rgba(124,58,237,0.2); border: none; color: var(--violet-light); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-family: 'Outfit', sans-serif;">← Back to List</button>

      <div style="background: linear-gradient(145deg, rgba(124,58,237,0.1), rgba(79,70,229,0.05)); border: 1px solid rgba(124,58,237,0.2); border-radius: 20px; padding: 32px;">
        <!-- Question -->
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 24px;">
          <div>
            <div style="display: flex; gap: 12px; margin-bottom: 12px;">
              <span style="font-size: 12px; background: rgba(124,58,237,0.2); color: var(--violet-light); padding: 4px 10px; border-radius: 999px;">${frq.subject}</span>
              <span style="font-size: 12px; color: var(--text-muted);">AP ${frq.year}</span>
              <span style="font-size: 12px; color: var(--text-muted); text-transform: capitalize;">${frq.difficulty}</span>
            </div>
            <h2 style="font-size: 18px; font-weight: 600; line-height: 1.6;">${frq.question}</h2>
          </div>
          <div style="text-align: center;">
            ${isSolved ? '<div style="font-size: 32px;">✓</div><div style="font-size: 12px; color: var(--text-muted);">Completed</div>' : ''}
          </div>
        </div>

        <!-- Hints System -->
        <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Hints (${hintsShown}/${frq.hints.length})</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${frq.hints.map((hint, idx) => `
              <div style="background: ${idx < hintsShown ? 'rgba(124,58,237,0.1)' : 'rgba(255,255,255,0.03)'}; border-radius: 8px; padding: 12px; cursor: ${idx < hintsShown ? 'default' : 'pointer'};" onclick="${idx < hintsShown ? '' : `showHint(${frq.id})`}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 13px; ${idx < hintsShown ? 'color: #fff;' : 'color: var(--text-muted);'}">${idx < hintsShown ? hint : `Hint ${idx + 1}`}</span>
                  ${idx >= hintsShown ? '<span style="color: var(--text-muted);">→</span>' : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Solution -->
        <div style="margin-bottom: 24px;">
          ${!showSolution ? `
            <button onclick="toggleSolution(${frq.id})" style="width: 100%; padding: 12px; background: linear-gradient(135deg, var(--violet), var(--indigo)); border: none; color: #fff; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif;">Show Solution</button>
          ` : `
            <div style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); border-radius: 12px; padding: 20px;">
              <h3 style="font-size: 14px; font-weight: 600; color: #34d399; margin-bottom: 12px;">Solution</h3>
              <div style="color: #fff; font-size: 14px; line-height: 1.8; white-space: pre-wrap; font-family: 'JetBrains Mono', monospace;">${frq.solution}</div>
            </div>
          `}
        </div>

        <!-- Mark as Solved -->
        <button onclick="markSolved(${frq.id})" style="width: 100%; padding: 12px; background: ${isSolved ? 'rgba(124,58,237,0.2)' : 'rgba(52,211,153,0.15)'}; border: 1px solid ${isSolved ? 'rgba(124,58,237,0.3)' : 'rgba(52,211,153,0.3)'}; color: ${isSolved ? 'var(--accent)' : '#34d399'}; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif;">
          ${isSolved ? '✓ Completed' : '✓ Mark as Completed'}
        </button>
      </div>
    </div>
  `;
}

function selectFRQ(id) {
  if (id === null) {
    currentFRQ = null;
  } else {
    currentFRQ = frqsData.find(f => f.id === id);
  }
  renderExamPrepUI();
}

function changeSubject(subject) {
  selectedSubject = subject;
  currentFRQ = null;
  renderExamPrepUI();
}

function showHint(id) {
  if (!progress[id]) {
    progress[id] = { solved: false, showSolution: false, hintsShown: 0 };
  }
  if (progress[id].hintsShown < frqsData.find(f => f.id === id).hints.length) {
    progress[id].hintsShown++;
  }
  localStorage.setItem('examPrepProgress', JSON.stringify(progress));
  renderExamPrepUI();
}

function toggleSolution(id) {
  if (!progress[id]) {
    progress[id] = { solved: false, showSolution: false, hintsShown: 0 };
  }
  progress[id].showSolution = !progress[id].showSolution;
  localStorage.setItem('examPrepProgress', JSON.stringify(progress));
  renderExamPrepUI();
}

function markSolved(id) {
  if (!progress[id]) {
    progress[id] = { solved: false, showSolution: false, hintsShown: 0 };
  }
  progress[id].solved = !progress[id].solved;
  localStorage.setItem('examPrepProgress', JSON.stringify(progress));
  renderExamPrepUI();
}
