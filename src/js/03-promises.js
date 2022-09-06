import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ position: 'right-top', width: '300px', timeout: 5000, fontSize: '20px' });

const form = document.querySelector(".form");
const button = document.querySelector("button");

form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  button.setAttribute("disabled", "disabled");

  setTimeout(() => button.removeAttribute("disabled"),
    parseInt(delay.value) + parseInt(step.value) * (amount.value - 1) + 5000);

  for (let i = 0; i < amount.value; i += 1) {

    createPromise(i + 1, i * step.value + parseInt(delay.value))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

};

