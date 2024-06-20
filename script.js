// Declaring DOM Variables for Manipulation
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

// Global Varaibles that will be resused
let countdownTitle = "";
let countdownDate = "";

// Set Date Input Min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Update Countdown Form
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  console.log(countdownTitle, countdownDate);
}

// Event Listener
countdownForm.addEventListener("submit", updateCountdown);
