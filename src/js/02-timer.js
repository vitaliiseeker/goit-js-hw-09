import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ position: 'center-top' });

const refs = {
  body: document.querySelector("body"),
  buttonStart: document.querySelector("button[data-start]"),
  timer: document.querySelector(".timer"),
  dataDays: document.querySelector("span[data-days]"),
  dataHours: document.querySelector("span[data-hours]"),
  dataMinutes: document.querySelector("span[data-minutes]"),
  dataSeconds: document.querySelector("span[data-seconds]"),
}

refs.buttonStart.setAttribute("disabled", "disabled");
refs.timer.insertAdjacentHTML("afterend", `<div class="time-is-up"></div>`);

const timeIsUp = document.querySelector(".time-is-up");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {

    clearInterval(timerId);
    selectedDate = selectedDates[0];

    if (new Date() > selectedDate) {
      timerUpdate();
      Notify.failure('Please choose a date in the future');

    } else {
      timerUpdate();
      refs.buttonStart.removeAttribute("disabled");
      refs.buttonStart.addEventListener("click", onStart);
    }
  },
};

let selectedDate = null;
let timerId = null;

flatpickr("#datetime-picker", options);

function onStart() {
  timerId = setInterval((timerUpdate), 1000);
  refs.buttonStart.setAttribute("disabled", "disabled");
}

function timerUpdate() {

  if (new Date() >= selectedDate) {

    clearInterval(timerId);
    refs.dataDays.textContent = "00";
    refs.dataHours.textContent = "00";
    refs.dataMinutes.textContent = "00";
    refs.dataSeconds.textContent = "00";
    timeIsUp.textContent = "Time is up";
    return;
  }

  if (timeIsUp) timeIsUp.textContent = "";

  const { days, hours, minutes, seconds } = convertMs(selectedDate - new Date());

  refs.dataDays.textContent = days;
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);

  colorChange();
}

function convertMs(ms) {

  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function colorChange() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}