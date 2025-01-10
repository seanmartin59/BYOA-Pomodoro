let timeLeft;
let timerId = null;
let isWorkMode = true;

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const toggleModeButton = document.getElementById('toggle-mode');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update page title with current mode and time
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const modeString = isWorkMode ? 'Work' : 'Rest';
    document.title = `${timeString} - ${modeString} Mode - Focus Timer`;
}

function switchMode() {
    // First stop the timer if it's running
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    
    // Then switch modes and reset to full time
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateModeText(true);  // Always show as paused after mode switch
    updateDisplay();
}

function toggleTimer() {
    if (timerId === null) {
        // Start the timer
        if (timeLeft === undefined || timeLeft <= 0) {
            timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                startButton.textContent = 'Start';
                updateModeText(true);
            }
        }, 1000);
        startButton.textContent = 'Pause';
        updateModeText(false);
    } else {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        updateModeText(true);
    }
}

function resetTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateModeText(true);
    updateDisplay();
}

function updateModeText(isPaused = false) {
    // First, decide if we need to show "- Paused"
    let pausedText = '';
    if (isPaused) {
        pausedText = ' - Paused';
    }

    // Then, set the main text based on the mode
    if (isWorkMode) {
        modeText.textContent = 'Work Time' + pausedText;
        toggleModeButton.textContent = 'Switch to Rest Mode';
    } else {
        modeText.textContent = 'Rest Time' + pausedText;
        toggleModeButton.textContent = 'Switch to Work Mode';
    }

    // Update title to show pause state as well
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const modeString = isWorkMode ? 'Work' : 'Rest';
    document.title = `${timeString} - ${modeString}${pausedText} - Focus Timer`;
}

startButton.addEventListener('click', toggleTimer);
toggleModeButton.addEventListener('click', switchMode);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
resetTimer(); 