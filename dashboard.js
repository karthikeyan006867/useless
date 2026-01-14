// Dashboard management with 25 achievements and 15 tasks

// Achievement definitions (25 total)
const achievementDefinitions = {
    firstVisit: { icon: '👋', title: 'First Victim', desc: 'Opened the worst website' },
    closedPopup: { icon: '🚫', title: 'Lucky Escape', desc: 'Closed an annoying popup' },
    clickedButton: { icon: '🖱️', title: 'Button Chaser', desc: 'Caught the runaway button' },
    filledForm: { icon: '📝', title: 'Form Warrior', desc: 'Completed the terrible form' },
    foundSecret: { icon: '🔍', title: 'Secret Hunter', desc: 'Found a hidden element' },
    clicked100Cookies: { icon: '🍪', title: 'Cookie Monster', desc: '100 cookie clicks' },
    survivedReset: { icon: '💪', title: 'Survivor', desc: 'Survived a form reset' },
    readFAQ: { icon: '❓', title: 'Knowledge Seeker', desc: 'Read the FAQ' },
    toggledDarkMode: { icon: '🌙', title: 'Mode Switcher', desc: 'Toggled dark mode' },
    konamiCode: { icon: '🎮', title: 'Code Master', desc: 'Entered the Konami code' },
    
    // NEW ACHIEVEMENTS
    signedUp: { icon: '✍️', title: 'Registration Victim', desc: 'Created an account' },
    signedIn: { icon: '🔐', title: 'Back for More', desc: 'Signed in successfully' },
    visited10Times: { icon: '🔄', title: 'Glutton for Punishment', desc: 'Visited 10 times' },
    spent1Hour: { icon: '⏰', title: 'Time Waster', desc: 'Spent 1 hour on site' },
    clicked1000Times: { icon: '👆', title: 'Click Champion', desc: '1000 total clicks' },
    completedAllTasks: { icon: '✅', title: 'Task Master', desc: 'Completed all tasks' },
    foundAllSecrets: { icon: '🗝️', title: 'Secret Collector', desc: 'Found all secrets' },
    survivedCaptcha: { icon: '🤖', title: 'Not a Robot', desc: 'Passed 5 CAPTCHAs' },
    changedPassword: { icon: '🔑', title: 'Security Conscious', desc: 'Changed password' },
    deletedAccount: { icon: '💀', title: 'Wise Decision', desc: 'Deleted your account' },
    sharedWebsite: { icon: '📢', title: 'Evil Spreader', desc: 'Shared with friends' },
    reportedBug: { icon: '🐛', title: 'Bug Reporter', desc: 'Reported a "bug"' },
    leftReview: { icon: '⭐', title: 'Reviewer', desc: 'Left a review' },
    watchedAd: { icon: '📺', title: 'Ad Victim', desc: 'Watched a fake ad' },
    boughtNothing: { icon: '💸', title: 'Smart Shopper', desc: 'Tried to buy nothing' }
};

// Task definitions (15 total)
const taskDefinitions = {
    clickButton50Times: { icon: '🖱️', title: 'Click Button 50 Times', desc: 'Chase that button!', reward: 100 },
    closePopup10Times: { icon: '❌', title: 'Close 10 Popups', desc: 'If you can...', reward: 150 },
    findHiddenLinks: { icon: '🔗', title: 'Find 5 Hidden Links', desc: 'They\'re nearly invisible', reward: 200 },
    spend30Minutes: { icon: '⏱️', title: 'Waste 30 Minutes', desc: 'Your time is worthless', reward: 300 },
    scrollToBottom: { icon: '⬇️', title: 'Scroll to Bottom', desc: 'If there is one', reward: 50 },
    clickAllNavLinks: { icon: '🧭', title: 'Click All Navigation Links', desc: 'Catch them first', reward: 120 },
    triggerAllAlerts: { icon: '⚠️', title: 'Trigger 7 Different Alerts', desc: 'Annoying achievement', reward: 180 },
    completeCaptcha5Times: { icon: '🎯', title: 'Complete 5 CAPTCHAs', desc: '2+2=5, remember?', reward: 250 },
    findEasterEgg: { icon: '🥚', title: 'Find the Easter Egg', desc: 'It\'s somewhere...', reward: 500 },
    watchLoadingBar: { icon: '⏳', title: 'Watch Loading Bar', desc: 'All the way to 99%', reward: 100 },
    readAllFAQ: { icon: '📖', title: 'Read Entire FAQ', desc: 'All 50 questions', reward: 200 },
    toggleDarkMode10Times: { icon: '💡', title: 'Toggle Dark Mode 10 Times', desc: 'It doesn\'t work anyway', reward: 80 },
    cookie1000Clicks: { icon: '🍪', title: 'Click Cookie 1000 Times', desc: 'Watch points decrease', reward: 400 },
    formSubmit10Times: { icon: '📋', title: 'Submit Form 10 Times', desc: 'Watch it reset', reward: 350 },
    shareOnSocial: { icon: '📱', title: 'Share on Social Media', desc: 'Spread the misery', reward: 150 }
};

