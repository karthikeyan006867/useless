# 🎪 Royal Palace of Useless Challenges - Next.js Edition

A hilariously useless website built with Next.js, featuring multi-level progression, database integration, and the most ridiculous challenges ever created!

## 🚀 Features

### 🏆 15 Royal Levels
Progress from **Jester Apprentice** to **Cosmic Chaos Deity** by earning points through completing useless challenges!

### 🎯 30+ Hilarious Challenges
- **Button Chase**: Catch a runaway button 50 times
- **Useless Calculator**: Use a calculator that gives wrong answers
- **Emoji Password**: Create passwords with exactly 42 emojis
- **CAPTCHA from Hell**: Solve impossible CAPTCHAs
- **Time Waster 3000**: Wait for 1000 seconds doing nothing
- And many more absurd challenges!

### 🔐 Ridiculous Authentication
- Passwords must be 50+ characters with 10+ emojis
- Email must end with @worst.com, @useless.com, etc.
- CAPTCHA that only accepts WRONG answers
- Birth year must be in the FUTURE!

### 📊 Progress Tracking
- Firebase Realtime Database integration
- Track points, levels, and achievements
- Time wasted counter
- Useless click counter

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase (Optional)
Edit `.env.local` with your Firebase credentials if you want real database functionality:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Note**: The app works in demo mode without Firebase configuration!

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to experience the chaos!

### 4. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
useless/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   └── challenges/    # Challenge endpoints
│   ├── challenges/        # Challenge pages
│   ├── dashboard/         # User dashboard
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable components
├── lib/
│   ├── firebase.js        # Firebase configuration
│   └── levels.js          # Level & challenge system
├── public/                # Static assets
└── package.json
```

## 🎮 How to Play

1. **Sign Up** with a ridiculously complex account
2. **Complete Challenges** to earn points
3. **Level Up** through 15 royal ranks
4. **Unlock** new challenges as you progress
5. **Waste Time** and enjoy the chaos!

## 🌟 Level System

- 🤡 **Level 1-2**: Jester Territory (0-300 pts)
- 🎭 **Level 3-5**: Noble Nonsense (300-1000 pts)
- 👑 **Level 6-9**: Royal Ridiculousness (1000-4000 pts)
- 💎 **Level 10-12**: Grand Chaos (4000-10000 pts)
- 🌌 **Level 13-15**: COSMIC DEITY (10000-30000 pts)

## ⚠️ Warning

This website may cause:
- 🤯 Extreme confusion
- 😵 Temporary insanity
- 🎪 Uncontrollable laughter
- ⏰ Severe time loss
- 🤦 Excessive facepalming

## 🔧 Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **Firebase**: Realtime database & authentication
- **CSS**: Custom animations & gradients

## 📝 License

This project is licensed under the ISC License - feel free to waste your time with it!

## 🎉 Contributing

Want to make it even more useless? Feel free to contribute!

1. Fork the repository
2. Create your feature branch
3. Add more ridiculous challenges
4. Submit a pull request

## 🤡 Credits

Created for maximum uselessness and minimum productivity!

---

**Remember**: This website is intentionally terrible. That's the whole point! 🎪👑🎭
