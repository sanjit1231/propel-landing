// College Calculator Tool
// Matches student stats against colleges and categorizes as Reach/Target/Safety

let collegesData = [
  {"id": 1, "name": "MIT", "location": "Cambridge, MA", "acceptanceRate": 3.2, "avgGPA": 3.98, "avgSAT": 1545},
  {"id": 2, "name": "Stanford University", "location": "Palo Alto, CA", "acceptanceRate": 3.7, "avgGPA": 3.96, "avgSAT": 1540},
  {"id": 3, "name": "Harvard University", "location": "Cambridge, MA", "acceptanceRate": 3.2, "avgGPA": 3.99, "avgSAT": 1550},
  {"id": 4, "name": "Yale University", "location": "New Haven, CT", "acceptanceRate": 4.0, "avgGPA": 3.97, "avgSAT": 1540},
  {"id": 5, "name": "Princeton University", "location": "Princeton, NJ", "acceptanceRate": 2.7, "avgGPA": 3.98, "avgSAT": 1550},
  {"id": 6, "name": "UChicago", "location": "Chicago, IL", "acceptanceRate": 5.3, "avgGPA": 3.96, "avgSAT": 1530},
  {"id": 7, "name": "Columbia University", "location": "New York, NY", "acceptanceRate": 3.6, "avgGPA": 3.97, "avgSAT": 1545},
  {"id": 8, "name": "University of Pennsylvania", "location": "Philadelphia, PA", "acceptanceRate": 3.9, "avgGPA": 3.97, "avgSAT": 1540},
  {"id": 9, "name": "Northwestern University", "location": "Evanston, IL", "acceptanceRate": 7.7, "avgGPA": 3.93, "avgSAT": 1520},
  {"id": 10, "name": "Duke University", "location": "Durham, NC", "acceptanceRate": 5.8, "avgGPA": 3.95, "avgSAT": 1530},
  {"id": 11, "name": "Caltech", "location": "Pasadena, CA", "acceptanceRate": 2.7, "avgGPA": 3.98, "avgSAT": 1560},
  {"id": 12, "name": "Johns Hopkins University", "location": "Baltimore, MD", "acceptanceRate": 7.3, "avgGPA": 3.93, "avgSAT": 1530},
  {"id": 13, "name": "UC San Diego", "location": "La Jolla, CA", "acceptanceRate": 21.9, "avgGPA": 3.84, "avgSAT": 1330},
  {"id": 14, "name": "Georgia Tech", "location": "Atlanta, GA", "acceptanceRate": 17.0, "avgGPA": 3.87, "avgSAT": 1490},
  {"id": 15, "name": "University of Michigan", "location": "Ann Arbor, MI", "acceptanceRate": 18.3, "avgGPA": 3.86, "avgSAT": 1480},
  {"id": 16, "name": "USC", "location": "Los Angeles, CA", "acceptanceRate": 10.9, "avgGPA": 3.91, "avgSAT": 1510},
  {"id": 17, "name": "Carnegie Mellon University", "location": "Pittsburgh, PA", "acceptanceRate": 9.6, "avgGPA": 3.92, "avgSAT": 1530},
  {"id": 18, "name": "University of Texas at Austin", "location": "Austin, TX", "acceptanceRate": 18.9, "avgGPA": 3.82, "avgSAT": 1430},
  {"id": 19, "name": "UCLA", "location": "Los Angeles, CA", "acceptanceRate": 8.6, "avgGPA": 3.88, "avgSAT": 1480},
  {"id": 20, "name": "UC Berkeley", "location": "Berkeley, CA", "acceptanceRate": 9.3, "avgGPA": 3.89, "avgSAT": 1500},
  {"id": 21, "name": "Boston College", "location": "Boston, MA", "acceptanceRate": 21.2, "avgGPA": 3.84, "avgSAT": 1440},
  {"id": 22, "name": "Washington University in St. Louis", "location": "St. Louis, MO", "acceptanceRate": 13.4, "avgGPA": 3.90, "avgSAT": 1500},
  {"id": 23, "name": "University of Virginia", "location": "Charlottesville, VA", "acceptanceRate": 15.3, "avgGPA": 3.87, "avgSAT": 1480},
  {"id": 24, "name": "Emory University", "location": "Atlanta, GA", "acceptanceRate": 9.1, "avgGPA": 3.89, "avgSAT": 1490},
  {"id": 25, "name": "Rice University", "location": "Houston, TX", "acceptanceRate": 8.7, "avgGPA": 3.90, "avgSAT": 1500},
  {"id": 26, "name": "Arizona State University", "location": "Tempe, AZ", "acceptanceRate": 88.0, "avgGPA": 3.48, "avgSAT": 1170},
  {"id": 27, "name": "University of Colorado Boulder", "location": "Boulder, CO", "acceptanceRate": 80.0, "avgGPA": 3.60, "avgSAT": 1230},
  {"id": 28, "name": "University of Florida", "location": "Gainesville, FL", "acceptanceRate": 28.2, "avgGPA": 3.80, "avgSAT": 1380},
  {"id": 29, "name": "Indiana University", "location": "Bloomington, IN", "acceptanceRate": 61.3, "avgGPA": 3.70, "avgSAT": 1270},
  {"id": 30, "name": "University of Wisconsin-Madison", "location": "Madison, WI", "acceptanceRate": 50.0, "avgGPA": 3.75, "avgSAT": 1350}
];