// Initialize dashboard
window.addEventListener('load', () => {
    loadUserData();
    displayAchievements();
    displayTasks();
    loadLeaderboard();
    startTimeTracking();
});

function loadUserData() {
    const user = auth.currentUser;
    
    if (user) {
        // Firebase user
        getUserData(user.uid).then(data => {
            if (data) {
                displayUserInfo(data);
            }
        });
    } else {
        // Demo mode
        const demoUser = JSON.parse(localStorage.getItem('demoUser') || '{}');
        const demoData = JSON.parse(localStorage.getItem('demoUserData') || '{}');
        
        if (demoUser.username) {
            document.getElementById('welcomeMsg').textContent = 
                `Welcome back, ${demoUser.username}! 🎭`;
            
            // Initialize demo data if not exists
            if (!demoData.achievements) {
                demoData.achievements = initializeAchievements();
                demoData.tasks = initializeTasks();
                demoData.stats = {
                    timeSpent: 0,
                    totalClicks: 0,
                    frustrationLevel: 'MAXIMUM',
                    tasksCompleted: 0,
                    achievementsUnlocked: 0
                };
                localStorage.setItem('demoUserData', JSON.stringify(demoData));
            }
            
            displayUserInfo(demoData);
        }
    }
}

function displayUserInfo(data) {
    const achievements = data.achievements || {};
    const tasks = data.tasks || {};
    const stats = data.stats || {};
    
    // Count unlocked achievements
    const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
    document.getElementById('achievementCount').textContent = `${unlockedCount}/25`;
    
    // Count completed tasks
    const completedCount = Object.values(tasks).filter(t => t.completed).length;
    document.getElementById('tasksCompleted').textContent = `${completedCount}/15`;
    
    // Time wasted
    const minutes = Math.floor((stats.timeSpent || 0) / 60000);
    document.getElementById('timeWasted').textContent = `${minutes} min`;
    
    // Random frustration messages
    const frustrationMessages = [
        'MAXIMUM', 'CRITICAL', 'OVERLOAD', 'HELP ME', 'WHY AM I HERE?',
        '∞ INFINITE', '💀 DEAD INSIDE', '😱 SCREAMING', '🔥 BURNING'
    ];
    document.getElementById('frustrationLevel').textContent = 
        frustrationMessages[Math.floor(Math.random() * frustrationMessages.length)];
}

