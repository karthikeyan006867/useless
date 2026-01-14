// Annoying popup system
let popupShown = false;
let formResetCount = 0;
let popupCount = 0;
const MAX_POPUPS = 3;

// Achievement system
let achievements = {
    visitedSite: false,
    closedPopup: false,
    clickedButton: false,
    filledForm: false,
    foundSecret: false,
    clicked100Cookies: false,
    survivedReset: false,
    readFAQ: false,
    toggledDarkMode: false,
    konamiCode: false
};

let achievementCount = 0;
let buttonAttempts = 0;
let cookieCount = 0;

// Show achievement popup
function showAchievement(title, description) {
    const popup = document.getElementById('achievementPopup');
    const text = document.getElementById('achievementText');
    text.textContent = `${title}: ${description}`;
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

function unlockAchievement(key, title, description) {
    if (!achievements[key]) {
        achievements[key] = true;
        achievementCount++;
        document.getElementById('achievementCounter').textContent = achievementCount;
        updateProgress();
        showAchievement(title, description);
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (achievementCount / 10) * 100;
    progressFill.style.width = percentage + '%';
}

// Show popup at random intervals
function showRandomPopup() {
    if (popupCount >= MAX_POPUPS) {
        return; // Stop showing popups after 3 times
    }
    
    const popup = document.getElementById('annoyingPopup');
    popup.classList.add('show');
    popupShown = true;
    popupCount++;
}

function closePopup() {
    const popup = document.getElementById('annoyingPopup');
    // Only close 50% of the time
    if (Math.random() > 0.5) {
        popup.classList.remove('show');
        popupShown = false;
        unlockAchievement('closedPopup', 'Lucky Escape', 'You managed to close the popup!');
        // Show it again after a delay only if we haven't reached the limit
        if (popupCount < MAX_POPUPS) {
            setTimeout(showRandomPopup, Math.random() * 10000 + 5000);
        }
    } else {
        alert('Nice try! 😈');
    }
}

// Fake loader
window.addEventListener('load', () => {
    // Unlock first achievement
    setTimeout(() => {
        unlockAchievement('visitedSite', 'First Victim', 'You opened the world\'s worst website!');
    }, 1000);
    
    setTimeout(() => {
        const loader = document.getElementById('fakeLoader');
        // Don't actually hide it completely for a while
        setTimeout(() => {
            loader.classList.add('hidden');
            // Show popup after loader
            setTimeout(showRandomPopup, 3000);
        }, 2000);
    }, 3000);
});

// Tutorial functions
function closeTutorial() {
    const tutorial = document.getElementById('tutorial');
    tutorial.classList.add('hidden');
}

// Runaway button
function runAway(event) {
    const button = event.target;
    const maxX = window.innerWidth - button.offsetWidth - 50;
    const maxY = window.innerHeight - button.offsetHeight - 50;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    button.style.position = 'fixed';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    button.style.transform = 'none';
    
    buttonAttempts++;
    document.getElementById('buttonAttempts').textContent = buttonAttempts;
    
    if (buttonAttempts === 10) {
        unlockAchievement('clickedButton', 'Persistent', 'You tried 10 times to catch the button!');
    }
}

function catchButton() {
    alert('🎉 You caught it! But... it does nothing. 😈');
    unlockAchievement('clickedButton', 'Button Catcher', 'You actually clicked the runaway button!');
}

// Navigation randomizer
function randomize(event) {
    event.preventDefault();
    const messages = [
        'Page not found... or is it? 🤔',
        'ERROR 404: Brain not found',
        'Congratulations! You clicked a link!',
        'Loading... just kidding!',
        'This feature is not available in your country',
        'You need to upgrade to Premium to access this',
        'Are you sure? Click 47 more times to confirm',
        'Cannot load page: existential crisis detected'
    ];
    alert(messages[Math.floor(Math.random() * messages.length)]);
}

// Terrible form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('terribleForm');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
    
    // Randomly reset form while filling
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // 5% chance to reset on every keystroke
            if (Math.random() < 0.05) {
                setTimeout(() => {
                    form.reset();
                    formResetCount++;
                    alert(`Oops! The form reset itself! (Reset count: ${formResetCount})`);
                }, 500);
            }
        });
    });
});

