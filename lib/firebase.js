import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, set, get, update, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemoKey123",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "useless-demo.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://useless-demo-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "useless-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "useless-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abc123"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);
const auth = getAuth(app);

// Database helper functions
export const saveUserData = async (userId, data) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    await set(userRef, {
      ...data,
      createdAt: Date.now(),
      lastActive: Date.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving user:', error);
    return { success: false, error: error.message };
  }
};

export const getUserData = async (userId) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const updateUserProgress = async (userId, progressData) => {
  try {
    const progressRef = ref(database, `users/${userId}/progress`);
    await update(progressRef, {
      ...progressData,
      lastUpdated: Date.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating progress:', error);
    return { success: false, error: error.message };
  }
};

export const saveChallengeResult = async (userId, challengeId, result) => {
  try {
    const challengeRef = ref(database, `users/${userId}/challenges/${challengeId}`);
    await set(challengeRef, {
      ...result,
      completedAt: Date.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error saving challenge:', error);
    return { success: false, error: error.message };
  }
};

export const trackUserAction = async (userId, action, data = {}) => {
  try {
    const actionsRef = ref(database, `users/${userId}/actions`);
    const newActionRef = push(actionsRef);
    await set(newActionRef, {
      action,
      data,
      timestamp: Date.now(),
      date: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking action:', error);
  }
};

export { database, auth };
export default app;
