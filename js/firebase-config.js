// Firebase Configuration
// Initialize Firebase with your project credentials
// Sign up at https://console.firebase.google.com to get these values

const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForPropel123456789",
  authDomain: "propel-app.firebaseapp.com",
  projectId: "propel-app",
  storageBucket: "propel-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to auth and database
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other modules
window.firebaseAuth = auth;
window.firebaseDB = db;