function displayAchievements() {
    const container = document.getElementById('achievementsList');
    const userData = getUserDataSync();
    const achievements = userData.achievements || initializeAchievements();
    
    container.innerHTML = '';
    
    Object.entries(achievementDefinitions).forEach(([key, def]) => {
        const isUnlocked = achievements[key]?.unlocked || false;
        const date = achievements[key]?.date;
        
        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? '' : 'locked'}`;
        item.innerHTML = `
            <div style="font-size: 48px;">${def.icon}</div>
            <div style="flex: 1;">
                <h3 style="margin: 0; color: ${isUnlocked ? '#000' : '#fff'};">${def.title}</h3>
                <p style="margin: 5px 0; color: ${isUnlocked ? '#333' : '#ccc'};">${def.desc}</p>
                ${isUnlocked && date ? `<small style="color: #666;">Unlocked: ${new Date(date).toLocaleDateString()}</small>` : ''}
                ${!isUnlocked ? '<small style="color: #999;">🔒 Locked</small>' : ''}
            </div>
        `;
        container.appendChild(item);
    });
}

function displayTasks() {
    const container = document.getElementById('tasksList');
    const userData = getUserDataSync();
    const tasks = userData.tasks || initializeTasks();
    
    container.innerHTML = '';
    
    Object.entries(taskDefinitions).forEach(([key, def]) => {
        const task = tasks[key] || { completed: false, progress: 0, total: def.total || 1 };
        const progress = (task.progress / task.total) * 100;
        
        const item = document.createElement('div');
        item.className = 'task-item';
        item.style.opacity = task.completed ? '0.6' : '1';
        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 36px;">${def.icon}</div>
                <div style="flex: 1;">
                    <h3 style="margin: 0;">${def.title} ${task.completed ? '✅' : ''}</h3>
                    <p style="margin: 5px 0;">${def.desc}</p>
                    <p style="margin: 5px 0; font-size: 14px;">Reward: ${def.reward} points</p>
                </div>
            </div>
            <div class="task-progress">
                <div class="task-progress-fill" style="width: ${progress}%"></div>
            </div>
            <p style="text-align: center; margin: 5px 0; font-size: 14px;">
                Progress: ${task.progress}/${task.total} ${task.completed ? '(Completed!)' : ''}
            </p>
        `;
        container.appendChild(item);
    });
}

function loadLeaderboard() {
    const container = document.getElementById('leaderboardList');
    
    // Demo leaderboard
    const demoLeaders = [
        { rank: 1, name: '🏆 ProSufferer420', score: 9999, achievements: 25 },
        { rank: 2, name: '😭 CryingUser', score: 7500, achievements: 22 },
        { rank: 3, name: '💀 DeadInside', score: 6800, achievements: 20 },
        { rank: 4, name: '🤡 WorstPlayer', score: 5200, achievements: 18 },
        { rank: 5, name: '😱 PanicMode', score: 4100, achievements: 15 },
        { rank: 6, name: '🔥 BurnoutKing', score: 3500, achievements: 12 },
        { rank: 7, name: '⚡ QuickRage', score: 2900, achievements: 10 },
        { rank: 8, name: '🎪 CircusViewer', score: 2100, achievements: 8 },
        { rank: 9, name: '💩 YouAreHere', score: 500, achievements: 3 },
        { rank: 10, name: '🆕 Newbie', score: 100, achievements: 1 }
    ];
    
    container.innerHTML = '';
    
    demoLeaders.forEach(leader => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
            <div>
                <strong style="font-size: 20px;">#${leader.rank}</strong>
                <span style="margin-left: 15px; font-size: 18px;">${leader.name}</span>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 20px; font-weight: bold;">${leader.score} pts</div>
                <div style="font-size: 14px; opacity: 0.8;">${leader.achievements} achievements</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function startTimeTracking() {
    setInterval(() => {
        const userData = getUserDataSync();
        if (userData.stats) {
            userData.stats.timeSpent = (userData.stats.timeSpent || 0) + 1000;
            saveUserDataSync(userData);
            
            // Update display
            const minutes = Math.floor(userData.stats.timeSpent / 60000);
            document.getElementById('timeWasted').textContent = `${minutes} min`;
            
            // Check for time-based achievement
            if (minutes >= 60 && !userData.achievements.spent1Hour.unlocked) {
                unlockAchievementLocal('spent1Hour');
            }
        }
    }, 1000);
}

function getUserDataSync() {
    const user = auth.currentUser;
    if (user) {
        // Would need to cache Firebase data
        return {};
    } else {
        return JSON.parse(localStorage.getItem('demoUserData') || '{}');
    }
}

function saveUserDataSync(data) {
    const user = auth.currentUser;
    if (user) {
        saveUserProgress(user.uid, data);
    } else {
        localStorage.setItem('demoUserData', JSON.stringify(data));
    }
}

function unlockAchievementLocal(key) {
    const userData = getUserDataSync();
    if (!userData.achievements[key].unlocked) {
        userData.achievements[key].unlocked = true;
        userData.achievements[key].date = Date.now();
        userData.stats.achievementsUnlocked++;
        saveUserDataSync(userData);
        displayAchievements();
        displayUserInfo(userData);
        alert(`🏆 Achievement Unlocked: ${achievementDefinitions[key].title}!`);
    }
}

function signOut() {
    if (confirm('Are you SURE? You\'ll lose all your suffering!')) {
        auth.signOut().then(() => {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }
}
