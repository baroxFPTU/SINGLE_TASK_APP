const debug = console.log.bind(document);
import * as constants from "../constants/index.js";

const {
  hoursOutputClass,
  minutesOutputClass,
  secondsOutputClass,
  NAME_ONDOING_LOCAL,
  NAME_START_TIME_LOCAL,
} = constants;

// both variables (_hours, _minutes) save the previous values to compare.
let _hours, _minutes;
const timeData = {
  elapsed: 0,
};

const ticking = (hoursOutput, minutesOutput, secondsOutput) => {
  let hours, minutes, seconds;
  const currentTime = Date.now();
  const elapsedTime = new Date(currentTime - timeData.start);

  hours = elapsedTime.getUTCHours();
  minutes = elapsedTime.getUTCMinutes();
  seconds = elapsedTime.getUTCSeconds();

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

/**
 * add 0 to the time number lower than 10 (9,8,7,...).
 * @param {*} time
 * @param {*} type
 * @returns string
 */
const formatTime = (time, type) => {
  return time < 10 ? `0${time}` : time;
};

export const start = function startCount() {
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

export const stop = function stopCount() {
  timeData.complete = Date.now();
  timeData.elapsed += Date.now() - timeData.start;
  clearInterval(timeData.intervalId);
  localStorage.removeItem(NAME_START_TIME_LOCAL);
  localStorage.removeItem(NAME_ONDOING_LOCAL);
};

export const getTimeData = () => timeData;
