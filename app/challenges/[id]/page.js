'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CHALLENGES } from '../../../lib/levels';

export default function ChallengeDetail({ params }) {
  const router = useRouter();
  const [challengeId, setChallengeId] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [gameState, setGameState] = useState('ready');

  useEffect(() => {
    // Unwrap params
    params.then(p => {
      const id = p.id;
      setChallengeId(id);
      const challengeData = CHALLENGES[id];
      if (challengeData) {
        setChallenge(challengeData);
      } else {
        router.push('/dashboard');
      }
    });
  }, [params, router]);

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const handleComplete = async () => {
    const userId = localStorage.getItem('userId');
    
    try {
      await fetch('/api/challenges/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          challengeId,
          completed: true,
          score,
          timeSpent
        })
      });

      // Update user points
      const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
      const newPoints = currentPoints + (challenge?.points || 0);
      localStorage.setItem('userPoints', newPoints.toString());

      alert(`🎉 Challenge Complete! +${challenge?.points} points! Total time: ${timeSpent}s`);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };

  if (!challenge) {
    return <div className="container"><div className="loading">🎪 Loading...</div></div>;
  }

  return (
    <div className="container">
      <div className="royal-header">
        <h1 className="royal-title">{challenge.icon} {challenge.name}</h1>
        <p style={{ fontSize: '1.3rem', color: '#666' }}>
          {challenge.description}
        </p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span className="difficulty" style={{ 
            background: challenge.difficulty === 'Easy' ? '#00ff00' :
                       challenge.difficulty === 'Medium' ? '#ffff00' :
                       challenge.difficulty === 'Hard' ? '#ff6600' :
                       challenge.difficulty === 'Extreme' ? '#ff0000' : '#ff00ff',
            color: challenge.difficulty === 'Easy' || challenge.difficulty === 'Medium' ? '#000' : '#fff',
            padding: '10px 20px',
            borderRadius: '20px'
          }}>
            {challenge.difficulty}
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            🏆 {challenge.points} points
          </span>
        </div>

        {challengeId === 'button-chase' && (
          <ButtonChaseGame 
            onComplete={handleComplete} 
            onScoreChange={setScore}
            onGameStateChange={setGameState}
          />
        )}

        {challengeId === 'useless-calculator' && (
          <UselessCalculator 
            onComplete={handleComplete} 
            onScoreChange={setScore}
            onGameStateChange={setGameState}
          />
        )}

        {!['button-chase', 'useless-calculator'].includes(challengeId) && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>🚧 Challenge Coming Soon! 🚧</h2>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
              This challenge is under construction!
            </p>
            <button onClick={handleComplete} className="btn btn-success">
              🎉 Complete Anyway! (We won't tell)
            </button>
          </div>
        )}

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p>⏰ Time Spent: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</p>
          <p>🎯 Current Score: {score}</p>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/dashboard" className="btn btn-danger">
            ⬅️ Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

// Button Chase Game Component
function ButtonChaseGame({ onComplete, onScoreChange, onGameStateChange }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [clicks, setClicks] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    onGameStateChange(isStarted ? 'playing' : 'ready');
  }, [isStarted, onGameStateChange]);

  const handleButtonClick = () => {
    if (!isStarted) {
      setIsStarted(true);
    }

    const newClicks = clicks + 1;
    setClicks(newClicks);
    onScoreChange(newClicks);

    if (newClicks >= 50) {
      onComplete();
      return;
    }

    // Move button to random position
    setPosition({
      x: Math.random() * 80,
      y: Math.random() * 80
    });
  };

  return (
    <div style={{ minHeight: '400px', position: 'relative', border: '3px dashed #667eea', borderRadius: '15px', padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Click the button 50 times!</h3>
      <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {clicks} / 50
      </p>
      <button
        onClick={handleButtonClick}
        className="btn btn-primary"
        style={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transition: 'all 0.3s ease'
        }}
      >
        🏃 Catch Me!
      </button>
    </div>
  );
}

// Useless Calculator Component
function UselessCalculator({ onComplete, onScoreChange, onGameStateChange }) {
  const [display, setDisplay] = useState('0');
  const [calculations, setCalculations] = useState(0);

  const handleNumber = (num) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op) => {
    setDisplay(prev => prev + ' ' + op + ' ');
  };

  const handleEquals = () => {
    try {
      // Calculate the WRONG answer
      const correctAnswer = eval(display);
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
      setDisplay(wrongAnswer.toString());
      
      const newCalc = calculations + 1;
      setCalculations(newCalc);
      onScoreChange(newCalc);

      if (newCalc >= 10) {
        setTimeout(() => onComplete(), 1000);
      }
    } catch (error) {
      setDisplay('ERROR!');
    }
  };

  const handleClear = () => {
    setDisplay('0');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center' }}>Use the calculator 10 times!</h3>
      <p style={{ textAlign: 'center', color: '#ff0000' }}>
        ⚠️ Warning: All answers are intentionally WRONG! ⚠️
      </p>
      <p style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 'bold' }}>
        {calculations} / 10 calculations
      </p>

      <div style={{ background: '#333', padding: '20px', borderRadius: '15px', marginTop: '20px' }}>
        <div style={{ background: '#000', color: '#0f0', padding: '15px', borderRadius: '10px', fontSize: '2rem', textAlign: 'right', marginBottom: '15px', fontFamily: 'monospace' }}>
          {display}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
            <button
              key={btn}
              onClick={() => {
                if (btn === '=') handleEquals();
                else if (['+','-','*','/'].includes(btn)) handleOperator(btn);
                else handleNumber(btn);
              }}
              className="btn"
              style={{ 
                background: btn === '=' ? '#ff0000' : '#667eea',
                color: 'white',
                padding: '20px',
                fontSize: '1.5rem'
              }}
            >
              {btn}
            </button>
          ))}
        </div>

        <button
          onClick={handleClear}
          className="btn btn-danger"
          style={{ width: '100%', marginTop: '10px' }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
