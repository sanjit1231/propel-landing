// Supplement Manager - Handles college-specific supplement essay modals
// Manages displaying, editing, and saving supplement responses

class SupplementManager {
  constructor(collegesData, collegeSupplements) {
    this.collegesData = collegesData;
    this.collegeSupplements = collegeSupplements;
    this.currentCollegeId = null;
    this.supplementsData = this.loadSupplementsFromStorage();
  }

  loadSupplementsFromStorage() {
    const saved = localStorage.getItem('userSupplements');
    return saved ? JSON.parse(saved) : {};
  }

  saveSupplementsToStorage() {
    localStorage.setItem('userSupplements', JSON.stringify(this.supplementsData));
  }

  openSupplementModal(collegeId) {
    this.currentCollegeId = collegeId;
    const college = this.collegesData.find(c => c.id === collegeId);
    const supplements = this.collegeSupplements[collegeId];

    if (!college || !supplements) {
      alert('Supplement information not available for this college.');
      return;
    }

    // Create or show existing modal
    this.renderSupplementModal(college, supplements);
  }

  renderSupplementModal(college, supplements) {
    // Remove existing modal if present
    const existingModal = document.getElementById('supplementModal');
    if (existingModal) existingModal.remove();

    // Create modal structure
    const modal = document.createElement('div');
    modal.id = 'supplementModal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: linear-gradient(145deg, rgba(124,58,237,0.1), rgba(79,70,229,0.05));
      border: 1px solid rgba(124,58,237,0.2);
      border-radius: 20px;
      padding: 32px;
      max-width: 800px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      color: #fff;
      font-family: 'Outfit', sans-serif;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      border-bottom: 1px solid rgba(124,58,237,0.2);
      padding-bottom: 16px;
    `;

    const title = document.createElement('div');
    title.innerHTML = `
      <h2 style="font-size: 20px; font-weight: 600; margin: 0;">${college.name}</h2>
      <p style="font-size: 12px; color: var(--text-muted); margin: 4px 0 0 0;">Supplemental Essays</p>
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = '#fff';
    closeBtn.onmouseout = () => closeBtn.style.color = 'var(--text-muted)';
    closeBtn.onclick = () => modal.remove();

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Supplements form
    const form = document.createElement('div');

    supplements.supplements.forEach((prompt, index) => {
      const section = document.createElement('div');
      section.style.cssText = `
        margin-bottom: 28px;
      `;

      // Prompt title
      const promptTitle = document.createElement('label');
      promptTitle.style.cssText = `
        display: block;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--accent);
      `;
      promptTitle.textContent = `${index + 1}. ${prompt.title}`;

      // Character/word limit info
      const limitInfo = document.createElement('p');
      limitInfo.style.cssText = `
        font-size: 11px;
        color: var(--text-muted);
        margin: 0 0 8px 0;
      `;
      limitInfo.textContent = `Limit: ${prompt.limit} ${prompt.type}`;

      // Textarea
      const textarea = document.createElement('textarea');
      const key = `${college.name}_prompt_${prompt.id}`;
      const savedValue = this.supplementsData[key] || '';

      textarea.value = savedValue;
      textarea.placeholder = `Enter your response to ${prompt.title}...`;
      textarea.style.cssText = `
        width: 100%;
        min-height: 120px;
        padding: 12px;
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--border);
        border-radius: 8px;
        color: #fff;
        font-family: 'Outfit', sans-serif;
        font-size: 13px;
        resize: vertical;
        margin-bottom: 8px;
      `;

      // Character counter
      const counter = document.createElement('p');
      counter.style.cssText = `
        font-size: 11px;
        color: var(--text-muted);
        margin: 0;
        text-align: right;
      `;

      const updateCounter = () => {
        const count = textarea.value.length;
        const limit = prompt.limit;
        const percentage = (count / limit) * 100;
        let color = '#10b981'; // Green
        if (percentage > 90) color = '#f87171'; // Red if over
        if (percentage > 75) color = '#f59e0b'; // Orange if close

        counter.style.color = color;
        counter.textContent = `${count} / ${limit} ${prompt.type}`;
      };

      updateCounter();

      textarea.oninput = () => {
        updateCounter();
        this.supplementsData[key] = textarea.value;
        this.saveSupplementsToStorage();
      };

      section.appendChild(promptTitle);
      section.appendChild(limitInfo);
      section.appendChild(textarea);
      section.appendChild(counter);

      form.appendChild(section);
    });

    // Footer with save info
    const footer = document.createElement('div');
    footer.style.cssText = `
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid rgba(124,58,237,0.2);
      text-align: center;
    `;

    const saveMsg = document.createElement('p');
    saveMsg.style.cssText = `
      font-size: 12px;
      color: var(--text-muted);
      margin: 0;
    `;
    saveMsg.textContent = '✓ Responses are auto-saved';

    footer.appendChild(saveMsg);

    content.appendChild(header);
    content.appendChild(form);
    content.appendChild(footer);

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Close on background click
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    };
  }

  getSupplementResponse(collegeId, promptId) {
    const college = this.collegesData.find(c => c.id === collegeId);
    if (!college) return null;

    const key = `${college.name}_prompt_${promptId}`;
    return this.supplementsData[key] || '';
  }

  getSupplementsForCollege(collegeId) {
    const college = this.collegesData.find(c => c.id === collegeId);
    if (!college) return [];

    const supplements = this.collegeSupplements[collegeId];
    if (!supplements) return [];

    return supplements.supplements.map(prompt => ({
      promptId: prompt.id,
      title: prompt.title,
      response: this.getSupplementResponse(collegeId, prompt.id),
      hasResponse: !!(this.supplementsData[`${college.name}_prompt_${prompt.id}`])
    }));
  }

  clearAllSupplements() {
    this.supplementsData = {};
    this.saveSupplementsToStorage();
  }
}

// Create global instance (will be initialized after collegesData and collegeSupplements are loaded)
let supplementManager;
