let countdown
let breakCountdown
const inputElement = document.getElementsByTagName('input')
const minutesInput = document.querySelector('.main__show-set-time')
const breakInput = document.querySelector('.main__show-set-breaks')
const repeatInput = document.querySelector('.main__show-set-repeat')

const timerSection = document.querySelector('.main__show-timer')
const optionsSection = document.querySelector('.main__show-timer-options')

const startButton = document.querySelector('.main__start-button')
const timerButton = document.querySelector('.header__icon-options')
const optionsButton = document.querySelector('.header__icon-timer')
const stopButton = document.querySelector('.main__stop-button')
const resetButton = document.querySelector('.main__reset-button')
const buttonElement = document.getElementsByTagName('button')

const timer = document.querySelector('.main__timer')
const breakTimer = document.querySelector('.main__break-timer')

const startAudio = new Audio('start.wav');
const breakAudio = new Audio('break.wav');
const root = document.documentElement
const howManyLeft = document.querySelector('.main__how-many')

window.document.title = 'Pomodoro-tracker'

let stop = false
let countingToStop = 0
let repeatCount
let stopCountValue
let stopCountBreakValue

startButton.addEventListener('click', startCountDown)
stopButton.addEventListener('click', stopCounting)
timerButton.addEventListener('click', toggleDivs)
optionsButton.addEventListener('click', toggleDivs)
resetButton.addEventListener('click', resetAll)

function toggleDivs() {
    optionsSection.classList.toggle('un-hide')
    timerSection.classList.toggle('hide')
}

function stopCounting() {
    stop = true
}

function resetAll() {
    if (breakTimer.classList.contains('un-hide')) {
        breakColors()
    }
    repeatInput.value = 0
    breakInput.value = 0
    minutesInput.value = 0
    repeatInput.value = ''
    breakInput.value = ''
    minutesInput.value = ''
    clearInterval(countdown)
    clearInterval(breakCountdown)
    displayTimeLeft(0)
    displayBreakTimeLeft(0)
    displayPomodoroLeft(0)
    stopCountValue = 0
    countingToStop = 0

}


function startCountDown() {


    let time
    stop = false
    repeatCount = repeatInput.value
    repeatCount = repeatCount - countingToStop
    displayPomodoroLeft(repeatCount)
    if (repeatCount === 0 && minutesInput.value === '') {
        repeatInput.value = 4
        repeatCount = 4
        breakInput.value = 5
        minutesInput.value = 35
        stopCountValue = 0
        displayPomodoroLeft(repeatCount)
    }
    if (repeatCount > 0) {
        if (stopCountValue > 0) {
            time = stopCountValue // jezeli klikniemy stop i potem wznowimy to czas liczymy od momentu stopu a nie od nowa
        } else {
            startAudio.play();
            clearInterval(countdown);
            time = minutesInput.value
            time *= 60
        }
        intervalOptions(time)
    }
}


function intervalOptions(time) {
    let breakMinutes


    clearInterval(countdown)
    countdown = setInterval(() => {
        time--
        if (time < 0 || stop) {
            clearInterval(countdown)
            return;
        }
        displayTimeLeft(time)
        stopCountValue = time

        if (time === 0) {
            breakMinutes = breakInput.value
            if (breakMinutes === '') {
                startBreak(5)
            } else {
                startBreak(breakMinutes)
                countingToStop++
            }
        }
    }, 1000)
}

function startBreak(timeLeft) {
    breakAudio.play();
    breakColors()
    timeLeft *= 60
    clearInterval(breakCountdown)
    breakCountdown = setInterval(() => {
        timeLeft--
        if (timeLeft < 0) {
            clearInterval(breakCountdown)
            startCountDown()
            breakColors()
            return;
        }
        displayBreakTimeLeft(timeLeft)
    }, 1000)
}

function breakColors() {
    timer.classList.toggle('hide')
    breakTimer.classList.toggle('un-hide')
    root.classList.toggle('break-color')

    for (item of inputElement) {
        item.classList.toggle('break-color');
    }

    for (item of buttonElement) {
        item.classList.toggle('break-font-color');
    }

}

function displayTimeLeft(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    window.document.title = ` ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds} `
    const displayOnScreen = ` ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds} `
    timer.textContent = displayOnScreen
}

function displayBreakTimeLeft(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    window.document.title = ` ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds} `
    const displayOnScreen = ` ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds} `
    breakTimer.textContent = displayOnScreen
}

function displayPomodoroLeft(count) {
    const displayOnScreen = `Zostało ci ${count} pomodoro do wykonania`
    howManyLeft.textContent = displayOnScreen
}
