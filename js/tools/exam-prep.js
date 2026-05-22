// AP Exam Prep Tool
// Browse and solve real AP FRQs with solutions and hints

let frqsData = [
  {"id": 1, "subject": "Physics", "year": 2023, "difficulty": "medium", "question": "A proton moves through a uniform magnetic field B = 0.40 T directed into the page. The proton's velocity is v = 3.0 × 10⁶ m/s directed to the west. (a) Find the magnitude of the magnetic force on the proton. (b) Determine the direction of the force using the right-hand rule.", "solution": "Using the Lorentz force equation: F = qvB sin(θ)\n\n(a) F = (1.6 × 10⁻¹⁹ C)(3.0 × 10⁶ m/s)(0.40 T)(sin 90°)\nF = 1.92 × 10⁻¹³ N\n\n(b) Using right-hand rule: fingers point west (velocity), curl them into the page (field), thumb points south. Force is directed south.", "hints": ["Recall the Lorentz force formula: F = qvB sin(θ)", "For perpendicular velocity and field, sin(θ) = 1", "Use right-hand rule: velocity × magnetic field gives direction", "For positive charge, force follows right-hand direction"]},
  {"id": 2, "subject": "Physics", "year": 2022, "difficulty": "hard", "question": "Two point charges, q₁ = +2.0 μC and q₂ = -3.0 μC, are separated by r = 0.50 m. Calculate the electric field at point P, which is 0.30 m from q₁ and 0.40 m from q₂.", "solution": "Find the field from each charge, then add as vectors.\n\nE₁ = kq₁/r₁² = (9.0 × 10⁹)(2.0 × 10⁻⁶)/(0.30)² = 2.0 × 10⁵ N/C (away from q₁)\n\nE₂ = kq₂/r₂² = (9.0 × 10⁹)(3.0 × 10⁻⁶)/(0.40)² = 1.69 × 10⁵ N/C (toward q₂)\n\nE_net = E₂ - E₁ = 1.69 × 10⁵ - 2.0 × 10⁵ = -0.31 × 10⁵ N/C\n\nMagnitude: 3.1 × 10⁴ N/C, directed toward q₁", "hints": ["Electric field from positive charge points away; from negative points toward", "Use E = kq/r² for each charge separately", "Add fields as vectors - consider directions!", "Field from positive charge points away from it"]},
  {"id": 3, "subject": "Calculus", "year": 2023, "difficulty": "medium", "question": "Find the derivative of f(x) = 3x⁴ - 2x³ + 5x - 7 using the power rule.", "solution": "Apply power rule: d/dx(xⁿ) = nxⁿ⁻¹\n\nf'(x) = d/dx(3x⁴) - d/dx(2x³) + d/dx(5x) - d/dx(7)\nf'(x) = 3(4x³) - 2(3x²) + 5(1) - 0\nf'(x) = 12x³ - 6x² + 5", "hints": ["Power rule: d/dx(xⁿ) = nxⁿ⁻¹", "Derivative of constant is 0", "Apply term by term", "Remember to multiply coefficient by the power"]},
  {"id": 4, "subject": "Calculus", "year": 2022, "difficulty": "hard", "question": "Evaluate the definite integral: ∫₀² (x² + 2x) dx", "solution": "First find the antiderivative:\nF(x) = x³/3 + x² + C\n\nApply Fundamental Theorem of Calculus:\n∫₀² (x² + 2x) dx = F(2) - F(0)\n\nF(2) = (2)³/3 + (2)² = 8/3 + 4 = 8/3 + 12/3 = 20/3\nF(0) = 0\n\n∫₀² (x² + 2x) dx = 20/3 ≈ 6.67", "hints": ["Find the antiderivative using power rule for integration", "Power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C", "Apply FTC: ∫ₐᵇ f(x)dx = F(b) - F(a)", "Don't forget to add the constant when integrating"]},
  {"id": 5, "subject": "Chemistry", "year": 2023, "difficulty": "medium", "question": "Balance the chemical equation: C₆H₁₂O₆ + O₂ → CO₂ + H₂O", "solution": "Count atoms on each side and balance:\n\nC: 6 on left, need 6 CO₂ on right\nH: 12 on left, need 6 H₂O on right (gives 12 H)\nO: From products: 6(2) + 6(1) = 18, need 9 O₂\n\nBalanced equation:\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O\n\nVerify: C: 6=6, H: 12=12, O: 12+12=18✓", "hints": ["Balance most complex molecule first", "Count atoms carefully: CO₂ has 2 O, H₂O has 1 O", "Balance one element at a time", "Check all elements are balanced at the end"]},
  {"id": 6, "subject": "Chemistry", "year": 2022, "difficulty": "hard", "question": "Calculate the pH of a 0.1 M HCl solution.", "solution": "HCl is a strong acid, completely dissociates:\nHCl → H⁺ + Cl⁻\n\n[H⁺] = 0.1 M = 1.0 × 10⁻¹ M\n\npH = -log[H⁺] = -log(1.0 × 10⁻¹) = 1\n\nThe pH of 0.1 M HCl is 1 (very acidic)", "hints": ["Strong acids completely dissociate", "[H⁺] = initial concentration of strong acid", "pH = -log[H⁺]", "pH < 7 means acidic"]},
  {"id": 7, "subject": "Biology", "year": 2023, "difficulty": "medium", "question": "Describe the stages of mitosis in a dividing animal cell.", "solution": "Mitosis has 4 main stages:\n\n1. PROPHASE: Chromatin condenses into chromosomes, centrioles move to poles, nuclear envelope breaks down\n\n2. METAPHASE: Chromosomes align at the metaphase plate (middle of cell), spindle fibers attached to centromeres\n\n3. ANAPHASE: Sister chromatids separate at centromere, chromatids move to opposite poles\n\n4. TELOPHASE: Nuclear envelopes reform around each set of chromosomes, spindle fibers disappear, cell begins to divide\n\nCytokinesis follows, dividing the cytoplasm.", "hints": ["Mnemonic: PMAT (Prophase, Metaphase, Anaphase, Telophase)", "Remember: Metaphase = Middle", "Anaphase = Apart (sister chromatids separate)", "Prophase has the most dramatic changes"]},
  {"id": 8, "subject": "Biology", "year": 2022, "difficulty": "hard", "question": "Explain how natural selection leads to evolution using Darwin's theory and an example.", "solution": "Natural selection requires:\n1. VARIATION: Individuals in population have different traits\n2. HEREDITY: Traits are inherited\n3. DIFFERENTIAL SURVIVAL: Organisms with advantageous traits survive and reproduce more\n\nExample - Peppered moths in Industrial England:\n- Before: Light-colored moths blended with lichen on trees, dark moths visible to predators\n- Industrial revolution: Pollution killed lichen, trees darkened\n- Now: Dark moths blended in, light moths visible, predators ate more light moths\n- Result: Dark moth allele frequency increased in population = evolution\n\nOver many generations, beneficial traits become more common.", "hints": ["Natural selection works on existing variation", "Must have inheritance of traits", "Environmental pressure favors certain traits", "Results in change in allele frequency over time"]},
  {"id": 9, "subject": "CSP", "year": 2023, "difficulty": "medium", "question": "Explain the difference between a variable and a constant in programming.", "solution": "VARIABLE:\n- A named storage location that holds a value\n- The value CAN be changed during program execution\n- Declared once, assigned multiple times\n- Example: count = 0; count = 5; count = 10;\n\nCONSTANT:\n- A named storage location that holds a value\n- The value CANNOT be changed once set\n- Declared and assigned once\n- Example: const PI = 3.14159; (cannot be changed)\n\nWhy use constants?\n- Prevent accidental changes\n- Make code more readable\n- Easy to update values used throughout program", "hints": ["Variables allow flexibility in changing values", "Constants ensure values don't accidentally change", "Use const for values that shouldn't change", "Both must be named to reference in code"]},
  {"id": 10, "subject": "CSP", "year": 2022, "difficulty": "hard", "question": "Write pseudocode for a function that finds the largest number in a list of numbers.", "solution": "FUNCTION findMax(numberList):\n    IF numberList is empty:\n        RETURN \"Error: empty list\"\n    \n    max = numberList[0]  // Start with first number\n    \n    FOR EACH number in numberList:\n        IF number > max:\n            max = number\n    \n    RETURN max\nEND FUNCTION\n\nExample usage:\nresult = findMax([5, 2, 8, 1, 9, 3])\nresult would be 9", "hints": ["Initialize max with the first element", "Loop through remaining elements", "Compare each to current max", "Update max if a larger value is found", "Handle edge case: empty list"]}
];

let currentFRQ = null;
let progress = {};
let selectedSubject = 'All';

function initExamPrep() {
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
