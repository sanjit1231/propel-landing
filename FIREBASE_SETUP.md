# Firebase Setup Guide for Propel

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Enter project name: `propel-app`
4. Click **Create project** (wait 30 seconds)
5. Click **Continue**

---

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **Get started**
3. Click **Email/Password** provider
4. Toggle **Enable** on
5. Click **Save**

---

## Step 3: Create Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **Create database**
3. Choose **Start in production mode** (or test mode for now)
4. Choose location: **us-central1** (or nearest to you)
5. Click **Create**

---

## Step 4: Get Your Credentials

1. Go to **Project Settings** (gear icon, top left)
2. Click **General** tab
3. Scroll down to **Your apps** → **Web** icon
4. Copy the entire `firebaseConfig` object

It looks like:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "propel-app.firebaseapp.com",
  projectId: "propel-app",
  storageBucket: "propel-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## Step 5: Update Config File

1. Open `js/firebase-config.js` in your project
2. Replace the entire config object with your credentials from Step 4
3. Save the file

---

## Step 6: Deploy to Vercel

```bash
cd /Users/skrishnamurthy26/propel-landing
git add js/firebase-config.js
git commit -m "Add real Firebase credentials"
git push origin main
```

Vercel auto-deploys within seconds!

---

## Step 7: Test It Works

1. Go to https://propel-landing-six.vercel.app/app.html
2. Click **Sign Up**
3. Create an account with email + password
4. You should see a dashboard
5. Check Firebase Console → **Firestore** → **users** collection (should see your user document created)
6. Check Firebase Console → **Authentication** (should see your user listed)

---

## Firestore Security Rules (Important!)

By default, Firestore is in **production mode** (secure but restrictive). For development, you can use test mode:

1. Go to **Firestore Database**
2. Click **Rules** tab
3. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /colleges/{doc=**} {
      allow read: if true;
    }
    match /frqs/{doc=**} {
      allow read: if true;
    }
    match /cards/{doc=**} {
      allow read: if true;
    }
  }
}
```

4. Click **Publish**

This allows:
- Users to only access their own data
- Everyone to read public data (colleges, FRQs, study cards)

---

## Done! ✅

Your Firebase is now connected. The app can now:
- Create user accounts
- Log users in/out
- Save progress to the cloud
- Sync across devices

Next: Build College Calculator! 🎓
