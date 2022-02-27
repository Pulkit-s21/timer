// select items
var timeBegan = null; // did the clock start?
var timeStopped = null; // did the clock stop?
var stoppedDuration = 0; // how long was the timer stopped
var startInterval = null; // this is imp to stop the startInterval() method
var flag = null; //to control start/stop of the timer
const timerContainer = document.querySelector(".timer-container");
const timerDisplay = document.querySelector(".timer-display");

// event listeners
timerContainer.addEventListener("click", () => {
    if (!flag) {
        startTimer();
        flag = true;
    } else {
        stopTimer();
        flag = false;
    }
});

timerContainer.addEventListener("dblclick", resetTimer);

// functions
function startTimer() {
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }

    startInterval = setInterval(clockRunning, 10);
}

function stopTimer() {
    timeStopped = new Date();
    clearInterval(startInterval);
}

function clockRunning() {
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

    var hours = timeElapsed.getUTCHours();
    var minutes = timeElapsed.getUTCMinutes();
    var seconds = timeElapsed.getUTCSeconds();
    var milliseconds = timeElapsed.getUTCMilliseconds();

    milliseconds = Math.floor(milliseconds/10); // to get only the first 2 digits
    
    timerDisplay.innerHTML =
        (hours = hours < 10 ? '0' + hours : hours) + ':' +
        (minutes = minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds = seconds < 10 ? '0' + seconds : seconds) + ':' +
        (milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds);  
}

function resetTimer() {
    clearInterval(startInterval);
    timeBegan = null;
    timeStopped = null;
    stoppedDuration = 0;
    flag = false;
    timerDisplay.innerHTML = "00:00:00";
}