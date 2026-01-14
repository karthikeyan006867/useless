// Annoying popup system
let popupShown = false;
let formResetCount = 0;
let popupCount = 0;
const MAX_POPUPS = 3;

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
function doNothing() {
    const messages = [
        'This button does nothing! Thanks for clicking!',
        'Loading... ERROR! System32 not found',
        'You have been subscribed to Cat Facts!',
        'Downloading virus.exe... Just kidding! Or am I?',
        'Cannot complete action: user is not a robot',
        'Please drink verification can',
        'Achievement Unlocked: Clicked a useless button!',
        'Your computer has been blessed. Or cursed. Hard to tell.'
    ];
    alert(messages[Math.floor(Math.random() * messages.length)]);
}

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
