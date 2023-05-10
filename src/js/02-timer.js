import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

btnStart.setAttribute('disabled', true);

let currentDate = new Date();
let remainingTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    remainingTime = selectedDates[0] - currentDate;
    if (remainingTime < 0) {
        Notiflix.Notify.failure('Please choose a date in the future');
      
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr(dataTimePicker, options);

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

function addLeadingZero({days, hours, minutes, seconds}) {
  const formatedDays = days.toString().padStart(2, '0');
  const formatedHours =hours.toString().padStart(2, '0');
  const formatedMinutes = minutes.toString().padStart(2, '0');
  const formatedSeconds = seconds.toString().padStart(2, '0');

  return { formatedDays, formatedHours, formatedMinutes, formatedSeconds };
}





function updateInterface(
  {formatedDays,
  formatedHours,
  formatedMinutes,
  formatedSeconds}
) {
  daysValue.textContent = formatedDays;
  hoursValue.textContent = formatedHours;
  minutesValue.textContent = formatedMinutes;
  secondsValue.textContent = formatedSeconds;
}

function runTimer() {
  intervalId = setInterval(() => {
    remainingTime -= 1000;

    updateInterface(addLeadingZero(convertMs(remainingTime)));

    if (remainingTime < 1000) {
      stopTimer(() => {
        clearInterval(intervalId);
      });
    }
  }, 1000);
}

btnStart.addEventListener('click', btnStartClick);

function btnStartClick() {
  updateInterface(addLeadingZero(convertMs(remainingTime)));
  runTimer();
  btnStart.setAttribute("disabled", true);
  dataTimePicker.setAttribute("disabled", true);
}
