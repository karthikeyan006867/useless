# 🗄️ Database Setup Guide

## Two Database Options

### Option 1: Firebase Realtime Database (Client-Side) ✅ RECOMMENDED FOR GITHUB PAGES
Best for: Static hosting, GitHub Pages, simple deployment

**Pros:**
- No server required
- Works directly in browser
- Free tier available
- Real-time sync
- Easy setup

**Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project
3. Enable Realtime Database
4. Enable Email Authentication
5. Copy config to `firebase-config.js`

---

### Option 2: Neon PostgreSQL (Server-Side) ✅ CONFIGURED
Best for: Server deployments, Vercel, Node.js backends

**Pros:**
- More powerful queries
- Better for large datasets
- SQL database
- Serverless PostgreSQL
- Already configured!

**Your Neon Database:**
```
Database: neondb
Host: ep-odd-bar-a1541evk-pooler.ap-southeast-1.aws.neon.tech
User: neondb_owner
Region: ap-southeast-1 (Singapore)
```

---

## 🚀 Using Neon PostgreSQL

### 1. Install Dependencies

```bash
npm install @neondatabase/serverless dotenv
```

### 2. Database Schema

Run this SQL in your Neon console:

```sql
-- Users table
CREATE TABLE users (
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
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(10)
);

-- User achievements
CREATE TABLE user_achievements (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_key VARCHAR(100) REFERENCES achievements(key),
    unlocked_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_key)
);

-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    total INTEGER DEFAULT 1,
    reward INTEGER DEFAULT 0
);

-- User tasks
CREATE TABLE user_tasks (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    task_key VARCHAR(100) REFERENCES tasks(key),
    progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    PRIMARY KEY (user_id, task_key)
);

-- Leaderboard
CREATE TABLE leaderboard (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    score INTEGER DEFAULT 0,
    achievements_count INTEGER DEFAULT 0,
    tasks_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Populate Initial Data

```sql
-- Insert all 25 achievements
INSERT INTO achievements (key, title, description, icon) VALUES
('firstVisit', 'First Victim', 'Opened the worst website', '👋'),
('signedUp', 'Registration Victim', 'Created an account', '✍️'),
-- ... (see db-config.js for full list)
```

### 4. Server-Side API Example

Create `api/users.js`:

```javascript
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email } = req.body;
        
        const result = await sql`
            INSERT INTO users (username, email, password_hash)
            VALUES (${username}, ${email}, ${hashedPassword})
            RETURNING id, username, email, created_at
        `;
        
        res.json(result[0]);
    }
}
```

---

## 📊 Current Setup

Your `.env` file is already configured with:
- ✅ DATABASE_URL (pooled connection)
- ✅ DATABASE_URL_UNPOOLED (direct connection)
- ✅ All PostgreSQL connection parameters
- ✅ Vercel-compatible variables

---

## 🔒 Security

**IMPORTANT:** Never commit `.env` to GitHub!

The `.gitignore` file is configured to exclude:
- `.env`
- `.env.local`
- `.env.production`

Your database credentials are **already in .gitignore** ✓

---

## 🌐 Deployment Options

### GitHub Pages (Static) - Use Firebase
```bash
git push origin main
# Enable in Settings > Pages
```

### Vercel (Server + DB) - Use Neon
```bash
npm install -g vercel
vercel --prod
# Add environment variables in Vercel dashboard
```

### Netlify (Serverless) - Use Neon
```bash
netlify deploy --prod
# Add environment variables in Netlify dashboard
```

---

## 📈 Which Should You Use?

**Use Firebase if:**
- ✅ Deploying to GitHub Pages
- ✅ Want simple setup
- ✅ Don't need server
- ✅ Real-time features

**Use Neon if:**
- ✅ Have server/serverless functions
- ✅ Need complex queries
- ✅ Want PostgreSQL features
- ✅ Deploying to Vercel/Netlify

---

## 🎯 Recommended: Hybrid Approach

1. **Frontend (GitHub Pages):** Use Firebase for auth & real-time
2. **Backend API (Vercel):** Use Neon for analytics & leaderboard
3. **Best of both worlds!**

---

## ✅ Your Database is Ready!

All configuration files created:
- ✅ `.env` - Neon credentials
- ✅ `.gitignore` - Security
- ✅ `db-config.js` - Schema & setup
- ✅ `firebase-config.js` - Firebase config

Choose your deployment method and start tracking chaos! 🎪
