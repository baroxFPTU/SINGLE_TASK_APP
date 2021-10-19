import * as timer from "./timerHandler.js";
import * as localStorageHandler from "./localStorageHandler.js";
import * as constants from "../constants/index.js";
import { template } from "../template/index.js";
import { Button } from "../components/button.js";
import { utils } from "../utils/index.js";
import {
  exchangeID,
  getTaskToday,
  fetchComplete,
} from "../services/taskService.js";

const {
  input,
  appContainer,
  taskContainer,
  blankTaskClassName,
  TASK_LIMIT,
  NAME_ARRAY_LOCAL,
  NAME_ONDOING_LOCAL,
  COMPLETED_KEY_OBJECT,
} = constants;

/**
 * Simply used to remove the element that used to illustrate for "do not have any task".
 * @returns execute remove the blank task
 */
export const removeBlankTask = () => {
  const blankTaskElm = document.querySelector(blankTaskClassName);
  if (blankTaskElm) return blankTaskElm.remove();
};

export const render = function renderSingleTask(task) {
  if (task[COMPLETED_KEY_OBJECT]) return;

  const htmlString = template.task.one(task);

  removeBlankTask();
  switchStateTaskContainer("has");
  taskContainer.insertAdjacentHTML("beforeend", htmlString);
};

const switchStateTaskContainer = function (state = "blank") {
  const states = {
    has: {
      classCheck: "is-blank",
    },
    blank: {
      classCheck: "has-task",
    },
    actions: {
      has() {
        taskContainer?.classList?.remove("is-blank");
        taskContainer?.classList?.add("has-task");
        appContainer?.classList?.add("has-task");
      },
      blank() {
        taskContainer?.classList?.add("is-blank");
        taskContainer?.classList?.remove("has-task");
        appContainer?.classList?.remove("has-task");
      },
    },
  };

  if (!states[state]) {
    return console.error(
      "Something went wrong. Cannot switch state of task container."
    );
  }

  if (utils.hasClass(taskContainer, states[state].classCheck)) {
    states.actions[state]();
    return;
  }
};

export const renderEmptyTask = () => {
  const htmlString = template.task.empty();

  taskContainer.innerHTML = htmlString;
  switchStateTaskContainer("blank");
};

export const create = async function createNewTask(input) {
  const taskList = await getTaskList();
  const isInRange = taskList.length <= TASK_LIMIT - 1;
  const newTask = {
    id: Date.now(),
    name: input.value.trim(),
    createdAt: Date.now(),
  };

  if (newTask.name == "") return;
  if (!isInRange) {
    return alert("You have reached the limit task of today.");
  }

  input.value = "";
  localStorageHandler.push(NAME_ARRAY_LOCAL, newTask);
  Button.init("start");
  render(newTask);
  exchangeID(newTask);
};

export const start = async function (id = 0) {
  const taskList = await getTaskList();

  const _task =
    taskList.find((task) => task.id === id) ??
    taskList.find((task) => !task[COMPLETED_KEY_OBJECT]);

  if (!_task) {
    resetViewTask();
    renderEmptyTask();
    return;
  }

  const htmlString = template.task.started(_task);

  //Hide the task container and input
  input.parentElement.style.display = "none";
  taskContainer.style.height = "100%";

  //Render view task on doing
  taskContainer.innerHTML = htmlString;
  localStorage.setItem(NAME_ONDOING_LOCAL, JSON.stringify(_task.id));
  Button.init("complete");
  timer.start();
};

export const resetViewTask = function () {
  Button.removeAll();
  [input.parentElement, taskContainer].forEach((elm) => {
    elm.removeAttribute("style");
  });
};

/**
 * Fire when user click on completed button
 * @returns not return
 */
export const complete = async function () {
  const taskID = document
    .querySelector(".task")
    .getAttribute("data-selection-id");
  const timeData = timer.getTimeData();
  const isCompleted = window.confirm(
    "Are you sure you want to complete this task? \nYou will immediately come to the next task."
  );

  if (!isCompleted) return;

  timer.stop();
  updateCompleted(taskID);
  fetchComplete(taskID, timeData);
  start();
};

export const updateCompleted = async (taskID) => {
  const taskList = await getTaskList();
  taskList.forEach((task) => {
    if (task.id === taskID) return (task[COMPLETED_KEY_OBJECT] = true);
  });
  localStorageHandler.set(NAME_ARRAY_LOCAL, taskList);
};

/**
 * Check whether is completed all tasks.
 * @param {*} list
 * @returns Boolean
 */
export const isCompletedAll = (list) => {
  const filterList = list.filter((task) => !task[COMPLETED_KEY_OBJECT]);
  return filterList.length == 0 ? true : false;
};

export const getTaskList = async () => {
  const taskList =
    localStorageHandler.get(NAME_ARRAY_LOCAL) || (await getTaskToday());

  return filterTaskOfToday(taskList);
};

export const filterTaskOfToday = function (list) {
  return list.filter((task) => isInSameDay(task));
};

export const isInSameDay = function (task = Date.now()) {
  const createdDay = new Date(task.createdAt || task).getDay();
  const today = new Date().getDay();
  return createdDay === today ?? false;
};
