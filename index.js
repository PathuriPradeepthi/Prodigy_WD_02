let startTime, updatedTime, difference = 0, tInterval, running = false;
let lapsContainer = document.getElementById('laps');
let display = document.getElementById('display');
let startPauseBtn = document.getElementById('startPauseBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let startSound = document.getElementById('startSound');
let pauseSound = document.getElementById('pauseSound');
let resetSound = document.getElementById('resetSound');
let progressBar = document.getElementById('progressBar');

function startPause() {
    if (!running) {
        startSound.play();
        if (difference === 0) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - difference;
        }
        tInterval = setInterval(getShowTime, 1);
        startPauseBtn.innerHTML = "Pause";
        lapBtn.disabled = false;
        running = true;
    } else {
        pauseSound.play();
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startPauseBtn.innerHTML = "Start";
        lapBtn.disabled = true;
        running = false;
    }
    resetBtn.disabled = false; // Enable reset button whether running or paused
}

function reset() {
    resetSound.play();
    clearInterval(tInterval);
    difference = 0;
    display.innerHTML = "00:00:00";
    progressBar.style.width = '0%';
    startPauseBtn.innerHTML = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    running = false;
    lapsContainer.innerHTML = '';
}

function lap() {
    let lapTime = display.innerHTML;
    let lapElement = document.createElement('li');
    lapElement.innerText = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds;

    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    let progressPercentage = (totalSeconds % 60) / 60 * 100;
    progressBar.style.width = progressPercentage + '%';
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
