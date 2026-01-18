// Multi-level progression system with royal funny challenges

export const LEVELS = [
  {
    id: 1,
    name: "🤡 Jester Apprentice",
    description: "Welcome to the circus of uselessness!",
    requiredPoints: 0,
    color: "#ff69b4",
    unlocks: ["button-chase", "useless-calculator"]
  },
  {
    id: 2,
    name: "🎪 Carnival Clown",
    description: "You're getting worse at this!",
    requiredPoints: 100,
    color: "#ffd700",
    unlocks: ["emoji-password", "backwards-typing"]
  },
  {
    id: 3,
    name: "🎭 Comedy Magician",
    description: "Master of pointless magic tricks!",
    requiredPoints: 300,
    color: "#9370db",
    unlocks: ["invisible-button", "captcha-hell"]
  },
  {
    id: 4,
    name: "👑 Royal Jester",
    description: "Serving uselessness to the kingdom!",
    requiredPoints: 600,
    color: "#ff4500",
    unlocks: ["time-waster-3000", "paradox-form"]
  },
  {
    id: 5,
    name: "🏰 Duke of Chaos",
    description: "Noble chaos spreader!",
    requiredPoints: 1000,
    color: "#00ced1",
    unlocks: ["infinite-scroll", "random-redirector"]
  },
  {
    id: 6,
    name: "🎨 Earl of Absurdity",
    description: "Creator of magnificent nonsense!",
    requiredPoints: 1500,
    color: "#ff1493",
    unlocks: ["glitch-simulator", "reverse-psychology"]
  },
  {
    id: 7,
    name: "⚔️ Marquess of Mayhem",
    description: "Weapons-grade uselessness!",
    requiredPoints: 2200,
    color: "#ff6347",
    unlocks: ["chaos-generator", "anti-productivity"]
  },
  {
    id: 8,
    name: "🎺 Viscount of Vexation",
    description: "Annoying with style!",
    requiredPoints: 3000,
    color: "#9400d3",
    unlocks: ["vex-o-matic", "infinite-loading"]
  },
  {
    id: 9,
    name: "🦋 Count of Confusion",
    description: "Lost? Good!",
    requiredPoints: 4000,
    color: "#20b2aa",
    unlocks: ["labyrinth-menu", "riddle-login"]
  },
  {
    id: 10,
    name: "🌟 Archduke of Anarchy",
    description: "Chaos is your kingdom!",
    requiredPoints: 5500,
    color: "#ff0000",
    unlocks: ["ultimate-chaos", "reality-breaker"]
  },
  {
    id: 11,
    name: "💎 Grand Duke of Delirium",
    description: "Reality is optional!",
    requiredPoints: 7500,
    color: "#00ffff",
    unlocks: ["dream-weaver", "logic-destroyer"]
  },
  {
    id: 12,
    name: "👸 Royal Highness of Ridiculousness",
    description: "Bow before absurdity!",
    requiredPoints: 10000,
    color: "#ffd700",
    unlocks: ["royal-nonsense", "throne-of-chaos"]
  },
  {
    id: 13,
    name: "🔱 Supreme Monarch of Madness",
    description: "All hail the king/queen of useless!",
    requiredPoints: 15000,
    color: "#ff00ff",
    unlocks: ["divine-chaos", "reality-editor"]
  },
  {
    id: 14,
    name: "⚡ Emperor of Entropy",
    description: "Disorder incarnate!",
    requiredPoints: 22000,
    color: "#ff8c00",
    unlocks: ["entropy-bomb", "chaos-portal"]
  },
  {
    id: 15,
    name: "🌌 Cosmic Chaos Deity",
    description: "You've transcended uselessness itself!",
    requiredPoints: 30000,
    color: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
    unlocks: ["universe-breaker", "omnipotent-nonsense"]
  }
];

export const CHALLENGES = {
  "button-chase": {
    id: "button-chase",
    name: "Catch the Runaway Button",
    description: "Click the button 50 times as it escapes from you!",
    points: 20,
    difficulty: "Easy",
    level: 1,
    icon: "🏃"
  },
  "useless-calculator": {
    id: "useless-calculator",
    name: "Broken Calculator",
    description: "Use a calculator that gives random wrong answers!",
    points: 15,
    difficulty: "Easy",
    level: 1,
    icon: "🔢"
  },
  "emoji-password": {
    id: "emoji-password",
    name: "Emoji Password Madness",
    description: "Create a password with exactly 42 emojis!",
    points: 30,
    difficulty: "Medium",
    level: 2,
    icon: "😀"
  },
  "backwards-typing": {
    id: "backwards-typing",
    name: "Backwards Typing Test",
    description: "Type a sentence but it appears backwards!",
    points: 25,
    difficulty: "Medium",
    level: 2,
    icon: "⬅️"
  },
  "invisible-button": {
    id: "invisible-button",
    name: "Find the Invisible Button",
    description: "Click 100 times to find the hidden button!",
    points: 40,
    difficulty: "Hard",
    level: 3,
    icon: "👻"
  },
  "captcha-hell": {
    id: "captcha-hell",
    name: "CAPTCHA from Hell",
    description: "Solve 20 impossible CAPTCHAs!",
    points: 50,
    difficulty: "Hard",
    level: 3,
    icon: "🔒"
  },
  "time-waster-3000": {
    id: "time-waster-3000",
    name: "Time Waster 3000",
    description: "Wait for 1000 seconds doing absolutely nothing!",
    points: 75,
    difficulty: "Extreme",
    level: 4,
    icon: "⏰"
  },
  "paradox-form": {
    id: "paradox-form",
    name: "Paradox Form",
    description: "Fill a form with contradictory requirements!",
    points: 60,
    difficulty: "Extreme",
    level: 4,
    icon: "📝"
  },
  "infinite-scroll": {
    id: "infinite-scroll",
    name: "Infinite Scroll to Nothing",
    description: "Scroll to reach the unreachable bottom!",
    points: 90,
    difficulty: "Impossible",
    level: 5,
    icon: "📜"
  },
  "random-redirector": {
    id: "random-redirector",
    name: "Random Redirect Maze",
    description: "Navigate through 50 random redirects!",
    points: 85,
    difficulty: "Impossible",
    level: 5,
    icon: "🌀"
  }
};

export const getLevelByPoints = (points) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].requiredPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
};

export const getUnlockedChallenges = (points) => {
  const currentLevel = getLevelByPoints(points);
  const levelIndex = LEVELS.findIndex(l => l.id === currentLevel.id);
  
  let unlocked = [];
  for (let i = 0; i <= levelIndex; i++) {
    unlocked = [...unlocked, ...LEVELS[i].unlocks];
  }
  
  return unlocked.map(id => CHALLENGES[id]).filter(Boolean);
};

export const calculateProgress = (points) => {
  const currentLevel = getLevelByPoints(points);
  const levelIndex = LEVELS.findIndex(l => l.id === currentLevel.id);
  
  if (levelIndex === LEVELS.length - 1) {
    return { current: currentLevel, next: null, progress: 100 };
  }
  
  const nextLevel = LEVELS[levelIndex + 1];
  const pointsNeeded = nextLevel.requiredPoints - currentLevel.requiredPoints;
  const pointsEarned = points - currentLevel.requiredPoints;
  const progress = Math.min(100, (pointsEarned / pointsNeeded) * 100);
  
  return { current: currentLevel, next: nextLevel, progress };
};
