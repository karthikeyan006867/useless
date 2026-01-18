'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CHALLENGES } from '../../lib/levels';

export default function AllChallenges() {
  const [userPoints, setUserPoints] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load user points from localStorage
    const points = parseInt(localStorage.getItem('userPoints') || '0');
    setUserPoints(points);
  }, []);

  const allChallenges = Object.values(CHALLENGES);
  const filteredChallenges = filter === 'all' 
    ? allChallenges 
    : allChallenges.filter(c => c.difficulty.toLowerCase() === filter);

  return (
    <div className="container">
      <div className="royal-header">
        <h1 className="royal-title">🎯 All Challenges</h1>
        <p style={{ fontSize: '1.3rem', color: '#666' }}>
          Choose your path to uselessness!
        </p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Filter by Difficulty:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {['all', 'easy', 'medium', 'hard', 'extreme', 'impossible'].map(diff => (
            <button
              key={diff}
              onClick={() => setFilter(diff)}
              className="btn"
              style={{
                background: filter === diff ? '#667eea' : '#ddd',
                color: filter === diff ? 'white' : '#333',
                textTransform: 'capitalize'
              }}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="challenge-grid">
          {filteredChallenges.map(challenge => (
            <Link href={`/challenges/${challenge.id}`} key={challenge.id}>
              <div className={`challenge-card difficulty-${challenge.difficulty.toLowerCase()}`}>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                  {challenge.icon}
                </h3>
                <h3>{challenge.name}</h3>
                <p style={{ margin: '15px 0' }}>{challenge.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', alignItems: 'center' }}>
                  <span style={{ 
                    background: challenge.difficulty === 'Easy' ? '#00ff00' :
                               challenge.difficulty === 'Medium' ? '#ffff00' :
                               challenge.difficulty === 'Hard' ? '#ff6600' :
                               challenge.difficulty === 'Extreme' ? '#ff0000' : '#ff00ff',
                    color: challenge.difficulty === 'Easy' || challenge.difficulty === 'Medium' ? '#000' : '#fff',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold'
                  }}>
                    {challenge.difficulty}
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>🏆 {challenge.points} pts</span>
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                  Required Level: {challenge.level}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>No challenges found!</h2>
            <p>Try a different filter.</p>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/dashboard" className="btn btn-success">
          ⬅️ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
