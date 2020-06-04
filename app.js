let countdown
let breakCountdown
const minutesInput = document.querySelector('.main__show-set-time')
const breakInput = document.querySelector('.main__show-set-breaks')
const repeatInput = document.querySelector('.main__show-set-repeat')
const startButton = document.querySelector('.main__start-button')
const timerSection = document.querySelector('.main__show-timer')
const optionsSection = document.querySelector('.main__show-timer-options')
const timerButton = document.querySelector('.header__icon-options')
const optionsButton = document.querySelector('.header__icon-timer')
const stopButton = document.querySelector('.main__stop-button')
const timer = document.querySelector('.main__timer')
const breakTimer = document.querySelector('.main__break-timer')
const inputElement = document.getElementsByTagName('input')
const root = document.documentElement


let stop = false
let countingToStop = 0
let stopCountValue
let repeatCount
console.log(repeatCount)

startButton.addEventListener('click', startCountDown)
stopButton.addEventListener('click', stopCounting)
timerButton.addEventListener('click', toggleDivs)
optionsButton.addEventListener('click', toggleDivs)

function toggleDivs() {
    optionsSection.classList.toggle('un-hide')
    timerSection.classList.toggle('hide')
}

function stopCounting() {
    stop = true
}


function startCountDown() {
    let time
    stop = false
    repeatCount = repeatInput.value
    repeatCount = repeatCount - countingToStop

    console.log("start count" + repeatCount)
    console.log(countingToStop)

    if (repeatCount > 0) {
        clearInterval(countdown);
        // if (stopCountValue > 0) {
        //     time = time //po przerwie ustawiasz time na zero to własnie robi stopCount
        //     console.log('stopCount' + stopCountValue)
        // } else {
        time = minutesInput.value
        time *= 60
        // }
        intervalOptions(time)
    }
}


function intervalOptions(time) {
    clearInterval(countdown)
    countdown = setInterval(() => {
        time--
        if (time < 0 || stop) {
            clearInterval(countdown)
            return;
        }
        // stopCountValue = time
        displayTimeLeft(time)

        if (time === 0) {
            const breakMinutes = breakInput.value
            startBreak(breakMinutes)
            countingToStop++
            console.log(repeatCount)
        }

    }, 1000)


}

function startBreak(timeLeft) {
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
        // stopCountValue = timeLeft
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

}

function displayTimeLeft(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const displayOnScreen = ` ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds} `
    timer.textContent = displayOnScreen
}

function displayBreakTimeLeft(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const displayOnScreen = ` 0${minutes} : ${seconds < 10 ? '0' : ''}${seconds} `
    breakTimer.textContent = displayOnScreen
}
