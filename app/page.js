'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLevelByPoints, calculateProgress } from '../lib/levels';

export default function Home() {
  const [rotating, setRotating] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setClicks(clicks + 1);
    if (clicks + 1 >= 10) {
      setShowSecret(true);
    }
  };

  return (
    <div className="container">
      <div className="royal-header">
        <h1 className="royal-title" style={{ transform: rotating ? 'rotate(360deg)' : 'rotate(0deg)', transition: 'transform 2s' }}>
          🎪 ROYAL PALACE OF USELESS CHALLENGES 🎪
        </h1>
        <p style={{ fontSize: '1.5rem', margin: '20px 0', color: '#666' }}>
          Where productivity goes to die and chaos reigns supreme! 👑
        </p>
        <p style={{ fontSize: '1.2rem', color: '#ff1493' }}>
          🌟 15 Epic Levels • 30+ Hilarious Challenges • Infinite Regret 🌟
        </p>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Welcome to the Kingdom of Pointlessness! 🏰
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '30px', color: '#555' }}>
          Embark on a journey through 15 royal ranks, from Jester Apprentice to Cosmic Chaos Deity!
        </p>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#ff0000' }}>⚔️ Features That Will Waste Your Time:</h3>
          <ul style={{ listStyle: 'none', fontSize: '1.2rem', marginTop: '15px' }}>
            <li>🎯 30+ Absolutely Useless Challenges</li>
            <li>🏆 15 Royal Ranks to Unlock</li>
            <li>💎 Pointless Achievements System</li>
            <li>🎨 Eye-Melting Visual Effects</li>
            <li>🔐 Ridiculously Impossible Login System</li>
            <li>📊 Track Your Wasted Time & Regret</li>
            <li>🎪 Confusion Guaranteed or Your Sanity Back!</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" className="btn btn-primary">
            🎭 Join the Circus (Sign Up)
          </Link>
          <Link href="/signin" className="btn btn-success">
            👑 Return to Chaos (Sign In)
          </Link>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255,0,0,0.1)', borderRadius: '15px' }}>
          <h3 style={{ color: '#ff0000' }}>⚠️ WARNING ⚠️</h3>
          <p style={{ fontSize: '1.1rem' }}>
            This website may cause:
            <br />
            🤯 Extreme confusion • 😵 Temporary insanity • 🎪 Uncontrollable laughter
            <br />
            ⏰ Severe time loss • 🤦 Facepalming • 👑 Royal disappointment
          </p>
        </div>

        <button 
          onClick={handleClick}
          className="btn btn-danger"
          style={{ marginTop: '30px' }}
        >
          🎁 Click Me {clicks} Times! {clicks >= 10 ? '🎉' : ''}
        </button>

        {showSecret && (
          <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,215,0,0.2)', borderRadius: '15px' }}>
            <h3>🎊 SECRET UNLOCKED! 🎊</h3>
            <p style={{ fontSize: '1.2rem' }}>
              Congratulations! You clicked a button 10 times for absolutely no reason!
              <br />
              This is the level of commitment we expect from our royal subjects! 👑
            </p>
          </div>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Victims</h3>
          <div className="stat-value">∞</div>
          <p>And counting...</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
          <h3>Time Wasted</h3>
          <div className="stat-value">Forever</div>
          <p>You'll never get it back</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>
          <h3>Confusion Level</h3>
          <div className="stat-value">MAX</div>
          <p>Off the charts!</p>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #fa709a, #fee140)' }}>
          <h3>Productivity</h3>
          <div className="stat-value">-999</div>
          <p>Negative is impressive!</p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>
          🎯 The Royal Ranking System
        </h2>
        <div style={{ background: 'rgba(0,0,0,0.05)', padding: '20px', borderRadius: '15px' }}>
          {[
            '🤡 Level 1-2: Jester Territory (0-300 pts)',
            '🎭 Level 3-5: Noble Nonsense (300-1000 pts)',
            '👑 Level 6-9: Royal Ridiculousness (1000-4000 pts)',
            '💎 Level 10-12: Grand Chaos (4000-10000 pts)',
            '🌌 Level 13-15: COSMIC DEITY (10000-30000 pts)'
          ].map((rank, i) => (
            <p key={i} style={{ fontSize: '1.2rem', margin: '10px 0' }}>{rank}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
