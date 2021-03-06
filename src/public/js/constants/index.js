import * as taskHandler from "../handlers/taskHandler.js";

//App constants
export const API_URL = "/api";
export const input = document.querySelector(".js-input");
export const appContainer = document.querySelector(".js-app-container");
export const taskContainer = document.querySelector(".js-task-container");
export const hoursOutputClass = ".js-hours-output";
export const minutesOutputClass = ".js-minutes-output";
export const secondsOutputClass = ".js-seconds-output";
export const blankTaskClassName = ".js-blank-task";
export const TASK_LIMIT = 10;

// localStorage constants
export const NAME_ARRAY_LOCAL = "task.list";
export const NAME_ONDOING_LOCAL = "task.ondoing";
export const NAME_START_TIME_LOCAL = "task.start_time";
export const COMPLETED_KEY_OBJECT = "isCompleted";
