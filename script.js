// Timer settings
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

// DOM elements
const timerDisplay = document.querySelector('.timer-display');
const timerLabel = document.querySelector('.timer-label');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const addTimeButton = document.getElementById('add-time');
const taskModal = document.getElementById('task-modal');
const taskInput = document.getElementById('task-input');
const startWithTaskButton = document.getElementById('start-with-task');
const cancelTaskButton = document.getElementById('cancel-task');
const currentTaskDisplay = document.querySelector('.current-task');

let timeLeft = WORK_TIME;
let isRunning = false;
let isWorkTime = true;
let timerId = null;
let currentTask = '';

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Show modal
function showTaskModal() {
    taskModal.style.display = 'flex';
    taskInput.focus();
}

// Hide modal
function hideTaskModal() {
    taskModal.style.display = 'none';
    taskInput.value = '';
}

// Update timer display and document title
function updateDisplay() {
    const timeString = formatTime(timeLeft);
    timerDisplay.textContent = timeString;
    timerLabel.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.querySelector('.icon').textContent = isWorkTime ? '☀️' : '🌙';
    startPauseButton.textContent = isRunning ? 'Pause' : 'Start';
    currentTaskDisplay.textContent = currentTask || 'No task selected';
    
    // Update document title
    const mode = isWorkTime ? 'Work' : 'Break';
    const taskInfo = currentTask ? ` - ${currentTask}` : '';
    document.title = isRunning ? `(${timeString}) ${mode}${taskInfo} - Pomodoro Timer` : 'Pomodoro Timer';
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

// Add 5 minutes to the timer
function addFiveMinutes() {
    if (isRunning) {
        timeLeft += 5 * 60; // Add 5 minutes in seconds
        updateDisplay();
    }
}

// Event listeners
startPauseButton.addEventListener('click', () => {
    if (!isRunning) {
        showTaskModal();
    } else {
        pauseTimer();
    }
});

startWithTaskButton.addEventListener('click', () => {
    currentTask = taskInput.value.trim();
    hideTaskModal();
    startTimer();
});

cancelTaskButton.addEventListener('click', () => {
    hideTaskModal();
});

// Close modal when clicking outside
taskModal.addEventListener('click', (e) => {
    if (e.target === taskModal) {
        hideTaskModal();
    }
});

// Handle Enter key in task input
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        currentTask = taskInput.value.trim();
        hideTaskModal();
        startTimer();
    }
});

resetButton.addEventListener('click', () => {
    resetTimer();
    currentTask = '';
    updateDisplay();
});

toggleButton.addEventListener('click', toggleMode);
addTimeButton.addEventListener('click', addFiveMinutes);

// Initialize display
updateDisplay(); 