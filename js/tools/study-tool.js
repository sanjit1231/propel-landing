// Study Tool with SM-2 Spaced Repetition
// Learn 250+ cards with optimized spacing algorithm

let studyCards = [];
let cardStates = {};
let selectedDeck = 'All';
let currentCardIndex = 0;
let studySession = [];
let sessionStats = { studied: 0, easy: 0, good: 0, hard: 0, forgot: 0 };

async function initStudyTool() {
  // Load study cards
  try {
    const response = await fetch('js/data/study-cards.json');
    studyCards = await response.json();
  } catch (error) {
    console.error('Error loading cards:', error);
    document.getElementById('studyContent').innerHTML = '<p>Error loading data</p>';
    return;
  }

  // Load card states from localStorage
  const saved = localStorage.getItem('cardStates');
  if (saved) {
    cardStates = JSON.parse(saved);
  }

  // Initialize missing cards
  studyCards.forEach(card => {
    if (!cardStates[card.id]) {
      cardStates[card.id] = sm2.initCard();
    }
  });

  renderStudyUI();
}

function renderStudyUI() {
  const content = document.getElementById('studyContent');
  const subjects = ['All', ...new Set(studyCards.map(c => c.subject))];

  // Get due cards for selected deck
  const deckCards = selectedDeck === 'All' ? studyCards : studyCards.filter(c => c.subject === selectedDeck);
  const dueCards = deckCards.filter(c => sm2.isDue(cardStates[c.id]));
  const masteredCards = deckCards.filter(c => sm2.getMasteryPercentage(cardStates[c.id]) >= 80);

  if (studySession.length === 0) {
    // Study mode selection
    content.innerHTML = `
      <div style="max-width: 1000px;">
        <!-- Deck selector -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 40px;">
          ${subjects.map(subject => {
            const subjectCards = subject === 'All' ? studyCards : studyCards.filter(c => c.subject === subject);
            const duCards = subjectCards.filter(c => sm2.isDue(cardStates[c.id]));
            const isActive = selectedDeck === subject;
            return `
              <button onclick="selectDeck('${subject}')" style="padding: 20px; border: ${isActive ? '2px solid var(--violet)' : '1px solid var(--border)'}; background: ${isActive ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.02)'}; border-radius: 12px; color: #fff; cursor: pointer; font-family: 'Outfit', sans-serif; text-align: center;">
                <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">${subject}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${duCards.length}/${subjectCards.length} due</div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 40px;">
          <div style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); border-radius: 12px; padding: 20px; text-align: center;">
            <div style="font-size: 24px; font-weight: 800; color: #34d399;">${dueCards.length}</div>
            <div style="font-size: 12px; color: var(--text-muted);">Due for review</div>
          </div>
          <div style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.3); border-radius: 12px; padding: 20px; text-align: center;">
            <div style="font-size: 24px; font-weight: 800; color: var(--violet-light);">${masteredCards.length}</div>
            <div style="font-size: 12px; color: var(--text-muted);">Mastered</div>
          </div>
          <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 20px; text-align: center;">
            <div style="font-size: 24px; font-weight: 800; color: #60a5fa;">${deckCards.length}</div>
            <div style="font-size: 12px; color: var(--text-muted);">Total in deck</div>
          </div>
        </div>

        <!-- Start Study Button -->
        ${dueCards.length > 0 ? `
          <button onclick="startStudySession()" style="width: 100%; padding: 16px; background: linear-gradient(135deg, var(--violet), var(--indigo)); border: none; color: #fff; border-radius: 12px; font-weight: 600; font-size: 16px; cursor: pointer; font-family: 'Outfit', sans-serif;">
            Start Study Session (${dueCards.length} cards)
          </button>
        ` : `
          <div style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); border-radius: 12px; padding: 20px; text-align: center; color: #34d399;">
            ✓ All cards are mastered! Great job!
          </div>
        `}

        <!-- Card List -->
        <div style="margin-top: 40px;">
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Cards in ${selectedDeck}</h3>
          <div style="display: grid; gap: 8px; max-height: 400px; overflow-y: auto;">
            ${deckCards.map(card => {
              const state = cardStates[card.id];
              const mastery = sm2.getMasteryPercentage(state);
              const isDue = sm2.isDue(state);
              const daysLeft = sm2.daysUntilReview(state);
              return `
                <div style="background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.2); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
                  <div style="flex: 1;">
                    <div style="font-size: 13px; color: #fff; margin-bottom: 4px;">${card.question}</div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <div style="height: 4px; flex: 1; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
                        <div style="height: 100%; width: ${mastery}%; background: linear-gradient(90deg, var(--violet), var(--indigo));"></div>
                      </div>
                      <span style="font-size: 11px; color: var(--text-muted); min-width: 40px;">${mastery}%</span>
                    </div>
                  </div>
                  <div style="text-align: right; margin-left: 16px;">
                    <div style="font-size: 11px; color: var(--text-muted);">${isDue ? '📌 Due' : `📅 ${daysLeft}d`}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    // Study mode - flashcard
    renderFlashcard();
  }
}

function selectDeck(subject) {
  selectedDeck = subject;
  studySession = [];
  renderStudyUI();
}

function startStudySession() {
  const deckCards = selectedDeck === 'All' ? studyCards : studyCards.filter(c => c.subject === selectedDeck);
  studySession = deckCards.filter(c => sm2.isDue(cardStates[c.id]));
  currentCardIndex = 0;
  sessionStats = { studied: 0, easy: 0, good: 0, hard: 0, forgot: 0 };
  renderStudyUI();
}

function renderFlashcard() {
  const content = document.getElementById('studyContent');

  if (currentCardIndex >= studySession.length) {
    // Session complete
    renderSessionComplete();
    return;
  }

  const card = studySession[currentCardIndex];
  const state = cardStates[card.id];
  const isFlipped = state.flipped || false;

  content.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto;">
      <!-- Progress -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="color: var(--text-muted); font-size: 13px;">Card ${currentCardIndex + 1} of ${studySession.length}</span>
          <span style="color: var(--text-muted); font-size: 13px;">${card.subject}</span>
        </div>
        <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden;">
          <div style="height: 100%; width: ${((currentCardIndex) / studySession.length) * 100}%; background: linear-gradient(90deg, var(--violet), var(--indigo));"></div>
        </div>
      </div>

      <!-- Flashcard -->
      <div onclick="flipCard()" style="background: linear-gradient(145deg, rgba(124,58,237,0.15), rgba(79,70,229,0.08)); border: 1px solid rgba(124,58,237,0.25); border-radius: 20px; padding: 60px 40px; text-align: center; cursor: pointer; transition: all 0.3s; min-height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">${isFlipped ? '✓ Answer' : '? Question'}</div>
        <div style="font-size: 18px; color: #fff; line-height: 1.6; font-weight: ${isFlipped ? '400' : '600'};">
          ${isFlipped ? card.answer : card.question}
        </div>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 40px;">Click to ${isFlipped ? 'see question' : 'reveal answer'}</div>
      </div>

      <!-- Rating Buttons -->
      ${isFlipped ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; margin-top: 24px;">
          <button onclick="rateCard(0)" style="padding: 12px; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #f87171; border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif;">
            <div>Forgot</div>
            <div style="font-size: 11px; opacity: 0.8;">0</div>
          </button>
          <button onclick="rateCard(1)" style="padding: 12px; background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.2); color: #fbbf24; border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif;">
            <div>Hard</div>
            <div style="font-size: 11px; opacity: 0.8;">1</div>
          </button>
          <button onclick="rateCard(2)" style="padding: 12px; background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.2); color: #34d399; border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif;">
            <div>Good</div>
            <div style="font-size: 11px; opacity: 0.8;">2</div>
          </button>
          <button onclick="rateCard(3)" style="padding: 12px; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); color: var(--accent); border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif;">
            <div>Easy</div>
            <div style="font-size: 11px; opacity: 0.8;">3</div>
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function flipCard() {
  const card = studySession[currentCardIndex];
  const state = cardStates[card.id];
  state.flipped = !state.flipped;
  renderStudyUI();
}

function rateCard(quality) {
  const card = studySession[currentCardIndex];
  const oldState = cardStates[card.id];

  // Update card state with SM-2 algorithm
  cardStates[card.id] = sm2.calculateNextReview(oldState, quality);
  cardStates[card.id].flipped = false;

  // Track session stats
  sessionStats.studied++;
  if (quality === 0) sessionStats.forgot++;
  else if (quality === 1) sessionStats.hard++;
  else if (quality === 2) sessionStats.good++;
  else if (quality === 3) sessionStats.easy++;

  // Save to localStorage
  localStorage.setItem('cardStates', JSON.stringify(cardStates));

  // Move to next card
  currentCardIndex++;
  renderStudyUI();
}

function renderSessionComplete() {
  const content = document.getElementById('studyContent');
  const total = sessionStats.studied;
  const correctRate = total > 0 ? Math.round(((sessionStats.good + sessionStats.easy) / total) * 100) : 0;

  content.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
      <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">Session Complete!</h2>
      <p style="color: var(--text-muted); margin-bottom: 40px;">Great work on your studying!</p>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; margin-bottom: 40px;">
        <div style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #34d399;">${sessionStats.easy}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Easy</div>
        </div>
        <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #22c55e;">${sessionStats.good}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Good</div>
        </div>
        <div style="background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.2); border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #fbbf24;">${sessionStats.hard}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Hard</div>
        </div>
        <div style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 12px; padding: 16px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800; color: #f87171;">${sessionStats.forgot}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Forgot</div>
        </div>
      </div>

      <div style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.3); border-radius: 12px; padding: 24px; margin-bottom: 40px;">
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Success Rate</div>
        <div style="font-size: 32px; font-weight: 800; color: var(--violet-light);">${correctRate}%</div>
      </div>

      <button onclick="endStudySession()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, var(--violet), var(--indigo)); border: none; color: #fff; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif;">
        Continue Studying
      </button>
    </div>
  `;
}

function endStudySession() {
  studySession = [];
  currentCardIndex = 0;
  renderStudyUI();
}
