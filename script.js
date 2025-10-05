const input = document.getElementById('input');
const output = document.getElementById('output');
const cursor = document.querySelector('.cursor');
const powerButton = document.getElementById('powerButton');
const powerLed = document.getElementById('powerLed');
const screen = document.getElementById('screen');
const screenContent = document.getElementById('screenContent');
const powerOverlay = document.getElementById('powerOverlay');
let commandHistory = [];
let isPowerOn = true;

// Power button functionality
powerButton.addEventListener('click', () => {
    if (isPowerOn) {
        // Turn off
        screenContent.classList.add('turning-off');
        screenContent.classList.remove('turning-on');
        powerLed.classList.remove('on');

        setTimeout(() => {
            screenContent.classList.remove('turning-off');
            screenContent.classList.add('powered-off');
            isPowerOn = false;
        }, 800);
    } else {
        // Turn on
        screenContent.classList.remove('powered-off');
        screenContent.classList.add('turning-on');
        powerLed.classList.add('on');

        setTimeout(() => {
            screenContent.classList.remove('turning-on');
            isPowerOn = true;
            input.focus();
        }, 1200);
    }
});

// Initialize power LED as on
powerLed.classList.add('on');

// Update cursor position based on input
function updateCursor() {
    const text = input.value;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = getComputedStyle(input).font;
    const width = context.measureText(text).width;
    cursor.style.left = width + 'px';
}

input.addEventListener('input', updateCursor);
input.addEventListener('click', updateCursor);
input.addEventListener('keyup', updateCursor);

const commands = {
    help: () => {
        return [
            'Available commands:',
            '  help     - Show this help message',
            '  clear    - Clear the screen',
            '  time     - Display current time',
            '  date     - Display current date',
            '  status   - Show system status',
            '  matrix   - Enter the Matrix',
            '  hello    - Greeting',
            '  echo     - Echo your message'
        ];
    },
    clear: () => {
        output.innerHTML = '';
        return null;
    },
    time: () => {
        return ['Current time: ' + new Date().toLocaleTimeString()];
    },
    date: () => {
        return ['Current date: ' + new Date().toLocaleDateString()];
    },
    status: () => {
        return [
            'Tanay OS Status:',
            '  Version: 0.1',
            '  CPU: 12% | RAM: 45% | DISK: 67%',
            '  Network: ONLINE',
            '  Temperature: 42°C',
            '  Uptime: 42 days, 13 hours'
        ];
    },
    hello: () => {
        return ['Hello, User! Welcome to Tanay OS v0.1'];
    },
    matrix: () => {
        const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01';
        let result = [];
        for (let i = 0; i < 5; i++) {
            let line = '';
            for (let j = 0; j < 40; j++) {
                line += chars[Math.floor(Math.random() * chars.length)];
            }
            result.push(line);
        }
        return result;
    },
    echo: (args) => {
        return [args.join(' ') || 'Echo: (nothing to echo)'];
    }
};

function executeCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    addLine('tanay@os:~$ ' + cmd);

    if (commands[command]) {
        const result = commands[command](args);
        if (result) {
            result.forEach(line => addLine(line));
        }
    } else if (cmd.trim()) {
        addLine('Command not found: ' + command);
        addLine('Type "help" for available commands.');
    }

    addLine('');
    output.scrollTop = output.scrollHeight;
}

function addLine(text) {
    const line = document.createElement('div');
    line.className = 'line';
    line.textContent = text;
    output.appendChild(line);
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value;
        if (cmd.trim()) {
            commandHistory.push(cmd);
            executeCommand(cmd);
        }
        input.value = '';
        updateCursor();
    }
});

// Random flicker effect
setInterval(() => {
    if (Math.random() > 0.95 && isPowerOn) {
        document.querySelector('.flicker').style.opacity = Math.random() * 0.5 + 0.5;
        setTimeout(() => {
            document.querySelector('.flicker').style.opacity = 1;
        }, 50);
    }
}, 100);

// Auto-focus input
document.addEventListener('click', (e) => {
    if (isPowerOn && e.target.id !== 'powerButton') {
        input.focus();
    }
});