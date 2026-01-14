// Neon PostgreSQL Database Configuration
// Alternative to Firebase for server-side deployment

// For client-side (browser), continue using Firebase
// For server-side (Node.js), use this Neon PostgreSQL config

// Install: npm install @neondatabase/serverless

// Example usage with Neon Serverless Driver:
/*
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Query example
async function getUserData(userId) {
    const result = await sql`
        SELECT * FROM users WHERE id = ${userId}
    `;
    return result;
}

// Insert user
async function createUser(username, email) {
    const result = await sql`
        INSERT INTO users (username, email, created_at)
        VALUES (${username}, ${email}, NOW())
        RETURNING *
    `;
    return result[0];
}

// Update achievements
async function unlockAchievement(userId, achievementKey) {
    await sql`
        INSERT INTO user_achievements (user_id, achievement_key, unlocked_at)
        VALUES (${userId}, ${achievementKey}, NOW())
        ON CONFLICT (user_id, achievement_key) DO NOTHING
    `;
}
*/

// Database Schema for Neon PostgreSQL
const schema = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    time_spent_seconds INTEGER DEFAULT 0,
    total_clicks INTEGER DEFAULT 0,
    frustration_level VARCHAR(50) DEFAULT 'MAXIMUM'
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(10)
);

-- User achievements (junction table)
CREATE TABLE IF NOT EXISTS user_achievements (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_key VARCHAR(100) REFERENCES achievements(key),
    unlocked_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_key)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    total INTEGER DEFAULT 1,
    reward INTEGER DEFAULT 0
);

-- User tasks progress
CREATE TABLE IF NOT EXISTS user_tasks (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    task_key VARCHAR(100) REFERENCES tasks(key),
    progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    PRIMARY KEY (user_id, task_key)
);

-- User actions log
CREATE TABLE IF NOT EXISTS user_actions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Leaderboard (materialized view)
CREATE TABLE IF NOT EXISTS leaderboard (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
    score INTEGER DEFAULT 0,
    achievements_count INTEGER DEFAULT 0,
    tasks_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tasks_user ON user_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_user ON user_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
`;

// Insert initial achievements
const insertAchievements = `
INSERT INTO achievements (key, title, description, icon) VALUES
('firstVisit', 'First Victim', 'Opened the worst website', '👋'),
('closedPopup', 'Lucky Escape', 'Closed an annoying popup', '🚫'),
('clickedButton', 'Button Chaser', 'Caught the runaway button', '🖱️'),
('filledForm', 'Form Warrior', 'Completed the terrible form', '📝'),
('foundSecret', 'Secret Hunter', 'Found a hidden element', '🔍'),
('clicked100Cookies', 'Cookie Monster', '100 cookie clicks', '🍪'),
('survivedReset', 'Survivor', 'Survived a form reset', '💪'),
('readFAQ', 'Knowledge Seeker', 'Read the FAQ', '❓'),
('toggledDarkMode', 'Mode Switcher', 'Toggled dark mode', '🌙'),
('konamiCode', 'Code Master', 'Entered the Konami code', '🎮'),
('signedUp', 'Registration Victim', 'Created an account', '✍️'),
('signedIn', 'Back for More', 'Signed in successfully', '🔐'),
('visited10Times', 'Glutton for Punishment', 'Visited 10 times', '🔄'),
('spent1Hour', 'Time Waster', 'Spent 1 hour on site', '⏰'),
('clicked1000Times', 'Click Champion', '1000 total clicks', '👆'),
('completedAllTasks', 'Task Master', 'Completed all tasks', '✅'),
('foundAllSecrets', 'Secret Collector', 'Found all secrets', '🗝️'),
('survivedCaptcha', 'Not a Robot', 'Passed 5 CAPTCHAs', '🤖'),
('changedPassword', 'Security Conscious', 'Changed password', '🔑'),
('deletedAccount', 'Wise Decision', 'Deleted your account', '💀'),
('sharedWebsite', 'Evil Spreader', 'Shared with friends', '📢'),
('reportedBug', 'Bug Reporter', 'Reported a bug', '🐛'),
('leftReview', 'Reviewer', 'Left a review', '⭐'),
('watchedAd', 'Ad Victim', 'Watched a fake ad', '📺'),
('boughtNothing', 'Smart Shopper', 'Tried to buy nothing', '💸')
ON CONFLICT (key) DO NOTHING;
`;

// Insert initial tasks
const insertTasks = `
INSERT INTO tasks (key, title, description, total, reward) VALUES
('clickButton50Times', 'Click Button 50 Times', 'Chase that button!', 50, 100),
('closePopup10Times', 'Close 10 Popups', 'If you can...', 10, 150),
('findHiddenLinks', 'Find 5 Hidden Links', 'Nearly invisible', 5, 200),
('spend30Minutes', 'Waste 30 Minutes', 'Time is worthless', 30, 300),
('scrollToBottom', 'Scroll to Bottom', 'If there is one', 1, 50),
('clickAllNavLinks', 'Click All Nav Links', 'Catch them first', 5, 120),
('triggerAllAlerts', 'Trigger 7 Alerts', 'Annoying!', 7, 180),
('completeCaptcha5Times', 'Complete 5 CAPTCHAs', '2+2=5', 5, 250),
('findEasterEgg', 'Find Easter Egg', 'Somewhere...', 1, 500),
('watchLoadingBar', 'Watch Loading Bar', 'To 99%', 1, 100),
('readAllFAQ', 'Read All FAQ', '50 questions', 1, 200),
('toggleDarkMode10Times', 'Toggle Dark Mode 10x', 'Doesn''t work', 10, 80),
('cookie1000Clicks', 'Cookie 1000 Clicks', 'Points decrease', 1000, 400),
('formSubmit10Times', 'Form Submit 10x', 'Watch it reset', 10, 350),
('shareOnSocial', 'Share on Social', 'Spread misery', 1, 150)
ON CONFLICT (key) DO NOTHING;
`;

// Export for use
export { schema, insertAchievements, insertTasks };

// Note: For browser-based deployment, continue using Firebase
// This Neon config is for server-side implementations
console.log('Neon PostgreSQL configuration loaded');
console.log('Database URL:', process.env.DATABASE_URL ? 'Configured ✓' : 'Not configured');
