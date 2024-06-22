// Declaring DOM Variables for Manipulation
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

// Global Varaibles that will be resused
let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input/Form
    inputContainer.hidden = true;

    // Check if countdown ended, show complete
    if (distance < 0) {
      // Hide countdown and show complete
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeEl.hidden = false;
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    } else {
      // Show countdown in progress - Populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;

      // Show Countdown
      countdownEl.hidden = false;
    }
  }, second);
}

// Update Countdown Form
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;

  // Local Storage
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  // Check for a valid date
  if (countdownDate === "") {
    alert("Please select a date for the countdown");
  } else {
    // Get the number version of current date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset Countdown
function reset() {
  // Hide Countdown
  countdownEl.hidden = true;

  // Hide complete UI
  completeEl.hidden = true;

  // Show Input/Form
  inputContainer.hidden = false;

  // Stop Countdown
  clearInterval(countdownActive);

  // Reset values
  countdownTitle = "";
  countdownDate = "";

  // reset local storage
  localStorage.removeItem("countdown");
}

// Retrieve Local Storage
function restorePreviousCountdown() {
  // Get countdown from local storage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On load, check localStorage
restorePreviousCountdown();
