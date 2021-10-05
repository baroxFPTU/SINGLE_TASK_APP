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

        timeData.start = Date.now();
        timeData.intervalId = setInterval(function () {
            const elapsedTime = Date.now() - timeData.start + timeData.elapsed;
            
            seconds = parseInt((elapsedTime / 1000) % 60);
            secondsOutput.innerHTML = formatTime(seconds);

            if (seconds == 0) {
                minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
                minutesOutput.innerHTML = formatTime(minutes);
            }

            if (minutes == 0) {
                hours = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);
                hoursOutput.innerHTML = formatTime(hours);
            }

        }, 1000);
    }
    
    const stopCount = function () {
        timeData.elapsed += Date.now() - timeData.start;

        clearInterval(timeData.intervalId);

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