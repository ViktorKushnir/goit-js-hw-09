import Notiflix, { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

formEl.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;
  let position = 1;
  let nextDelay = Number(delay.value);

  for (let i = 0; i < amount.value; i += 1) {
    createPromise(position, nextDelay).then(({position, delay}) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
    .catch(({position, delay}) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    })
    position += 1;
    nextDelay += Number(step.value)
  }
}
