const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let intervalId = null;
stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', clickStart);
stopBtn.addEventListener('click', clickStop);

function clickStart() {
  intervalId= setInterval(()=>{
    changeBgCollor()
  }, 1000)

  startBtn.setAttribute('disabled', 'true')
  stopBtn.removeAttribute('disabled')
}

function clickStop(){
    clearInterval(intervalId)
    startBtn.removeAttribute('disabled')
    stopBtn.setAttribute('disabled', 'true')
}

function changeBgCollor(){
  const randomColor = getRandomHexColor()
    document.body.style.backgroundColor = randomColor
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }