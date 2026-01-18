'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [wrongCaptchaCount, setWrongCaptchaCount] = useState(0);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const questions = [
      { q: 'What is 2 + 2?', wrong: '5', hint: '(Hint: Not 4!)' },
      { q: 'How many fingers on one hand?', wrong: '7', hint: '(Hint: Not 5!)' },
      { q: 'Days in a week?', wrong: '9', hint: '(Hint: Not 7!)' },
      { q: 'Months in a year?', wrong: '15', hint: '(Hint: Not 12!)' },
      { q: 'Wheels on a car?', wrong: '3', hint: '(Hint: Not 4!)' },
      { q: 'Sides of a triangle?', wrong: '5', hint: '(Hint: Not 3!)' },
    ];
    const selected = questions[Math.floor(Math.random() * questions.length)];
    setCaptchaQuestion(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Intentionally wrong CAPTCHA validation
    if (captchaAnswer !== captchaQuestion.wrong) {
      setWrongCaptchaCount(prev => prev + 1);
      setError(`❌ CAPTCHA incorrect! ${captchaQuestion.q} The answer is obviously ${captchaQuestion.wrong}! ${captchaQuestion.hint} 🤡`);
      setCaptchaAnswer('');
      
      if (wrongCaptchaCount >= 2) {
        setError(`❌ CAPTCHA failed ${wrongCaptchaCount + 1} times! Hint: The answer is ALWAYS wrong on purpose! Try ${captchaQuestion.wrong} 😉`);
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        
        alert('🎉 Welcome back to the chaos! Your regret continues! 🎪');
        router.push('/dashboard');
      } else {
        setError(data.error || '❌ Invalid credentials! (Or maybe they\'re valid? Who knows! 🤷)');
      }
    } catch (error) {
      setError('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="royal-header">
        <h1 className="royal-title">👑 Return to the Chaos 👑</h1>
        <p style={{ fontSize: '1.3rem', color: '#666' }}>
          Sign in to continue wasting time!
        </p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '20px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          🔐 Sign In Portal of Confusion
        </h2>

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>📧 Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@worst.com"
              required
            />
          </div>

          <div className="form-group">
            <label>🔐 Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your ridiculously long password"
              required
            />
          </div>

          <div className="form-group">
            <label>🤖 CAPTCHA: {captchaQuestion.q}</label>
            <input
              type="text"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Enter the WRONG answer!"
              required
            />
            <small style={{ color: '#ff6600' }}>
              ⚠️ Warning: This CAPTCHA only accepts WRONG answers! {captchaQuestion.hint}
            </small>
          </div>

          <button 
            type="submit" 
            className="btn btn-success" 
            style={{ width: '100%', marginTop: '20px' }}
            disabled={loading}
          >
            {loading ? '🔄 Entering Chaos...' : '🎪 Sign In & Regret!'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            New to chaos? <Link href="/signup" style={{ color: '#667eea', fontWeight: 'bold' }}>Join Now!</Link>
          </p>
          <button 
            onClick={generateCaptcha}
            className="btn btn-danger"
            style={{ marginTop: '15px', padding: '8px 15px', fontSize: '0.9rem' }}
          >
            🔄 New CAPTCHA
          </button>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(255,215,0,0.2)', borderRadius: '10px' }}>
          <h4>💡 Pro Tip:</h4>
          <p>The CAPTCHA is intentionally broken! It only accepts mathematically WRONG answers. Because why make sense? 🤡</p>
        </div>
      </div>
    </div>
  );
}
