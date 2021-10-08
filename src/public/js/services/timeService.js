const debug = console.log.bind(document);
import { hoursOutputClass, minutesOutputClass, secondsOutputClass, NAME_ONDOING_LOCAL} from '../constants/index.js';

export const timeService = (function () {
    let _hours, _minutes, _seconds;
    const timeData = {
        elapsed: 0
    };

    const startCount =  function () {
        const hoursOutput = document.querySelector(hoursOutputClass);
        const minutesOutput = document.querySelector(minutesOutputClass);
        const secondsOutput = document.querySelector(secondsOutputClass);

        timeData.start = parseInt(localStorage.getItem('start-time')) || Date.now();
        localStorage.setItem('start-time', timeData.start);

        timeData.intervalId = setInterval(ticking.bind(this, hoursOutput, minutesOutput, secondsOutput), 1000);
    }
    
    const ticking = (hoursOutput, minutesOutput, secondsOutput) => {
        let hours, minutes, seconds;
        const currentTime = Date.now();
        const elapsedTime = new Date(currentTime - timeData.start);
        
        hours = elapsedTime.getUTCHours();
        minutes = elapsedTime.getUTCMinutes();
        seconds = elapsedTime.getUTCSeconds();
        
        _seconds = seconds;
        secondsOutput.innerHTML = formatTime(seconds);

        if (minutes !== _minutes) {
            _minutes = minutes;
            minutesOutput.innerHTML = formatTime(minutes);
        }

        if (hours !== _hours) {
            _hours = hours;
            hoursOutput.innerHTML = formatTime(hours);
        }
    }

    const stopCount = () => {
        timeData.complete = Date.now();
        timeData.elapsed += Date.now() - timeData.start;
        console.log(timeData);
        
        clearInterval(timeData.intervalId);
        localStorage.removeItem('start-time');
        localStorage.removeItem(NAME_ONDOING_LOCAL);
        
    }
    const formatTime = (time, type) => {
      return time < 10 ? `0${time}` : time
    }

    const getTimeData = () => timeData;

    return {
        start: startCount,
        stop: stopCount,
        getTimeData
    }
}());