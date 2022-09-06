const refs = {
  buttonStart: document.querySelector("button[data-start]"),
  buttonStop: document.querySelector("button[data-stop"),
  body: document.querySelector("body"),
}

let timerId = null;

refs.buttonStart.addEventListener("click", onStart);
refs.buttonStop.addEventListener("click", onStop);

refs.buttonStop.setAttribute("disabled", "disabled");

function onStart() {
  timerId = setInterval(colorChange, 1000);
  refs.buttonStop.removeAttribute("disabled");
  refs.buttonStart.setAttribute("disabled", "disabled");
}
function onStop() {
  clearInterval(timerId);
  refs.buttonStart.removeAttribute("disabled");
  refs.buttonStop.setAttribute("disabled", "disabled");
}

function colorChange() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}