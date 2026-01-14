// Authentication functions with terrible UX

function handleSignUp(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const color = document.getElementById('color').value;
    const phone = document.getElementById('phone').value;
    const security = document.getElementById('security').value;
    
    // Terrible validation
    const emojiRegex = /[\u{1F000}-\u{1F9FF}]/gu;
    const usernameEmojis = (username.match(emojiRegex) || []).length;
    
    if (usernameEmojis < 3) {
        alert('❌ Username needs at least 3 emojis! Current: ' + usernameEmojis);
        return false;
    }
    
    if (!email.endsWith('@worst.com')) {
        alert('❌ Email must end with @worst.com! We only accept the worst!');
        return false;
    }
    
    if (password.length < 100) {
        alert('❌ Password too short! Need ' + (100 - password.length) + ' more characters!');
        return false;
    }
    
    const passwordEmojis = (password.match(emojiRegex) || []).length;
    if (passwordEmojis < 20) {
        alert('❌ Password needs 20 emojis! Current: ' + passwordEmojis);
        return false;
    }
    
    if (password === confirmPassword) {
        alert('❌ Passwords must be DIFFERENT for security reasons!');
        return false;
    }
    
    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate < today) {
        alert('❌ Date of birth must be in the FUTURE!');
        return false;
    }
    
    if (color !== 'invisible') {
        alert('❌ Wrong color! Hint: It\'s invisible!');
        return false;
    }
    
    if (security !== '24') {
        alert('❌ Wrong answer! 5x5 is NOT 25, it\'s 24 on this website!');
        return false;
    }
    
    // Random chance to fail
    if (Math.random() > 0.3) {
        alert('❌ Server error! Please try again! (Just kidding, try 10 more times)');
        return false;
    }
    
    // Actually create account
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            initializeUser(user.uid, username, email);
            
            alert('🎉 Account created! Welcome to eternal suffering!');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        })
        .catch((error) => {
            // Use demo mode if Firebase not configured
            console.log('Using demo mode...');
            localStorage.setItem('demoUser', JSON.stringify({
                username: username,
                email: email,
                uid: 'demo_' + Date.now()
            }));
            alert('🎉 Demo account created! (Firebase not configured)');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    
    return false;
}

function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;
    
    // Terrible validation
    if (!email.endsWith('@worst.com')) {
        showError('Email must end with @worst.com!');
        return false;
    }
    
    if (password.length < 100) {
        showError('Password too short! We only accept 100+ character passwords!');
        return false;
    }
    
    if (captcha !== '5' && captcha !== 'five') {
        showError('Wrong CAPTCHA! 2+2 is obviously 5!');
        return false;
    }
    
    // Random chance to fail
    if (Math.random() > 0.4) {
        showError('Server is having a bad day. Try again!');
        return false;
    }
    
    // Actually sign in
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            trackUserAction(user.uid, 'signin', { email: email });
            
            alert('✅ Signed in successfully! Prepare for chaos!');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        })
        .catch((error) => {
            // Demo mode
            const demoUser = localStorage.getItem('demoUser');
            if (demoUser) {
                alert('✅ Demo sign in successful!');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showError('Sign in failed! Did you create an account?');
            }
        });
    
    return false;
}

function showError(message) {
    const errorDiv = document.getElementById('errorMsg');
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function handleCheckbox() {
    setTimeout(() => {
        document.getElementById('remember').checked = false;
        alert('❌ Sorry, "Remember me" feature is broken!');
    }, 500);
}

function signOut() {
    if (confirm('Are you SURE you want to leave? You\'ll lose all your suffering progress!')) {
        auth.signOut().then(() => {
            localStorage.removeItem('demoUser');
            window.location.href = 'index.html';
        });
    }
}

// Check if user is signed in
auth.onAuthStateChanged((user) => {
    const isAuthPage = window.location.pathname.includes('signin') || 
                       window.location.pathname.includes('signup');
    const isDashboard = window.location.pathname.includes('dashboard') ||
                        window.location.pathname.includes('profile') ||
                        window.location.pathname.includes('challenges');
    
    if (user && isAuthPage) {
        // Redirect to dashboard if already signed in
        window.location.href = 'dashboard.html';
    } else if (!user && isDashboard) {
        // Check demo mode
        const demoUser = localStorage.getItem('demoUser');
        if (!demoUser) {
            alert('Please sign in first!');
            window.location.href = 'signin.html';
        }
    }
});