let userStats = {};
let selectedColleges = [];

function initCalculator() {
  // Load user's saved selections from localStorage
  const saved = localStorage.getItem('selectedColleges');
  if (saved) {
    selectedColleges = JSON.parse(saved);
  }

  renderCalculatorUI();
}

function renderCalculatorUI() {
  const content = document.getElementById('calculatorContent');

  content.innerHTML = `
    <div style="max-width: 800px;">
      <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 32px;">Your College List</h2>

      <!-- Input Form -->
      <div style="background: linear-gradient(145deg, rgba(124,58,237,0.1), rgba(79,70,229,0.05)); border: 1px solid rgba(124,58,237,0.2); border-radius: 20px; padding: 32px; margin-bottom: 40px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 24px;">Your Stats</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">GPA (0.0 - 4.0)</label>
            <input type="number" id="gpaInput" min="0" max="4" step="0.01" placeholder="3.95" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;" />
          </div>
          <div>
            <label style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 8px;">SAT Score (400 - 1600)</label>
            <input type="number" id="satInput" min="400" max="1600" step="10" placeholder="1520" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-family: 'Outfit', sans-serif;" />
          </div>
        </div>
        <button onclick="calculateMatches()" style="margin-top: 24px; width: 100%; background: linear-gradient(135deg, var(--violet), var(--indigo)); border: none; color: #fff; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif;">Calculate Matches</button>
      </div>

      <!-- Results -->
      <div id="resultsContainer"></div>

      <!-- My School List -->
      <div style="margin-top: 40px;">
        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">My School List (${selectedColleges.length})</h3>
        <div id="mySchoolsList" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px;">
          ${selectedColleges.length === 0 ? '<p style="color: var(--text-muted);">No schools added yet. Calculate matches to get started!</p>' : selectedColleges.map(collegeId => {
            const college = collegesData.find(c => c.id === collegeId);
            if (!college) return '';
            return `
              <div style="background: rgba(124,58,237,0.05); border: 1px solid rgba(124,58,237,0.2); border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 14px; font-weight: 600;">${college.name}</div>
                  <div style="font-size: 12px; color: var(--text-muted);">Acceptance: ${college.acceptanceRate}%</div>
                  <div style="font-size: 11px; background: ${getStatusColor(college.category)}; color: #fff; padding: 4px 8px; border-radius: 999px; display: inline-block; margin-top: 4px;">${college.category}</div>
                </div>
                <button onclick="removeCollege(${college.id})" style="background: rgba(239,68,68,0.2); border: none; color: #f87171; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 12px;">Remove</button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // Add event listeners for inputs
  document.getElementById('gpaInput').addEventListener('change', saveCurrentStats);
  document.getElementById('satInput').addEventListener('change', saveCurrentStats);
}

