// Firebase Configuration
// Replace with your Firebase config from https://console.firebase.google.com/
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    console.log("Firebase initialized successfully!");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Database reference
const database = firebase.database();
const auth = firebase.auth();

// User tracking
function trackUserAction(userId, action, data = {}) {
    const timestamp = Date.now();
    const actionRef = database.ref(`users/${userId}/actions/${timestamp}`);
    
    actionRef.set({
        action: action,
        data: data,
        timestamp: timestamp,
        date: new Date().toISOString()
    });
}

// Save user progress
function saveUserProgress(userId, progressData) {
    const progressRef = database.ref(`users/${userId}/progress`);
    progressRef.update(progressData);
}

// Get user data
function getUserData(userId) {
    return database.ref(`users/${userId}`).once('value')
        .then(snapshot => snapshot.val());
}

// Initialize user data
function initializeUser(userId, username, email) {
    const userRef = database.ref(`users/${userId}`);
    
    userRef.set({
        username: username,
        email: email,
        createdAt: Date.now(),
        achievements: initializeAchievements(),
        tasks: initializeTasks(),
        stats: {
            timeSpent: 0,
            totalClicks: 0,
            frustratio nLevel: 0,
            tasksCompleted: 0,
            achievementsUnlocked: 0
        }
    });
}

// Initialize all 25 achievements
function initializeAchievements() {
    return {
        // Existing achievements
        firstVisit: { unlocked: false, date: null },
        closedPopup: { unlocked: false, date: null },
        clickedButton: { unlocked: false, date: null },
        filledForm: { unlocked: false, date: null },
        foundSecret: { unlocked: false, date: null },
        clicked100Cookies: { unlocked: false, date: null },
        survivedReset: { unlocked: false, date: null },
        readFAQ: { unlocked: false, date: null },
        toggledDarkMode: { unlocked: false, date: null },
        konamiCode: { unlocked: false, date: null },
        
        // NEW ACHIEVEMENTS
        signedUp: { unlocked: false, date: null },
        signedIn: { unlocked: false, date: null },
        visited10Times: { unlocked: false, date: null },
        spent1Hour: { unlocked: false, date: null },
        clicked1000Times: { unlocked: false, date: null },
        completedAllTasks: { unlocked: false, date: null },
        foundAllSecrets: { unlocked: false, date: null },
        survivedCaptcha: { unlocked: false, date: null },
        changedPassword: { unlocked: false, date: null },
        deletedAccount: { unlocked: false, date: null },
        sharedWebsite: { unlocked: false, date: null },
        reportedBug: { unlocked: false, date: null },
        leftReview: { unlocked: false, date: null },
        watchedAd: { unlocked: false, date: null },
        boughtNothing: { unlocked: false, date: null }
    };
}

// Initialize all 15 tasks
function initializeTasks() {
    return {
        clickButton50Times: { completed: false, progress: 0, total: 50 },
        closePopup10Times: { completed: false, progress: 0, total: 10 },
        findHiddenLinks: { completed: false, progress: 0, total: 5 },
        spend30Minutes: { completed: false, progress: 0, total: 30 },
        scrollToBottom: { completed: false, progress: 0, total: 1 },
        clickAllNavLinks: { completed: false, progress: 0, total: 5 },
        triggerAllAlerts: { completed: false, progress: 0, total: 7 },
        completeCaptcha5Times: { completed: false, progress: 0, total: 5 },
        findEasterEgg: { completed: false, progress: 0, total: 1 },
        watchLoadingBar: { completed: false, progress: 0, total: 1 },
        readAllFAQ: { completed: false, progress: 0, total: 1 },
        toggleDarkMode10Times: { completed: false, progress: 0, total: 10 },
        cookie1000Clicks: { completed: false, progress: 0, total: 1000 },
        formSubmit10Times: { completed: false, progress: 0, total: 10 },
        shareOnSocial: { completed: false, progress: 0, total: 1 }
    };
}

// Update leaderboard
function updateLeaderboard(userId, score) {
    const leaderboardRef = database.ref('leaderboard/' + userId);
    leaderboardRef.update({
        score: score,
        timestamp: Date.now()
    });
}
