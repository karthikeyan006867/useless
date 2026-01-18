'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLevelByPoints, calculateProgress, getUnlockedChallenges } from '../../lib/levels';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [levelData, setLevelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeWasted, setTimeWasted] = useState(0);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    if (!userId) {
      router.push('/signin');
      return;
    }

    setUser({ id: userId, username });
    loadUserData(userId);

    // Track time wasted
    const timer = setInterval(() => {
      setTimeWasted(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const loadUserData = async (userId) => {
    try {
      const response = await fetch(`/api/auth/user?userId=${userId}`);
      const data = await response.json();
      
      if (data.success && data.user) {
        const userPoints = data.user.points || 0;
        setPoints(userPoints);
        setClicks(data.user.totalClicks || 0);
        
        const progress = calculateProgress(userPoints);
        setLevelData(progress);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUselessClick = async () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    
    // Random chance to gain points
    if (Math.random() < 0.1) {
      const pointsGained = Math.floor(Math.random() * 10) + 1;
      const newPoints = points + pointsGained;
      setPoints(newPoints);
      
      const progress = calculateProgress(newPoints);
      setLevelData(progress);

      // Save to database
      try {
        await fetch('/api/auth/update-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            points: newPoints,
            totalClicks: newClicks
          })
        });
      } catch (error) {
        console.error('Error updating progress:', error);
      }

      alert(`🎉 You gained ${pointsGained} useless points! Total: ${newPoints}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">🎪 Loading your chaos...</div>
      </div>
    );
  }

  const unlockedChallenges = levelData ? getUnlockedChallenges(points) : [];

  return (
    <div className="container">
      <div className="royal-header">
        <h1 className="royal-title">🎪 Royal Dashboard of Chaos 🎪</h1>
        <p style={{ fontSize: '1.5rem' }}>
          Welcome back, {user?.username}! 👑
        </p>
      </div>

      {levelData && (
        <div className="card">
          <div style={{ textAlign: 'center' }}>
            <div 
              className="level-badge" 
              style={{ 
                background: levelData.current.color,
                color: 'white',
                fontSize: '1.5rem'
              }}
            >
              {levelData.current.name}
            </div>
            <p style={{ fontSize: '1.2rem', margin: '15px 0' }}>
              {levelData.current.description}
            </p>
            <h3>Points: {points.toLocaleString()}</h3>
          </div>

          {levelData.next && (
            <div style={{ marginTop: '30px' }}>
              <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                Next Level: <strong>{levelData.next.name}</strong>
                <br />
                <small>({levelData.next.requiredPoints - points} points needed)</small>
              </p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${levelData.progress}%` }}>
                  {levelData.progress.toFixed(1)}%
                </div>
              </div>
            </div>
          )}

          {levelData.current.id === 15 && (
            <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,215,0,0.3)', borderRadius: '15px', textAlign: 'center' }}>
              <h2>🌌 MAXIMUM LEVEL REACHED! 🌌</h2>
              <p style={{ fontSize: '1.3rem' }}>
                You are now a COSMIC CHAOS DEITY!
                <br />
                Congratulations on wasting enough time to reach enlightenment! 🎊
              </p>
            </div>
          )}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>⏰ Time Wasted</h3>
          <div className="stat-value">
            {Math.floor(timeWasted / 60)}:{(timeWasted % 60).toString().padStart(2, '0')}
          </div>
          <p>This session</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
          <h3>🖱️ Total Clicks</h3>
          <div className="stat-value">{clicks.toLocaleString()}</div>
          <p>Points of no return</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
          <h3>🏆 Unlocked Challenges</h3>
          <div className="stat-value">{unlockedChallenges.length}</div>
          <p>Ways to waste time</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>
          <h3>😵 Regret Level</h3>
          <div className="stat-value">∞</div>
          <p>Immeasurable!</p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          🎯 Available Challenges ({unlockedChallenges.length})
        </h2>
        
        {unlockedChallenges.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
            No challenges unlocked yet! Click the useless button to earn points! 🎪
          </p>
        ) : (
          <div className="challenge-grid">
            {unlockedChallenges.map(challenge => (
              <Link href={`/challenges/${challenge.id}`} key={challenge.id}>
                <div className={`challenge-card difficulty-${challenge.difficulty.toLowerCase()}`}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>
                    {challenge.icon}
                  </h3>
                  <h3>{challenge.name}</h3>
                  <p style={{ margin: '10px 0' }}>{challenge.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                    <span className="difficulty" style={{ 
                      background: challenge.difficulty === 'Easy' ? '#00ff00' :
                                 challenge.difficulty === 'Medium' ? '#ffff00' :
                                 challenge.difficulty === 'Hard' ? '#ff6600' :
                                 challenge.difficulty === 'Extreme' ? '#ff0000' : '#ff00ff',
                      color: challenge.difficulty === 'Easy' || challenge.difficulty === 'Medium' ? '#000' : '#fff'
                    }}>
                      {challenge.difficulty}
                    </span>
                    <span>🏆 {challenge.points} pts</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px' }}>🎪 Quick Actions</h3>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleUselessClick} className="btn btn-primary">
            🎁 Click for Random Points!
          </button>
          <Link href="/challenges" className="btn btn-success">
            🎯 All Challenges
          </Link>
          <button onClick={handleLogout} className="btn btn-danger">
            🚪 Logout (Escape!)
          </button>
        </div>
      </div>

      <div className="card" style={{ background: 'rgba(255,0,0,0.1)' }}>
        <h3 style={{ textAlign: 'center', color: '#ff0000' }}>
          ⚠️ Your Productivity Report ⚠️
        </h3>
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2rem' }}>
          <p>✅ Time Wasted: {Math.floor(timeWasted / 60)} minutes</p>
          <p>✅ Useless Clicks: {clicks}</p>
          <p>✅ Actual Work Done: 0</p>
          <p>✅ Regret Generated: Maximum</p>
          <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#ff0000' }}>
            🎉 Congratulations! You're excelling at being useless! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
