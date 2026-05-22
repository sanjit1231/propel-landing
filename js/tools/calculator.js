// Enhanced College Calculator - with essay and supplement management
// Matches student profiles against colleges considering 20+ factors

let collegesData = [
  {"id": 1, "name": "MIT", "location": "Cambridge, MA", "acceptanceRate": 3.2, "avgGPA": 3.98, "avgSAT": 1545, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.5, "essayImportance": 9},
  {"id": 2, "name": "Stanford University", "location": "Palo Alto, CA", "acceptanceRate": 3.7, "avgGPA": 3.96, "avgSAT": 1540, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.3, "essayImportance": 9},
  {"id": 3, "name": "Harvard University", "location": "Cambridge, MA", "acceptanceRate": 3.2, "avgGPA": 3.99, "avgSAT": 1550, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.4, "essayImportance": 10},
  {"id": 4, "name": "Yale University", "location": "New Haven, CT", "acceptanceRate": 4.0, "avgGPA": 3.97, "avgSAT": 1540, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.2, "essayImportance": 10},
  {"id": 5, "name": "Princeton University", "location": "Princeton, NJ", "acceptanceRate": 2.7, "avgGPA": 3.98, "avgSAT": 1550, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.3, "essayImportance": 10},
  {"id": 6, "name": "UChicago", "location": "Chicago, IL", "acceptanceRate": 5.3, "avgGPA": 3.96, "avgSAT": 1530, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.0, "essayImportance": 10},
  {"id": 7, "name": "Columbia University", "location": "New York, NY", "acceptanceRate": 3.6, "avgGPA": 3.97, "avgSAT": 1545, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.2, "essayImportance": 9},
  {"id": 8, "name": "University of Pennsylvania", "location": "Philadelphia, PA", "acceptanceRate": 3.9, "avgGPA": 3.97, "avgSAT": 1540, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 4.1, "essayImportance": 9},
  {"id": 9, "name": "Northwestern University", "location": "Evanston, IL", "acceptanceRate": 7.7, "avgGPA": 3.93, "avgSAT": 1520, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 85, "avgECs": 3.9, "essayImportance": 8},
  {"id": 10, "name": "Duke University", "location": "Durham, NC", "acceptanceRate": 5.8, "avgGPA": 3.95, "avgSAT": 1530, "type": "Private", "needBlind": false, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 80, "avgECs": 4.0, "essayImportance": 8},
  {"id": 11, "name": "Caltech", "location": "Pasadena, CA", "acceptanceRate": 2.7, "avgGPA": 3.98, "avgSAT": 1560, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 3.8, "essayImportance": 9},
  {"id": 12, "name": "Johns Hopkins University", "location": "Baltimore, MD", "acceptanceRate": 7.3, "avgGPA": 3.93, "avgSAT": 1530, "type": "Private", "needBlind": false, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 75, "avgECs": 3.9, "essayImportance": 8},
  {"id": 13, "name": "UC San Diego", "location": "La Jolla, CA", "acceptanceRate": 21.9, "avgGPA": 3.84, "avgSAT": 1330, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 60, "avgECs": 3.2, "essayImportance": 6},
  {"id": 14, "name": "Georgia Tech", "location": "Atlanta, GA", "acceptanceRate": 17.0, "avgGPA": 3.87, "avgSAT": 1490, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 55, "avgECs": 3.3, "essayImportance": 6},
  {"id": 15, "name": "University of Michigan", "location": "Ann Arbor, MI", "acceptanceRate": 18.3, "avgGPA": 3.86, "avgSAT": 1480, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 50, "avgECs": 3.2, "essayImportance": 5},
  {"id": 16, "name": "USC", "location": "Los Angeles, CA", "acceptanceRate": 10.9, "avgGPA": 3.91, "avgSAT": 1510, "type": "Private", "needBlind": false, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 70, "avgECs": 3.8, "essayImportance": 8},
  {"id": 17, "name": "Carnegie Mellon University", "location": "Pittsburgh, PA", "acceptanceRate": 9.6, "avgGPA": 3.92, "avgSAT": 1530, "type": "Private", "needBlind": false, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 75, "avgECs": 4.0, "essayImportance": 9},
  {"id": 18, "name": "University of Texas at Austin", "location": "Austin, TX", "acceptanceRate": 18.9, "avgGPA": 3.82, "avgSAT": 1430, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 45, "avgECs": 3.0, "essayImportance": 5},
  {"id": 19, "name": "UCLA", "location": "Los Angeles, CA", "acceptanceRate": 8.6, "avgGPA": 3.88, "avgSAT": 1480, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 55, "avgECs": 3.3, "essayImportance": 6},
  {"id": 20, "name": "UC Berkeley", "location": "Berkeley, CA", "acceptanceRate": 9.3, "avgGPA": 3.89, "avgSAT": 1500, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 60, "avgECs": 3.4, "essayImportance": 6},
  {"id": 21, "name": "Boston College", "location": "Boston, MA", "acceptanceRate": 21.2, "avgGPA": 3.84, "avgSAT": 1440, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 80, "avgECs": 3.6, "essayImportance": 7},
  {"id": 22, "name": "Washington University in St. Louis", "location": "St. Louis, MO", "acceptanceRate": 13.4, "avgGPA": 3.90, "avgSAT": 1500, "type": "Private", "needBlind": false, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 75, "avgECs": 3.7, "essayImportance": 7},
  {"id": 23, "name": "University of Virginia", "location": "Charlottesville, VA", "acceptanceRate": 15.3, "avgGPA": 3.87, "avgSAT": 1480, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 50, "avgECs": 3.3, "essayImportance": 6},
  {"id": 24, "name": "Emory University", "location": "Atlanta, GA", "acceptanceRate": 9.1, "avgGPA": 3.89, "avgSAT": 1490, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": false, "avgFinAidPercent": 80, "avgECs": 3.8, "essayImportance": 8},
  {"id": 25, "name": "Rice University", "location": "Houston, TX", "acceptanceRate": 8.7, "avgGPA": 3.90, "avgSAT": 1500, "type": "Private", "needBlind": true, "testOptional": false, "considerRace": true, "meetFullNeed": true, "avgFinAidPercent": 100, "avgECs": 3.9, "essayImportance": 9},
  {"id": 26, "name": "Arizona State University", "location": "Tempe, AZ", "acceptanceRate": 88.0, "avgGPA": 3.48, "avgSAT": 1170, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 40, "avgECs": 2.5, "essayImportance": 3},
  {"id": 27, "name": "University of Colorado Boulder", "location": "Boulder, CO", "acceptanceRate": 80.0, "avgGPA": 3.60, "avgSAT": 1230, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 40, "avgECs": 2.8, "essayImportance": 4},
  {"id": 28, "name": "University of Florida", "location": "Gainesville, FL", "acceptanceRate": 28.2, "avgGPA": 3.80, "avgSAT": 1380, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 45, "avgECs": 3.0, "essayImportance": 4},
  {"id": 29, "name": "Indiana University", "location": "Bloomington, IN", "acceptanceRate": 61.3, "avgGPA": 3.70, "avgSAT": 1270, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 40, "avgECs": 2.7, "essayImportance": 3},
  {"id": 30, "name": "University of Wisconsin-Madison", "location": "Madison, WI", "acceptanceRate": 50.0, "avgGPA": 3.75, "avgSAT": 1350, "type": "Public", "needBlind": false, "testOptional": true, "considerRace": false, "meetFullNeed": false, "avgFinAidPercent": 45, "avgECs": 2.9, "essayImportance": 4}
];

let userStats = {};
let selectedColleges = [];

function initCalculator() {
  const saved = localStorage.getItem('selectedColleges');
  if (saved) {
    selectedColleges = JSON.parse(saved);
  }

  // Initialize supplement manager
  if (typeof supplementManager === 'undefined' || !supplementManager) {
    supplementManager = new SupplementManager(collegesData, collegeSupplements);
  }

  // Load saved user data if available
  const savedUserStats = localStorage.getItem('userStats');
  if (savedUserStats) {
    try {
      userStats = JSON.parse(savedUserStats);
    } catch (e) {
      console.error('Error loading saved stats:', e);
    }
  }

  renderCalculatorUI();
}

function renderCalculatorUI() {
  const content = document.getElementById('calculatorContent');

  content.innerHTML = `
    <div style="max-width: 1100px;">
      <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 32px;">Your College List</h2>

      <!-- Input Form -->
      <div style="background: linear-gradient(145deg, rgba(124,58,237,0.1), rgba(79,70,229,0.05)); border: 1px solid rgba(124,58,237,0.2); border-radius: 20px; padding: 32px; margin-bottom: 40px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 24px;">Your Profile</h3>

        <!-- Academic Section -->
        <div style="margin-bottom: 32px;">
          <h4 style="font-size: 13px; font-weight: 600; color: var(--accent); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Academic</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">GPA (0.0 - 4.0)</label>
              <input type="number" id="gpaInput" min="0" max="4" step="0.01" placeholder="3.95" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;" />
            </div>
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">SAT Score (400 - 1600)</label>
              <input type="number" id="satInput" min="400" max="1600" step="10" placeholder="1520" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;" />
            </div>
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">Class Rank Percentile (0-100)</label>
              <input type="number" id="rankInput" min="0" max="100" step="1" placeholder="95" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;" />
            </div>
          </div>
          <div style="margin-top: 16px;">
            <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">AP/IB Courses Completed</label>
            <input type="number" id="apInput" min="0" max="20" step="1" placeholder="8" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;" />
          </div>
        </div>

        <!-- Activities Section -->
        <div style="margin-bottom: 32px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 12px;">
          <h4 style="font-size: 13px; font-weight: 600; color: var(--accent); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Extracurriculars & Activities</h4>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">Describe your 0-10 extracurriculars. The more detail, the better we can assess impact and leadership.</p>
          <div id="activitiesContainer" style="margin-bottom: 12px;"></div>
          <button onclick="addActivity()" style="width: 100%; padding: 10px; border: 1px solid rgba(124,58,237,0.3); background: rgba(124,58,237,0.05); color: var(--accent); border-radius: 8px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;">+ Add Activity</button>
        </div>

        <!-- Awards Section -->
        <div style="margin-bottom: 32px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 12px;">
          <h4 style="font-size: 13px; font-weight: 600; color: var(--accent); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Awards & Honors</h4>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">List 0-5 awards. Include level (school, state, national) and brief description.</p>
          <div id="awardsContainer" style="margin-bottom: 12px;"></div>
          <button onclick="addAward()" style="width: 100%; padding: 10px; border: 1px solid rgba(124,58,237,0.3); background: rgba(124,58,237,0.05); color: var(--accent); border-radius: 8px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;">+ Add Award</button>
        </div>

        <!-- Common App Essay Section -->
        <div style="margin-bottom: 32px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 12px;">
          <h4 style="font-size: 13px; font-weight: 600; color: var(--accent); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Common App Essay</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">Select Essay Prompt</label>
              <select id="commonAppPromptInput" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;">
                <option value="">Choose a prompt...</option>
                ${commonAppPrompts.map((p, i) => `<option value="${p.id}">Prompt ${p.id}: ${p.title}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">Word Count</label>
              <input type="text" id="essayWordCount" readonly placeholder="0 / 650 words" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: var(--text-muted); font-family: 'Outfit', sans-serif;" />
            </div>
          </div>
          <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">Paste your essay (recommended: 650 words)</label>
          <textarea id="commonAppEssayInput" placeholder="Paste your Common App essay here..." style="width: 100%; min-height: 200px; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 13px; resize: vertical; margin-bottom: 12px;"></textarea>
          <button onclick="analyzeEssay()" style="width: 100%; padding: 10px; background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2)); border: 1px solid rgba(124,58,237,0.2); color: var(--accent); border-radius: 8px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;">Analyze Essay Quality</button>
          <div id="essayFeedback" style="margin-top: 12px;"></div>
        </div>

        <!-- Demographics Section -->
        <div style="margin-bottom: 32px;">
          <h4 style="font-size: 13px; font-weight: 600; color: var(--accent); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Demographics & Context</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">Race/Ethnicity</label>
              <select id="raceInput" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;">
                <option value="none">Prefer not to answer</option>
                <option value="asian">Asian/Asian-American</option>
                <option value="black">Black/African-American</option>
                <option value="hispanic">Hispanic/Latino</option>
                <option value="white">White</option>
                <option value="multiracial">Multiracial</option>
                <option value="nativeam">Native American/Alaska Native</option>
              </select>
            </div>
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">First-Generation Student</label>
              <select id="firstGenInput" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">Legacy Status</label>
              <select id="legacyInput" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">Work Hours Per Week</label>
              <input type="number" id="workHoursInput" min="0" max="40" step="1" placeholder="0" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;" />
            </div>
          </div>
        </div>

        <button onclick="calculateMatches()" style="width: 100%; background: linear-gradient(135deg, var(--violet), var(--indigo)); border: none; color: #fff; padding: 14px; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 14px;">Calculate My Matches</button>
      </div>

      <!-- Results -->
      <div id="resultsContainer"></div>

      <!-- My School List -->
      <div style="margin-top: 40px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">My School List (${selectedColleges.length})</h3>
        <div id="mySchoolsList" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
          ${selectedColleges.length === 0 ? '<p style="color: var(--text-muted);">No schools added yet. Calculate matches to get started!</p>' : selectedColleges.map(collegeId => {
            const college = collegesData.find(c => c.id === collegeId);
            if (!college) return '';
            const hasSupplements = supplementManager && supplementManager.getSupplementsForCollege(collegeId).length > 0;
            return `
              <div style="background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.2); border-radius: 12px; padding: 16px; display: flex; flex-direction: column;">
                <div style="flex: 1;">
                  <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">${college.name}</div>
                  <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Acceptance: ${college.acceptanceRate}%</div>
                  ${hasSupplements ? '<div style="font-size: 11px; color: #10b981; margin-bottom: 8px;">✓ Supplements added</div>' : ''}
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  <button onclick="supplementManager.openSupplementModal(${college.id})" style="padding: 8px; background: rgba(124,58,237,0.2); border: none; color: var(--accent); border-radius: 6px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 12px;">View Supplements</button>
                  <button onclick="removeCollege(${college.id})" style="padding: 8px; background: rgba(239,68,68,0.2); border: none; color: #f87171; border-radius: 6px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 12px;">Remove</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // Render initial activities and awards
  renderActivitiesForm();
  renderAwardsForm();

  // Add event listeners
  document.getElementById('commonAppEssayInput').addEventListener('input', updateEssayWordCount);
  document.getElementById('gpaInput').addEventListener('change', saveCurrentStats);
  document.getElementById('satInput').addEventListener('change', saveCurrentStats);
  document.getElementById('rankInput').addEventListener('change', saveCurrentStats);
  document.getElementById('apInput').addEventListener('change', saveCurrentStats);
  document.getElementById('raceInput').addEventListener('change', saveCurrentStats);
  document.getElementById('firstGenInput').addEventListener('change', saveCurrentStats);
  document.getElementById('legacyInput').addEventListener('change', saveCurrentStats);
  document.getElementById('workHoursInput').addEventListener('change', saveCurrentStats);
  document.getElementById('commonAppPromptInput').addEventListener('change', saveCurrentStats);
  document.getElementById('commonAppEssayInput').addEventListener('change', saveCurrentStats);
}

function renderActivitiesForm() {
  const container = document.getElementById('activitiesContainer');
  const activities = userStats.activities || [];

  container.innerHTML = activities.map((activity, index) => `
    <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
      <input type="text" id="activity_name_${index}" placeholder="Activity name" value="${activity.name || ''}" style="width: 100%; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px; margin-bottom: 8px;" />
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
        <input type="text" id="activity_role_${index}" placeholder="Role/Position" value="${activity.role || ''}" style="padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px;" />
        <input type="number" id="activity_hours_${index}" placeholder="Hours/week" min="0" max="50" value="${activity.hours_per_week || ''}" style="padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px;" />
      </div>
      <textarea id="activity_impact_${index}" placeholder="Impact/achievement (2-3 sentences)" style="width: 100%; min-height: 60px; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px;">${activity.impact_description || ''}</textarea>
      <button onclick="removeActivity(${index})" style="width: 100%; margin-top: 8px; padding: 6px; background: rgba(239,68,68,0.2); border: none; color: #f87171; border-radius: 6px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 11px;">Remove</button>
    </div>
  `).join('');
}

function renderAwardsForm() {
  const container = document.getElementById('awardsContainer');
  const awards = userStats.awards_honors || [];

  container.innerHTML = awards.map((award, index) => `
    <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
      <input type="text" id="award_title_${index}" placeholder="Award title" value="${award.title || ''}" style="width: 100%; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px; margin-bottom: 8px;" />
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
        <select id="award_level_${index}" style="padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px;">
          <option value="school" ${award.level === 'school' ? 'selected' : ''}>School</option>
          <option value="state" ${award.level === 'state' ? 'selected' : ''}>State/Regional</option>
          <option value="national" ${award.level === 'national' ? 'selected' : ''}>National</option>
          <option value="international" ${award.level === 'international' ? 'selected' : ''}>International</option>
        </select>
        <input type="number" id="award_year_${index}" placeholder="Year" min="2010" max="2025" value="${award.year || ''}" style="padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px;" />
      </div>
      <textarea id="award_desc_${index}" placeholder="Brief description" style="width: 100%; min-height: 50px; padding: 8px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: #fff; font-family: 'Outfit', sans-serif; font-size: 12px;">${award.description || ''}</textarea>
      <button onclick="removeAward(${index})" style="width: 100%; margin-top: 8px; padding: 6px; background: rgba(239,68,68,0.2); border: none; color: #f87171; border-radius: 6px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 11px;">Remove</button>
    </div>
  `).join('');
}

function addActivity() {
  if (!userStats.activities) userStats.activities = [];
  if (userStats.activities.length < 10) {
    userStats.activities.push({ name: '', role: '', hours_per_week: 0, years: 0, impact_description: '' });
    renderActivitiesForm();
  }
}

function removeActivity(index) {
  if (userStats.activities) {
    userStats.activities.splice(index, 1);
    renderActivitiesForm();
  }
}

function addAward() {
  if (!userStats.awards_honors) userStats.awards_honors = [];
  if (userStats.awards_honors.length < 5) {
    userStats.awards_honors.push({ title: '', level: 'school', year: new Date().getFullYear(), description: '' });
    renderAwardsForm();
  }
}

function removeAward(index) {
  if (userStats.awards_honors) {
    userStats.awards_honors.splice(index, 1);
    renderAwardsForm();
  }
}

function updateEssayWordCount() {
  const essay = document.getElementById('commonAppEssayInput').value;
  const wordCount = essay.trim().split(/\s+/).filter(w => w.length > 0).length;
  document.getElementById('essayWordCount').value = `${wordCount} / 650 words`;
  userStats.commonApp = userStats.commonApp || {};
  userStats.commonApp.essay_text = essay;
  userStats.commonApp.word_count = wordCount;
}

function analyzeEssay() {
  const essayText = document.getElementById('commonAppEssayInput').value;
  if (!essayText.trim()) {
    alert('Please paste your essay first.');
    return;
  }

  if (typeof essayAnalyzer === 'undefined') {
    alert('Essay analyzer not loaded. Please refresh the page.');
    return;
  }

  const analysis = essayAnalyzer.analyze(essayText);

  userStats.commonApp = userStats.commonApp || {};
  userStats.commonApp.quality_score = analysis.score;

  const feedbackDiv = document.getElementById('essayFeedback');
  feedbackDiv.innerHTML = `
    <div style="background: rgba(255,255,255,0.03); border-left: 4px solid ${analysis.color}; padding: 16px; border-radius: 8px; margin-top: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 13px; font-weight: 600;">Essay Quality Score</span>
        <div style="font-size: 20px; font-weight: 700; color: ${analysis.color};">${analysis.score}/100</div>
      </div>
      <div style="font-size: 12px; color: var(--text-muted); line-height: 1.6;">
        ${analysis.feedback.map(f => `<p style="margin: 4px 0;">${f}</p>`).join('')}
      </div>
    </div>
  `;

  saveCurrentStats();
}

function saveCurrentStats() {
  // Collect all form data
  userStats.gpa = parseFloat(document.getElementById('gpaInput')?.value) || 0;
  userStats.sat = parseInt(document.getElementById('satInput')?.value) || 0;
  userStats.rank = parseInt(document.getElementById('rankInput')?.value) || 0;
  userStats.apCourses = parseInt(document.getElementById('apInput')?.value) || 0;

  // Collect activities
  const activities = [];
  let i = 0;
  while (document.getElementById(`activity_name_${i}`)) {
    activities.push({
      name: document.getElementById(`activity_name_${i}`)?.value || '',
      role: document.getElementById(`activity_role_${i}`)?.value || '',
      hours_per_week: parseInt(document.getElementById(`activity_hours_${i}`)?.value) || 0,
      impact_description: document.getElementById(`activity_impact_${i}`)?.value || ''
    });
    i++;
  }
  userStats.activities = activities;

  // Collect awards
  const awards = [];
  i = 0;
  while (document.getElementById(`award_title_${i}`)) {
    awards.push({
      title: document.getElementById(`award_title_${i}`)?.value || '',
      level: document.getElementById(`award_level_${i}`)?.value || 'school',
      year: parseInt(document.getElementById(`award_year_${i}`)?.value) || 0,
      description: document.getElementById(`award_desc_${i}`)?.value || ''
    });
    i++;
  }
  userStats.awards_honors = awards;

  userStats.race = document.getElementById('raceInput')?.value || 'none';
  userStats.firstGen = document.getElementById('firstGenInput')?.value === 'true';
  userStats.legacy = document.getElementById('legacyInput')?.value === 'true';
  userStats.workHours = parseInt(document.getElementById('workHoursInput')?.value) || 0;

  // Save to localStorage
  localStorage.setItem('userStats', JSON.stringify(userStats));
}

function calculateMatches() {
  saveCurrentStats();

  if (!userStats.gpa || !userStats.sat) {
    alert('Please enter at least GPA and SAT scores');
    return;
  }

  const matches = collegesData.map(college => {
    // Academic scoring (50 points max)
    const gpaDiff = Math.abs(college.avgGPA - userStats.gpa);
    const gpaMatch = Math.max(0, 25 - (gpaDiff * 10));
    const satDiff = Math.abs(college.avgSAT - userStats.sat);
    const satMatch = Math.max(0, 15 - (satDiff / 30));
    const rankMatch = Math.max(0, (userStats.rank - 70) * 0.1);
    const apMatch = Math.min(10, userStats.apCourses * 1.2);
    const academicScore = gpaMatch + satMatch + rankMatch + apMatch;

    // EC scoring with activity description analysis
    const hasLeadershipActivity = (userStats.activities || []).some(a =>
      /president|founder|leader|captain|director|head|chair/i.test(a.role + ' ' + a.impact_description)
    );
    const avgActivityImpact = (userStats.activities || []).reduce((sum, a) => sum + (a.impact_description.length > 50 ? 1 : 0), 0) / Math.max(userStats.activities?.length || 1, 1);
    const ecCount = userStats.activities?.length || 0;
    const ecMatch = Math.min(8, ecCount * 1.5) + (hasLeadershipActivity ? 3 : 1) + (avgActivityImpact * 2);
    const awardMatch = Math.min(7, (userStats.awards_honors?.length || 0) * 2);
    const extracurricularScore = Math.min(15, ecMatch + awardMatch);

    // Essay scoring
    const essayQuality = userStats.commonApp?.quality_score || 50;
    const essayScore = Math.min(10, (essayQuality / 100) * 10);

    // Demographics scoring
    let demographicScore = 0;
    if (college.considerRace && userStats.race !== 'none' && userStats.race !== 'white' && userStats.race !== 'asian') {
      demographicScore += 3;
    }
    if (userStats.firstGen) demographicScore += 3;
    if (college.type === 'Private' && userStats.legacy) demographicScore += 2;
    if (userStats.workHours > 10) demographicScore += 2;
    demographicScore = Math.min(10, demographicScore);

    // Supplement bonus
    const supplements = supplementManager?.getSupplementsForCollege(college.id) || [];
    const writtenSupplements = supplements.filter(s => s.hasResponse).length;
    const supplementBonus = writtenSupplements > 0 ? 2 : 0;

    const matchPercentage = Math.min(100, academicScore + extracurricularScore + essayScore + demographicScore + supplementBonus);

    // Categorization
    let category = 'Reach';
    if (college.acceptanceRate >= 50) category = 'Safety';
    else if (college.acceptanceRate >= 20) category = 'Target';
    else if (college.acceptanceRate >= 10) category = 'Likely';

    return {
      ...college,
      matchPercentage: Math.round(matchPercentage),
      category,
      academicScore: Math.round(academicScore),
      extracurricularScore: Math.round(extracurricularScore),
      essayScore: Math.round(essayScore),
      demographicScore: Math.round(demographicScore)
    };
  });

  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  renderResults(matches);
}

function renderResults(matches) {
  const container = document.getElementById('resultsContainer');

  const reach = matches.filter(c => c.category === 'Reach');
  const likely = matches.filter(c => c.category === 'Likely');
  const target = matches.filter(c => c.category === 'Target');
  const safety = matches.filter(c => c.category === 'Safety');

  let html = '<div>';

  if (reach.length > 0) {
    html += `
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 16px; font-weight: 600; color: #f87171; margin-bottom: 16px;">Reach Schools (${reach.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
          ${reach.map(college => renderCollegeCard(college)).join('')}
        </div>
      </div>
    `;
  }

  if (likely.length > 0) {
    html += `
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 16px; font-weight: 600; color: #a78bfa; margin-bottom: 16px;">Likely Schools (${likely.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
          ${likely.map(college => renderCollegeCard(college)).join('')}
        </div>
      </div>
    `;
  }

  if (target.length > 0) {
    html += `
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 16px; font-weight: 600; color: #fbbf24; margin-bottom: 16px;">Target Schools (${target.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
          ${target.map(college => renderCollegeCard(college)).join('')}
        </div>
      </div>
    `;
  }

  if (safety.length > 0) {
    html += `
      <div>
        <h3 style="font-size: 16px; font-weight: 600; color: #34d399; margin-bottom: 16px;">Safety Schools (${safety.length})</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
          ${safety.map(college => renderCollegeCard(college)).join('')}
        </div>
      </div>
    `;
  }

  html += '</div>';
  container.innerHTML = html;
}

function renderCollegeCard(college) {
  const isSelected = selectedColleges.includes(college.id);
  const statusColor = getStatusColor(college.category);

  return `
    <div style="background: linear-gradient(145deg, rgba(124,58,237,0.1), rgba(79,70,229,0.05)); border: 1px solid rgba(124,58,237,0.2); border-radius: 16px; padding: 20px; transition: all 0.3s;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
        <div>
          <div style="font-size: 15px; font-weight: 600; margin-bottom: 4px;">${college.name}</div>
          <div style="font-size: 12px; color: var(--text-muted);">${college.location} • ${college.type}</div>
        </div>
        <div style="background: ${statusColor}; color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;">${college.category}</div>
      </div>

      <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px; margin-bottom: 12px; font-size: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>Overall Match: <strong>${college.matchPercentage}%</strong></span>
        </div>
        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
          <div style="height: 100%; width: ${college.matchPercentage}%; background: linear-gradient(90deg, var(--violet), var(--indigo));"></div>
        </div>
      </div>

      <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; background: rgba(255,255,255,0.02); border-radius: 6px; padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>Academic: <strong>${college.academicScore}</strong></div>
        <div>ECs: <strong>${college.extracurricularScore}</strong></div>
        <div>Essays: <strong>${college.essayScore}</strong></div>
        <div>Demographics: <strong>${college.demographicScore}</strong></div>
      </div>

      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
        <div>Admit Rate: <strong>${college.acceptanceRate}%</strong></div>
        <div>Avg GPA: <strong>${college.avgGPA}</strong> | SAT: <strong>${college.avgSAT}</strong></div>
        <div style="margin-top: 8px; font-size: 11px;">
          ${college.needBlind ? '<span style="color: #34d399;">✓ Need-Blind</span>' : '<span style="color: #f87171;">✗ Not Need-Blind</span>'} •
          ${college.meetFullNeed ? '<span style="color: #34d399;">✓ Meets Full Need</span>' : '<span style="color: #f87171;">✗ Partial Aid</span>'}
        </div>
      </div>

      <button onclick="toggleCollege(${college.id})" style="width: 100%; padding: 10px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif; margin-bottom: 8px; ${isSelected ? 'background: var(--violet); color: #fff;' : 'background: rgba(124,58,237,0.2); color: var(--accent);'}">
        ${isSelected ? '✓ Added to List' : '+ Add to List'}
      </button>
    </div>
  `;
}

function toggleCollege(collegeId) {
  if (selectedColleges.includes(collegeId)) {
    removeCollege(collegeId);
  } else {
    selectedColleges.push(collegeId);
    localStorage.setItem('selectedColleges', JSON.stringify(selectedColleges));
    renderCalculatorUI();
  }
}

function removeCollege(collegeId) {
  selectedColleges = selectedColleges.filter(id => id !== collegeId);
  localStorage.setItem('selectedColleges', JSON.stringify(selectedColleges));
  renderCalculatorUI();
}

function getStatusColor(category) {
  switch(category) {
    case 'Reach': return '#ef4444';
    case 'Likely': return '#a78bfa';
    case 'Target': return '#f59e0b';
    case 'Safety': return '#10b981';
    default: return '#7c3aed';
  }
}
