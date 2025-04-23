const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const taglineElement = document.querySelector('.hero .tagline');
const taglineText = taglineElement.textContent;
taglineElement.textContent = '';
let index = 0;
let projectCards = document.querySelectorAll('.project-card');
const datetimeContainer = document.getElementById('datetime-container');
const moonphaseContainer = document.getElementById('moonphase-container');
const themeMessage = document.getElementById('theme-message');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const socialLinks = document.querySelectorAll('.social-links a');
const profileImageContainer = document.querySelector('.hero .profile-image-container');


if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
}


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

const moonPhaseIcons = {
    'new': '🌑',
    'waxingCrescent': '🌒',
    'firstQuarter': '🌓',
    'waxingGibbous': '🌔',
    'full': '🌕',
    'waningGibbous': '🌖',
    'lastQuarter': '🌗',
    'waningCrescent': '🌘',
};

function updateDateTimeAndMoonPhase() {
    const now = new Date();
    const formattedDateTime = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    datetimeContainer.textContent = formattedDateTime;

    const moonPhase = calculateMoonPhase(now);
    moonphaseContainer.textContent = moonPhaseIcons[moonPhase] || '❓';
    moonphaseContainer.style.fontSize = '1.2rem';
}

function calculateMoonPhase(date) {
    const diff = date.getTime() - new Date(date.getFullYear(), 0, 0).getTime();
    const dayOfYear = Math.floor(diff / 1000 / 60 / 60 / 24);
    const lunarCycle = 29.53;
    const phase = (dayOfYear % lunarCycle) / lunarCycle;

    if (phase < 0.0625) return 'new';
    if (phase < 0.1875) return 'waxingCrescent';
    if (phase < 0.3125) return 'firstQuarter';
    if (phase < 0.4375) return 'waxingGibbous';
    if (phase < 0.5625) return 'full';
    if (phase < 0.6875) return 'waningGibbous';
    if (phase < 0.8125) return 'lastQuarter';
    if (phase < 0.9375) return 'waningCrescent';
    return 'new';
}

function setTheme(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
}

function checkTimeAndSetTheme() {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    setTheme(isNight);
    darkModeToggle.checked = isNight;

    themeMessage.textContent = `Theme automatically adjusted to ${isNight ? 'dark' : 'light'} mode.`;
    themeMessage.classList.add('show');
    setTimeout(() => {
        themeMessage.classList.remove('show');
    }, 3000);
}

const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'enabled') {
    darkModeToggle.checked = true;
    setTheme(true);
} else if (savedTheme === 'disabled') {
    darkModeToggle.checked = false;
    setTheme(false);
} else {
    checkTimeAndSetTheme();
}

darkModeToggle.addEventListener('change', (event) => {
    setTheme(event.target.checked);
    localStorage.setItem('darkMode', event.target.checked ? 'enabled' : 'disabled');
});

function typeWriter() {
    if (index < taglineText.length) {
        taglineElement.textContent += taglineText.charAt(index);
        index++;
        setTimeout(typeWriter, 85);
    } else {
        startProjectCardAnimation();
    }
}

function startProjectCardAnimation() {
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
            card.style.transform = 'translateY(0)';
            card.style.opacity = 1;
        }, index * 200);
    });
}



socialLinks.forEach(link => {
    let clickedOnce = false;
    let timeoutId;
    const platformName = link.dataset.platform;
    const socialName = link.querySelector('.social-name');

    link.addEventListener('click', (event) => {
        event.preventDefault(); 

        if (!clickedOnce) {
            socialName.textContent = platformName;
            link.classList.add('active');
            clickedOnce = true;

            
            timeoutId = setTimeout(() => {
                socialName.textContent = '';
                link.classList.remove('active');
                clickedOnce = false;
            }, 2000);
        } else {
            clearTimeout(timeoutId); 
            window.location.href = link.href; 
        }
    });

    link.addEventListener('mouseleave', () => {
        clearTimeout(timeoutId); 
        if (clickedOnce) {
            socialName.textContent = '';
            link.classList.remove('active');
            clickedOnce = false;
        }
    });
});


profileImageContainer.addEventListener('mouseenter', () => {
    profileImageContainer.classList.add('shake');
});

profileImageContainer.addEventListener('mouseleave', () => {
    profileImageContainer.classList.remove('shake');
});

profileImageContainer.addEventListener('touchstart', () => {
    profileImageContainer.classList.add('shake');
});

profileImageContainer.addEventListener('touchend', () => {
    profileImageContainer.classList.remove('shake');
});



// Initialize
typeWriter();
updateDateTimeAndMoonPhase();
setInterval(updateDateTimeAndMoonPhase, 1000);

