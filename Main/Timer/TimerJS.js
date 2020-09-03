// Constants retrieved from the html file for the timer.
const timerDisplay = document.querySelector(".timerDisplay");
const currentProgress = document.querySelector(".currentProgress");
const work_min = document.querySelector("#work_min");
const rest_min = document.querySelector("#rest_min");
const start_button = document.querySelector("#start_button");
const reset_button = document.querySelector("#reset_button");
const work_button = document.querySelector("#work_button");
const rest_button = document.querySelector("#rest_button");

// Variables that correspond to the timer attributes.
var countdown = 0;
var remaining = 0;
var isRest = false;
var isPaused = true;
var work_time = work_min.textContent * 60;
var rest_time = rest_min.textContent * 60;
var seconds = work_time;

// Variables for alarm.
const alarm = document.createElement('Audio');
alarm.setAttribute("src", "../../PROTOTYPES_Final/Timer/TimerAlarm.mp3");

// Function to countdown the timer.
function timer() {
	seconds--;
	if (seconds < 0) {
		clearInterval(countdown);
		countdown = 0;
		isPaused = !isPaused;
		alarm.currentTime = 7;
		alarm.play();
		isRest = !isRest;
		seconds = (isRest ? rest_time : work_time);
	}
	
	displayTimer(seconds);
}

//Function to start counting down.
function startCountdown() {
	if (remaining != 0) {
		seconds = remaining;
	}
	else {
		seconds = (isRest ? rest_time : work_time);
	}
	
	countdown = setInterval(timer, 1000);
}

// Function to change the display on the timer.
function displayTimer(seconds) {
	var minutes = Math.floor(seconds / 60);
	var remainderSeconds = seconds % 60;
	timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ' '}${remainderSeconds}`;
}

// Function to display current state for timer.
function displayCurrentProgress(isRest) {
	currentProgress.textContent = (isRest ? "Rest Time" : "Work Time");
}

// Function to allow for adaptive start button display.
function startbuttonDisplay() {
	if (isPaused == true && countdown == 0)
	{
		start_button.textContent = "Start";
	}
	else if (isPaused == true && countdown != 0)
	{
		start_button.textContent = "Resume";
	}
	else
	{
		start_button.textContent = "Pause";
	}
}




// On click function for start button.
start_button.addEventListener('click', function() {
	if (isPaused == true && countdown == 0)
	{
		isPaused = !isPaused;
		clearInterval(countdown);
		startCountdown();
	}
	else if (isPaused == true && countdown != 0)
	{
		isPaused = !isPaused;
		clearInterval(countdown);
		startCountdown();
	}
	else
	{
		isPaused = !isPaused;
		remaining  = seconds;
		clearInterval(countdown);
	}
})

// Function to reset timer.
reset_button.addEventListener('click', function() {
	clearInterval(countdown);
	isRest = false;
	isPaused = true;
	countdown = 0;
	remaining = 0;
	seconds = work_time;
})

// On click function for custom work and rest time inputs.
work_button.addEventListener('click', function() {
	let intermediate = document.getElementById("user_work_min");
	work_time = intermediate.value * 60;
	seconds = work_time;
})

rest_button.addEventListener('click', function() {
	let intermediate= document.getElementById("user_rest_min");
	rest_time = intermediate.value * 60;
})



// Function to Constantly Update the Screen
function update() {
	displayTimer(seconds);
	displayCurrentProgress(isRest);
	startbuttonDisplay();
	work_min.textContent = work_time / 60;
	rest_min.textContent = rest_time / 60;
}

window.setInterval(update, 100);


// These 2 codes handle the sidepanel mechanics.
function openPanel() {
	document.getElementById("Sidepanel").style.width = "210px";
}

function closePanel() {
	document.getElementById("Sidepanel").style.width = "0";
}