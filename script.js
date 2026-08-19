// ===== Typewriter Effect =====
const commands = [
    { text: 'nmap -sV ctf-challenge.local', delay: 60 },
];

const outputLines = [
    { text: 'Starting CTF Challenge Arena...', delay: 800 },
    { text: 'Loading <span class="highlight">3 challenges</span>...', delay: 400 },
    { text: 'Difficulty: <span class="highlight">Easy</span>', delay: 300 },
    { text: 'Status: <span class="warn">Flags hidden</span>', delay: 300 },
    { text: '', delay: 200 },
    { text: '<span class="highlight">Ready.</span> Start hunting!', delay: 500 },
];

function typeWriter() {
    const el = document.getElementById('typewriter');
    const outputEl = document.getElementById('terminalOutput');
    const cmd = commands[0];
    let i = 0;

    function typeChar() {
        if (i < cmd.text.length) {
            el.textContent += cmd.text[i];
            i++;
            setTimeout(typeChar, cmd.delay + Math.random() * 40);
        } else {
            // Show output lines
            setTimeout(() => showOutputLines(outputEl, 0), 600);
        }
    }

    setTimeout(typeChar, 1000);
}

function showOutputLines(container, index) {
    if (index >= outputLines.length) return;

    const line = outputLines[index];
    const div = document.createElement('div');
    div.className = 'output-line';
    div.innerHTML = line.text || '&nbsp;';
    div.style.animationDelay = '0s';
    container.appendChild(div);

    setTimeout(() => showOutputLines(container, index + 1), line.delay);
}

// ===== Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = particle.style.height = (1 + Math.random() * 3) + 'px';
        container.appendChild(particle);
    }
}

// ===== Solved State Tracking =====
const solvedState = {
    challenge1: false,
    challenge2: false,
    challenge3: false,
};

function markSolved(challengeKey, cardId) {
    solvedState[challengeKey] = true;
    const card = document.getElementById(cardId);
    if (card) {
        card.classList.add('is-solved');
        const tags = card.querySelector('.card-tags');
        if (tags && !tags.querySelector('.badge-solved')) {
            const badge = document.createElement('span');
            badge.className = 'badge-solved';
            badge.textContent = 'SOLVED';
            tags.appendChild(badge);
        }
    }
    checkAllSolved();
}

function checkAllSolved() {
    if (solvedState.challenge1 && solvedState.challenge2 && solvedState.challenge3) {
        const banner = document.getElementById('completionBanner');
        if (banner) {
            banner.style.display = 'block';
            banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Grand celebration confetti
        launchConfetti();
        setTimeout(launchConfetti, 1000);
    }
}

// ===== Flag Checking =====
function checkFlag1() {
    const input = document.getElementById('flag1Input');
    const result = document.getElementById('result1');
    const value = input.value.trim();

    if (value === 'FLAG{r0b0ts_c4nt_k33p_s3cr3ts}') {
        result.className = 'flag-result success';
        result.textContent = 'Correct! Challenge 1 solved!';
        markSolved('challenge1', 'challenge1');
        launchConfetti();
    } else if (value === '') {
        result.className = 'flag-result error';
        result.textContent = 'Please enter a flag';
    } else {
        result.className = 'flag-result error';
        result.textContent = 'Incorrect flag. Try again!';
        shakeInput(input);
    }
}

function checkFlag2() {
    const input = document.getElementById('flag2Input');
    const result = document.getElementById('result2');
    const value = input.value.trim();

    if (value === 'FLAG{1nsp3ct_3l3m3nt_m4st3r}') {
        result.className = 'flag-result success';
        result.textContent = 'Correct! Challenge 2 solved!';
        markSolved('challenge2', 'challenge2');
        launchConfetti();
    } else if (value === '') {
        result.className = 'flag-result error';
        result.textContent = 'Please enter a flag';
    } else {
        result.className = 'flag-result error';
        result.textContent = 'Incorrect flag. Try again!';
        shakeInput(input);
    }
}

function checkFlag3() {
    const input = document.getElementById('flag3Input');
    const result = document.getElementById('result3');
    const value = input.value.trim();

    if (value.toLowerCase() === 'flag{ctrl_c_beats_black_boxes}') {
        result.className = 'flag-result success';
        result.textContent = 'Correct! Challenge 3 solved!';
        markSolved('challenge3', 'challenge3');
        launchConfetti();
    } else if (value === '') {
        result.className = 'flag-result error';
        result.textContent = 'Please enter a flag';
    } else {
        result.className = 'flag-result error';
        result.textContent = 'Incorrect flag. Try again!';
        shakeInput(input);
    }
}

// ===== Shake Animation =====
function shakeInput(el) {
    el.style.animation = 'none';
    el.offsetHeight; // trigger reflow
    el.style.animation = 'shake 0.5s ease';
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== Confetti =====
function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#63ffb6', '#7c83ff', '#fbbf24', '#f87171', '#4ade80', '#a78bfa'];

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.width = (5 + Math.random() * 10) + 'px';
        piece.style.height = (5 + Math.random() * 10) + 'px';
        container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 4000);
}

// ===== Allow Enter key to submit =====
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('flag1Input')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkFlag1();
    });
    document.getElementById('flag2Input')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkFlag2();
    });
    document.getElementById('flag3Input')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkFlag3();
    });
});

// ===== Init =====
createParticles();
typeWriter();
