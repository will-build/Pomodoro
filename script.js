// Timer settings
const WORK_TIME = 30* 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

// DOM elements
const timerDisplay = document.querySelector('.timer-display');
const timerLabel = document.querySelector('.timer-label');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');

let timeLeft = WORK_TIME;
let isRunning = false;
let isWorkTime = true;
let timerId = null;

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update timer display and document title
function updateDisplay() {
    const timeString = formatTime(timeLeft);
    timerDisplay.textContent = timeString;
    timerLabel.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    
    // Update document title
    const mode = isWorkTime ? 'Work' : 'Break';
    document.title = isRunning ? `(${timeString}) ${mode} - Pomodoro Timer` : 'Pomodoro Timer';
}

// Toggle between work and break modes
function toggleMode() {
    if (isRunning) {
        pauseTimer();
    }
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

// Timer logic
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
                updateDisplay();
                alert(isWorkTime ? 'Break is over! Time to work!' : 'Work session complete! Take a break!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        updateDisplay();
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    updateDisplay();
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);

// Initialize display
updateDisplay(); 