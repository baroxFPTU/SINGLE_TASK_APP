const debug = console.log.bind(document);

export const timeService = (function () {
        const timeData = {
            elapsed: 0
        };
    const startCount =  function () {
        const hoursOutput = document.querySelector('.js-hours-output');
        const minutesOutput = document.querySelector('.js-minutes-output');
        const secondsOutput = document.querySelector('.js-seconds-output');
        let hours, minutes, seconds;

        timeData.start = parseInt(localStorage.getItem('start-time')) || Date.now();
        localStorage.setItem('start-time', timeData.start);

        timeData.intervalId = setInterval(function () {
            const currentTime = Date.now();
            const elapsedTime = new Date(currentTime - timeData.start);
            
            seconds = elapsedTime.getUTCSeconds();
            secondsOutput.innerHTML = formatTime(seconds);
            minutes = elapsedTime.getUTCMinutes();
            minutesOutput.innerHTML = formatTime(minutes);
            hours = elapsedTime.getUTCHours();
            hoursOutput.innerHTML = formatTime(hours);
            // if (seconds == 0) {
            //     minutes = elapsedTime.getUTCMinutes();
            //     minutesOutput.innerHTML = formatTime(minutes);
            // }

            // if (minutes == 0) {
            //     hours = elapsedTime.getUTCHours();
            //     hoursOutput.innerHTML = formatTime(hours);
            // }

        }, 1000);
    }
    
    const stopCount = function () {
        timeData.elapsed += Date.now() - timeData.start;

        clearInterval(timeData.intervalId);
        localStorage.removeItem('start-time');
        console.log(timeData.elapsed);
    }
    const formatTime = function (time, type) {
      return time < 10 ? `0${time}` : time
    }

    const displayTime = function (hours, minutes, seconds) {
        const hoursOutput = document.querySelector('.js-hours-output');
        const minutesOutput = document.querySelector('.js-minutes-output');
        const secondsOutput = document.querySelector('.js-seconds-output');

        const leadZeroTime = [hours, minutes, seconds].map(time => time < 10 ? `0${time}` : time);
        
        if (!leadZeroTime.includes(null)) {
            [hours, minutes, seconds] = leadZeroTime;

            secondsOutput.innerHTML = seconds;
            minutesOutput.innerHTML = minutes;
            hoursOutput.innerHTML = hours;
        }
        }

    return {
    start: startCount,
    stop: stopCount,
    }
}());