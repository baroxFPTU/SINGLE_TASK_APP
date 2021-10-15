const debug = console.log.bind(document);
import * as constants from "../constants/index.js";

const {
  hoursOutputClass,
  minutesOutputClass,
  secondsOutputClass,
  NAME_ONDOING_LOCAL,
  NAME_START_TIME_LOCAL,
} = constants;

export const timeService = (function () {
  let _hours, _minutes, _seconds;
  const timeData = {
    elapsed: 0,
  };

  const startCount = function () {
    const hoursOutput = document.querySelector(hoursOutputClass);
    const minutesOutput = document.querySelector(minutesOutputClass);
    const secondsOutput = document.querySelector(secondsOutputClass);

    timeData.start =
      parseInt(localStorage.getItem(NAME_START_TIME_LOCAL)) || Date.now();
    localStorage.setItem(NAME_START_TIME_LOCAL, timeData.start);

    timeData.intervalId = setInterval(
      ticking.bind(this, hoursOutput, minutesOutput, secondsOutput),
      1000
    );
  };

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
  };

  const stopCount = () => {
    timeData.complete = Date.now();
    timeData.elapsed += Date.now() - timeData.start;
    clearInterval(timeData.intervalId);
    localStorage.removeItem(NAME_START_TIME_LOCAL);
    localStorage.removeItem(NAME_ONDOING_LOCAL);
  };
  const formatTime = (time, type) => {
    return time < 10 ? `0${time}` : time;
  };

  const getTimeData = () => timeData;

  return {
    start: startCount,
    stop: stopCount,
    getTimeData,
  };
})();