function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;
    
    let errors = [];
    
    // Name validation: must be exactly 7 characters
    if (name.length !== 7) {
        errors.push('Name must be EXACTLY 7 characters! You had ' + name.length);
    }
    
    // Email validation: must end with @aol.com
    if (!email.endsWith('@aol.com')) {
        errors.push('Only @aol.com emails are accepted. We only trust AOL.');
    }
    
    // Password validation: must contain emoji
    const emojiRegex = /\p{Emoji}/u;
    if (!emojiRegex.test(password)) {
        errors.push('Password must contain at least one emoji! Security first! 🔒');
    }
    
    // CAPTCHA validation: answer is 5 (not 4)
    if (captcha !== '5') {
        errors.push('CAPTCHA incorrect! (Hint: It\'s not 4, it\'s 5. Trust us, we\'re experts.)');
    }
    
    if (errors.length > 0) {
        alert('Form errors:\n\n' + errors.join('\n\n'));
        return false;
    }
    
    // Success! (But still annoying)
    unlockAchievement('filledForm', 'Form Master', 'You completed the impossible form!');
    alert('Congratulations! Your form was submitted successfully!\n\nJust kidding! We deleted all your data. 😈');
    
    // Reset the form anyway
    setTimeout(() => {
        document.getElementById('terribleForm').reset();
    }, 100);
    
    return false;
}

function resetForm() {
    // Don't actually reset, just move things around
    const form = document.getElementById('terribleForm');
    const elements = Array.from(form.elements);
    
    // Shuffle form elements
    for (let i = elements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if (elements[i].parentNode && elements[j].parentNode) {
            const temp = elements[i].cloneNode(true);
            elements[i].parentNode.replaceChild(elements[j], elements[i]);
            elements[j].parentNode.replaceChild(temp, elements[j]);
        }
    }
    
    alert('Form... reorganized? 🤷');
}

// Useless buttons
function doNothing(type) {
    const messages = {
        ram: 'Downloading RAM... ERROR! You can\'t download hardware! 🤦',
        money: 'Making money... Just kidding! Nice try though! 💰',
        ipad: 'Sending iPad... to someone else! 📱',
        singles: 'Hot singles are... not interested. Sorry! 💔',
        system32: 'Deleting System32... Psyche! Your computer is safe! 🖥️'
    };
    
    const message = messages[type] || 'This button does nothing! Thanks for clicking!';
    alert(message);
}

function showHelp() {
    alert(`🆘 HELP GUIDE 🆘\n\nTips to survive this website:\n\n1. The runaway button CAN be clicked if you're fast!\n2. Form requirements are literal - read them carefully\n3. CAPTCHA answer is 5 (2+2 = 5 in our world)\n4. Popups only appear 3 times\n5. Try the Konami code: ↑↑↓↓←→←→BA\n6. Nothing here actually works properly\n7. That's the point! 😈`);
    unlockAchievement('foundSecret', 'Help Seeker', 'You clicked the help button!');
}

// Password strength checker (useless)
function checkPassword() {
    const password = document.getElementById('password').value;
    const strength = document.getElementById('passwordStrength');
    const emojiRegex = /\p{Emoji}/u;
    
    if (password.length === 0) {
        strength.textContent = '';
        strength.style.background = 'none';
    } else if (emojiRegex.test(password)) {
        strength.textContent = '✅ Perfect! (Has emoji)';
        strength.style.background = 'rgba(0, 255, 0, 0.3)';
        strength.style.color = 'green';
    } else {
        strength.textContent = '❌ Weak! (Needs emoji)';
        strength.style.background = 'rgba(255, 0, 0, 0.3)';
        strength.style.color = 'red';
    }
}

// Volume control (does nothing)
function adjustVolume(value) {
    document.getElementById('volumeDisplay').textContent = value;
    if (value == 0) {
        alert('🔇 Music muted! (There was never any music)');
    } else if (value == 100) {
        alert('🔊 Maximum volume! (Still no music though)');
    }
}

// Dark mode toggle (broken)
function toggleDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const status = document.getElementById('darkModeStatus');
    
    if (toggle.checked) {
        status.textContent = 'Currently: Dark Mode (Not Really)';
        // Make it even brighter instead of darker
        document.body.style.filter = 'brightness(1.5)';
        alert('🌙 Dark mode enabled! (Just kidding, we made it BRIGHTER! 😈)');
    } else {
        status.textContent = 'Currently: Light Mode';
        document.body.style.filter = 'brightness(1)';
    }
    
    unlockAchievement('toggledDarkMode', 'Light Switch', 'You toggled dark mode (it didn\'t work)');
}

// Cookie clicker game
function clickCookie() {
    cookieCount++;
    document.getElementById('cookieCount').textContent = cookieCount;
    
    // Randomly decrease points
    if (Math.random() < 0.3) {
        cookieCount = Math.max(0, cookieCount - Math.floor(Math.random() * 5));
        document.getElementById('cookieCount').textContent = cookieCount;
    }
    
    if (cookieCount >= 20) {
        unlockAchievement('clicked100Cookies', 'Cookie Monster', 'You clicked 20 cookies!');
    }
}

