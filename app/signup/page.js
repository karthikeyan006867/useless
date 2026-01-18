'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    favoriteColor: '#ff69b4',
    birthYear: '',
    luckyNumber: '',
    petName: ''
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const countEmojis = (str) => {
    const emojiRegex = /[\u{1F000}-\u{1F9FF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    return (str.match(emojiRegex) || []).length;
  };

  const validateForm = () => {
    const newErrors = [];

    // Username validation
    const usernameEmojis = countEmojis(formData.username);
    if (usernameEmojis < 3) {
      newErrors.push(`❌ Username needs at least 3 emojis! You only have ${usernameEmojis}. Add more! 😀😎🎉`);
    }

    if (formData.username.length < 5) {
      newErrors.push('❌ Username must be at least 5 characters (emojis count as 2!)');
    }

    // Email validation - must end with ridiculous domain
    if (!formData.email.includes('@')) {
      newErrors.push('❌ Email must contain @ symbol! (We know, revolutionary concept)');
    } else if (!formData.email.match(/@(worst|useless|terrible|awful|pointless)\.com$/)) {
      newErrors.push('❌ Email must end with @worst.com, @useless.com, @terrible.com, @awful.com, or @pointless.com!');
    }

    // Password validation - absurdly complex
    if (formData.password.length < 50) {
      newErrors.push(`❌ Password too short! Need ${50 - formData.password.length} more characters. Current: ${formData.password.length}/50`);
    }

    const passwordEmojis = countEmojis(formData.password);
    if (passwordEmojis < 10) {
      newErrors.push(`❌ Password needs 10 emojis for security! Current: ${passwordEmojis}/10 🔐`);
    }

    if (!/[A-Z]/.test(formData.password)) {
      newErrors.push('❌ Password must contain uppercase letters!');
    }

    if (!/[0-9]/.test(formData.password)) {
      newErrors.push('❌ Password must contain numbers!');
    }

    if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.push('❌ Password must contain special characters (!@#$%^&*)');
    }

    // Passwords must be DIFFERENT (intentionally terrible UX)
    if (formData.password === formData.confirmPassword) {
      newErrors.push('❌ Passwords must be DIFFERENT for maximum security! (Yes, we\'re serious 🤡)');
    }

    // Birth year must be in the future
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(formData.birthYear);
    if (!birthYear || birthYear <= currentYear) {
      newErrors.push(`❌ Birth year must be in the FUTURE! Try ${currentYear + 1} or later 🚀`);
    }

    // Lucky number validations
    const luckyNum = parseInt(formData.luckyNumber);
    if (isNaN(luckyNum)) {
      newErrors.push('❌ Lucky number must be a number!');
    } else if (luckyNum >= 0) {
      newErrors.push('❌ Lucky number must be NEGATIVE! (Because this website is unlucky)');
    }

    // Pet name must be ridiculously long
    if (formData.petName.length < 20) {
      newErrors.push(`❌ Pet name too short! Needs ${20 - formData.petName.length} more characters. Make it dramatic!`);
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store user data
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', formData.username);
        
        alert('🎉 Congratulations! You\'ve successfully wasted time creating an account! Welcome to the chaos! 🎪');
        router.push('/dashboard');
      } else {
        setErrors([data.error || 'Failed to create account']);
      }
    } catch (error) {
      setErrors(['❌ Error: ' + error.message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="royal-header">
        <h1 className="royal-title">🎭 Join the Royal Circus 🎭</h1>
        <p style={{ fontSize: '1.3rem', color: '#666' }}>
          Create your account for eternal regret!
        </p>
      </div>

      <div className="card" style={{ maxWidth: '600px', margin: '20px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          🎪 Sign Up Form of Doom
        </h2>

        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, i) => (
              <p key={i} style={{ margin: '5px 0' }}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>👤 Username (needs 3+ emojis!):</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Example: CoolDude😎🎉🔥"
              required
            />
            <small>Current emojis: {countEmojis(formData.username)}/3</small>
          </div>

          <div className="form-group">
            <label>📧 Email (must end with ridiculous domain):</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="user@worst.com"
              required
            />
            <small>Accepted: @worst.com, @useless.com, @terrible.com, @awful.com, @pointless.com</small>
          </div>

          <div className="form-group">
            <label>🔐 Password (50+ chars, 10+ emojis!):</label>
            <input
              type="text"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="SuperSecure123!😀😎🎉🔥💎🎪👑🌟✨🎭"
              required
            />
            <small>Length: {formData.password.length}/50 | Emojis: {countEmojis(formData.password)}/10</small>
          </div>

          <div className="form-group">
            <label>🔐 Confirm Password (MUST be different!):</label>
            <input
              type="text"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="MakeSureDifferent456!🤡🎨🎯🏆💫🌈🦋⚡🎁🎮"
              required
            />
            <small style={{ color: 'red' }}>Remember: Passwords MUST be different! 🤡</small>
          </div>

          <div className="form-group">
            <label>🎨 Favorite Color:</label>
            <input
              type="color"
              value={formData.favoriteColor}
              onChange={(e) => setFormData({ ...formData, favoriteColor: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>📅 Birth Year (must be in the FUTURE!):</label>
            <input
              type="number"
              value={formData.birthYear}
              onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
              placeholder={`Try ${new Date().getFullYear() + 1} or later`}
              required
            />
          </div>

          <div className="form-group">
            <label>🍀 Lucky Number (must be NEGATIVE!):</label>
            <input
              type="number"
              value={formData.luckyNumber}
              onChange={(e) => setFormData({ ...formData, luckyNumber: e.target.value })}
              placeholder="-42"
              required
            />
          </div>

          <div className="form-group">
            <label>🐶 Pet's Full Legal Name (20+ characters):</label>
            <input
              type="text"
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
              placeholder="Sir Fluffington the Third, Destroyer of Worlds"
              required
            />
            <small>Length: {formData.petName.length}/20</small>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '20px' }}
            disabled={loading}
          >
            {loading ? '🔄 Creating Chaos...' : '🎪 Join the Circus!'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already a victim? <Link href="/signin" style={{ color: '#667eea', fontWeight: 'bold' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
