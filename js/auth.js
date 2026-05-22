// Authentication Module
// Handles signup, login, logout, and user session management

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.initializeAuth();
  }

  initializeAuth() {
    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(async (user) => {
      this.currentUser = user;

      if (user) {
        // User is signed in, load their profile
        await this.loadUserProfile(user.uid);
      } else {
        // User is signed out
        this.currentUser = null;
      }

      // Notify all listeners of auth state change
      this.notifyListeners();
    });
  }

  async loadUserProfile(uid) {
    try {
      const doc = await firebase.firestore().collection('users').doc(uid).get();
      if (doc.exists) {
        this.currentUser.profile = doc.data();
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async signup(email, password, displayName) {
    try {
      // Create user account
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = result.user.uid;

      // Update display name
      await result.user.updateProfile({ displayName });

      // Create user document in Firestore
      await firebase.firestore().collection('users').doc(uid).set({
        email,
        displayName,
        createdAt: new Date(),
        collegesBookmarked: [],
        examPrepProgress: {},
        studyProgress: {},
        currentStreak: 0,
        lastStudyDate: null
      });

      return result.user;
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async login(email, password) {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(email, password);
      return result.user;
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      this.currentUser = null;
      this.notifyListeners();
    } catch (error) {
      throw new Error('Failed to logout');
    }
  }

  async resetPassword(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  getErrorMessage(code) {
    const errors = {
      'auth/email-already-in-use': 'Email already in use',
      'auth/invalid-email': 'Invalid email address',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Incorrect password',
      'auth/too-many-requests': 'Too many failed attempts. Try again later.'
    };
    return errors[code] || 'An error occurred';
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  onAuthChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentUser));
  }
}

// Create global instance
const authManager = new AuthManager();