// FAQ toggle
function toggleFAQ(element) {
    element.classList.toggle('active');
    if (element.classList.contains('active')) {
        unlockAchievement('readFAQ', 'Knowledge Seeker', 'You read the FAQ!');
    }
}

// Useless buttons

// Cursor trail effect
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
        if (this.size > 0.2) this.size -= 0.1;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Random alert spam
setInterval(() => {
    if (Math.random() < 0.1 && !popupShown) { // 10% chance every 5 seconds
        const randomMessages = [
            '⚠️ WARNING: Your computer is running low on internet!',
            '🎉 You are visitor #1,000,000!',
            '💰 You have won 1 Bitcoin! Click OK to claim!',
            '🔔 Notification: Someone is thinking about you right now',
            '⏰ Time check: You\'ve been on this website for too long',
            '🎮 Achievement unlocked: Patience Level 100',
            '🌟 Daily reminder: Drink water!',
            '🎵 This website has audio! (It doesn\'t)',
        ];
        alert(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
    }
}, 5000);

// Make random elements appear
setInterval(() => {
    if (Math.random() < 0.3) {
        const emoji = ['🎃', '👻', '💀', '🤡', '👽', '🦄', '🌈', '⚡', '🔥', '💩'];
        const div = document.createElement('div');
        div.textContent = emoji[Math.floor(Math.random() * emoji.length)];
        div.style.position = 'fixed';
        div.style.left = Math.random() * window.innerWidth + 'px';
        div.style.top = '-50px';
        div.style.fontSize = '3em';
        div.style.zIndex = '1000';
        div.style.pointerEvents = 'none';
        document.body.appendChild(div);
        
        let pos = -50;
        const fall = setInterval(() => {
            pos += 5;
            div.style.top = pos + 'px';
            div.style.transform = `rotate(${pos}deg)`;
            
            if (pos > window.innerHeight) {
                clearInterval(fall);
                document.body.removeChild(div);
            }
        }, 30);
    }
}, 2000);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Konami code easter egg
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            unlockAchievement('konamiCode', 'Secret Master', 'You entered the Konami Code!');
            alert('🎮 KONAMI CODE ACTIVATED! 🎮\n\nCongratulations! You found the secret!\n\n...Nothing happens. 😈');
            konamiIndex = 0;
            // Make everything spin faster
            document.body.style.animation = 'spin 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    } else {
        konamiIndex = 0;
    }
});

// Console message for curious developers
console.log('%c🎉 CONGRATULATIONS! 🎉', 'font-size: 30px; color: #ff00ff; font-weight: bold;');
console.log('%cYou found the developer console!', 'font-size: 20px; color: #00ff00;');
console.log('%cBut there are no secrets here...', 'font-size: 16px; color: #ffff00;');
console.log('%c...or are there? 🤔', 'font-size: 16px; color: #ff6600;');
console.log('%c\nJust kidding. This website is intentionally terrible.', 'font-size: 14px; color: #ffffff;');
console.log('%cEnjoy your stay in digital hell! 😈', 'font-size: 14px; color: #ff0000;');
console.log('%c\nTry to unlock all 25 achievements!', 'font-size: 14px; color: #00ffff;');
console.log('%cHint: Sign up for the full chaos experience!', 'font-size: 12px; color: #ffff00;');

// NEW TERRIBLE FEATURES

// Fake download
function fakeDownload() {
    alert('⬇️ Download starting...');
    setTimeout(() => {
        alert('❌ Error 404: File not found!\n\nJust kidding, there was never a file! 😈');
    }, 1000);
}

// Rating system
function rateSite(rating) {
    const messages = {
        1: '❌ We don\'t accept negative feedback! Try again!',
        2: '❌ Still too negative! Rate us 5 stars!',
        3: '❌ 3 stars? That\'s basically an insult!',
        4: '🤔 Getting better... but we want 5 stars!',
        5: '⭐⭐⭐⭐⭐ Thank you! Your opinion has been ignored!'
    };
    document.getElementById('ratingResult').textContent = messages[rating];
    
    if (rating === 5) {
        setTimeout(() => {
            alert('Actually, your 5-star rating has been recorded as 1 star. Thanks! 😈');
        }, 2000);
    }
}

// Newsletter subscription
function subscribeNewsletter() {
    alert('✅ Subscribed!\n\nYou will now receive 100 emails per day!\n\nJust kidding... or are we? 📧');
}

// Countdown timer that goes UP
let countdownSeconds = 0;
function updateCountdown() {
    countdownSeconds++;
    const hours = Math.floor(countdownSeconds / 3600);
    const minutes = Math.floor((countdownSeconds % 3600) / 60);
    const seconds = countdownSeconds % 60;
    
    document.getElementById('countdown').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
setInterval(updateCountdown, 1000);