function saveCurrentStats() {
  userStats = {
    gpa: parseFloat(document.getElementById('gpaInput').value) || 0,
    sat: parseInt(document.getElementById('satInput').value) || 0
  };
}

function calculateMatches() {
  saveCurrentStats();

  if (!userStats.gpa || !userStats.sat) {
    alert('Please enter both GPA and SAT scores');
    return;
  }

  // Calculate match percentages for each college
  const matches = collegesData.map(college => {
    let matchPercentage = 0;

    // GPA comparison (50 points max)
    const gpaDiff = Math.abs(college.avgGPA - userStats.gpa);
    const gpaMatch = Math.max(0, 50 - (gpaDiff * 10));

    // SAT comparison (50 points max)
    const satDiff = Math.abs(college.avgSAT - userStats.sat);
    const satMatch = Math.max(0, 50 - (satDiff / 20));

    matchPercentage = gpaMatch + satMatch;

    // Determine category based on acceptance rate
    let category = 'Reach';
    if (college.acceptanceRate > 30) category = 'Safety';
    else if (college.acceptanceRate > 15) category = 'Target';

    return {
      ...college,
      matchPercentage: Math.round(matchPercentage),
      category
    };
  });

  // Sort by match percentage
  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Render results
  renderResults(matches);
}

function renderResults(matches) {
  const container = document.getElementById('resultsContainer');

  const reach = matches.filter(c => c.category === 'Reach');
  const target = matches.filter(c => c.category === 'Target');
  const safety = matches.filter(c => c.category === 'Safety');

  let html = '<div>';

  // Reach schools
  html += `
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 16px; font-weight: 600; color: #f87171; margin-bottom: 16px;">Reach Schools (${reach.length})</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
        ${reach.map(college => renderCollegeCard(college)).join('')}
      </div>
    </div>
  `;

  // Target schools
  html += `
    <div style="margin-bottom: 32px;">
      <h3 style="font-size: 16px; font-weight: 600; color: #fbbf24; margin-bottom: 16px;">Target Schools (${target.length})</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
        ${target.map(college => renderCollegeCard(college)).join('')}
      </div>
    </div>
  `;

  // Safety schools
  html += `
    <div>
      <h3 style="font-size: 16px; font-weight: 600; color: #34d399; margin-bottom: 16px;">Safety Schools (${safety.length})</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
        ${safety.map(college => renderCollegeCard(college)).join('')}
      </div>
    </div>
  `;

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
          <div style="font-size: 12px; color: var(--text-muted);">${college.location}</div>
        </div>
        <div style="background: ${statusColor}; color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;">${college.category}</div>
      </div>

      <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px; margin-bottom: 12px; font-size: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>Your Match: <strong>${college.matchPercentage}%</strong></span>
        </div>
        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
          <div style="height: 100%; width: ${college.matchPercentage}%; background: linear-gradient(90deg, var(--violet), var(--indigo));"></div>
        </div>
      </div>

      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
        <div>Admit Rate: <strong>${college.acceptanceRate}%</strong></div>
        <div>Avg GPA: <strong>${college.avgGPA}</strong> | SAT: <strong>${college.avgSAT}</strong></div>
      </div>

      <button onclick="toggleCollege(${college.id})" style="width: 100%; padding: 10px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-family: 'Outfit', sans-serif; ${isSelected ? 'background: var(--violet); color: #fff;' : 'background: rgba(124,58,237,0.2); color: var(--accent);'}">
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
    // Re-render to show the updated list
    document.getElementById('mySchoolsList').innerHTML = 'Updating...';
    setTimeout(() => renderCalculatorUI(), 100);
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
    case 'Target': return '#f59e0b';
    case 'Safety': return '#10b981';
    default: return '#7c3aed';
  }
}
