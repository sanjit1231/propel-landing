// Main App Router and Initialization
// Handles routing between pages and app state management

class AppRouter {
  constructor() {
    this.currentPage = 'home';
    this.authMode = 'login';
    this.initializeRouter();
    this.setupAuthListener();
  }

  initializeRouter() {
    // Handle hash-based routing
    window.addEventListener('hashchange', () => this.handleRoute());

    // Handle initial route
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const page = hash.split('/')[0] || 'home';

    // Check if user needs to be logged in
    const protectedPages = ['calculator', 'exam-prep', 'study', 'simulator'];

    if (protectedPages.includes(page) && !authManager.isLoggedIn()) {
      window.location.hash = '#/home';
      showAuthModal('login');
      return;
    }

    this.navigateToPage(page);
  }

  navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.app-page').forEach(p => {
      p.classList.remove('active');
    });

    // Show selected page
    const pageMap = {
      'home': 'homePage',
      'calculator': 'calculatorPage',
      'exam-prep': 'examPrepPage',
      'study': 'studyPage',
      'simulator': 'simulatorPage'
    };

    const pageId = pageMap[page];
    if (pageId) {
      const pageElement = document.getElementById(pageId);
      if (pageElement) {
        pageElement.classList.add('active');
        this.currentPage = page;

        // Load page content if needed
        this.loadPageContent(page);
      }
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  loadPageContent(page) {
    // This will be called when each page is loaded
    // Content will be injected by specific tool modules
    switch(page) {
      case 'calculator':
        if (typeof initCalculator === 'function') {
          initCalculator();
        }
        break;
      case 'exam-prep':
        if (typeof initExamPrep === 'function') {
          initExamPrep();
        }
        break;
      case 'study':
        if (typeof initStudyTool === 'function') {
          initStudyTool();
        }
        break;
      case 'simulator':
        if (typeof initSimulator === 'function') {
          initSimulator();
        }
        break;
    }
  }

  setupAuthListener() {
    // Listen for auth state changes
    authManager.onAuthChange((user) => {
      this.updateAuthUI(user);
    });
  }

  updateAuthUI(user) {
    const navLinks = document.getElementById('navLinks');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    if (user) {
      // User is logged in
      navLinks.style.display = 'flex';
      profileBtn.style.display = 'block';
      logoutBtn.style.display = 'block';
      loginBtn.style.display = 'none';
      signupBtn.style.display = 'none';

      // Set display name
      const displayName = user.displayName || user.email.split('@')[0];
      document.getElementById('userDisplayName').textContent = displayName;
    } else {
      // User is logged out
      navLinks.style.display = 'none';
      profileBtn.style.display = 'none';
      logoutBtn.style.display = 'none';
      loginBtn.style.display = 'block';
      signupBtn.style.display = 'block';
    }
  }
}

// Auth Modal Management
let authMode = 'login';

function showAuthModal(mode) {
  authMode = mode;
  const modal = document.getElementById('authModal');
  const form = document.getElementById('authForm');
  const nameInput = document.getElementById('authName');
  const submitBtn = document.getElementById('authSubmitBtn');
  const messageDiv = document.getElementById('authMessage');
  const toggleText = document.getElementById('authToggleText');
  const toggleBtn = document.querySelector('.auth-toggle button');

  // Clear previous messages
  messageDiv.innerHTML = '';

  if (mode === 'signup') {
    nameInput.style.display = 'block';
    nameInput.value = '';
    submitBtn.textContent = 'Sign Up';
    toggleText.textContent = 'Already have an account?';
    toggleBtn.textContent = 'Sign in';
  } else {
    nameInput.style.display = 'none';
    submitBtn.textContent = 'Sign In';
    toggleText.textContent = "Don't have an account?";
    toggleBtn.textContent = 'Sign up';
  }

  // Clear form
  form.reset();

  // Show modal
  modal.classList.add('show');
}

function hideAuthModal() {
  const modal = document.getElementById('authModal');
  modal.classList.remove('show');
}

function toggleAuthMode() {
  authMode = authMode === 'login' ? 'signup' : 'login';
  showAuthModal(authMode);
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  const name = document.getElementById('authName').value;
  const submitBtn = document.getElementById('authSubmitBtn');
  const messageDiv = document.getElementById('authMessage');

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = authMode === 'login' ? 'Signing In...' : 'Creating Account...';

  try {
    if (authMode === 'signup') {
      await authManager.signup(email, password, name);
      showMessage('Account created! Redirecting...', 'success', messageDiv);
      setTimeout(() => {
        hideAuthModal();
        window.location.hash = '#/home';
      }, 1500);
    } else {
      await authManager.login(email, password);
      showMessage('Logged in! Redirecting...', 'success', messageDiv);
      setTimeout(() => {
        hideAuthModal();
        window.location.hash = '#/home';
      }, 1500);
    }
  } catch (error) {
    showMessage(error.message, 'error', messageDiv);
    submitBtn.disabled = false;
    submitBtn.textContent = authMode === 'login' ? 'Sign In' : 'Sign Up';
  }
}

function showMessage(text, type, container) {
  const className = type === 'error' ? 'auth-error' : 'auth-success';
  container.innerHTML = `<div class="${className}">${text}</div>`;
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('authModal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideAuthModal();
    }
  });
});

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new AppRouter();
});
