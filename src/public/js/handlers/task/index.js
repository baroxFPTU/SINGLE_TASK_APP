import { template } from "../../template/index.js";
import { Button } from "../../components/button.js";
import { utils } from "../../utils/index.js";
import {
  exchangeID,
  getTaskToday,
  fetchComplete,
} from "../../services/taskService.js";
import { timeService } from "../../services/timeService.js";
import { localStorageService } from "../../services/localStorageService.js";
import * as constants from "../../constants/index.js";

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

export const removeBlankTask = () => {
  const blankTaskElm = document.querySelector(blankTaskClassName);
  if (blankTaskElm) return blankTaskElm.remove();
};

export const render = function renderSingleTask(task) {
  if (task[COMPLETED_KEY_OBJECT]) return;

  const htmls = template.task.one(task);

  removeBlankTask();
  taskContainer.insertAdjacentHTML("beforeend", htmls);

  if (utils.hasClass(taskContainer, "is-blank")) {
    taskContainer.classList.remove("is-blank");
    taskContainer.classList.add("has-task");
    taskContainer.parentElement.classList.add("has-task");
  }
};

export const renderEmptyTask = () => {
  const htmls = template.task.empty();

  taskContainer.innerHTML = htmls;
  taskContainer?.classList.add("is-blank");
  taskContainer?.classList.remove("has-task");
  appContainer?.classList?.remove("has-task");
};

export const create = async function (input) {
  const listTask =
    localStorageService.get(NAME_ARRAY_LOCAL) || (await getTaskToday()) || [];
  const isInRange = listTask.length <= TASK_LIMIT - 1;

  const newTask = {
    id: Date.now(),
    name: input.value.trim(),
    createdAt: Date.now(),
  };

  if (newTask.name == "") return;

  input.value = "";

  if (!isInRange) {
    alert("You have reached the limit task of today.");
    return;
  }

  localStorageService.push(NAME_ARRAY_LOCAL, newTask);
  Button.init("start");
  render(newTask);
  exchangeID(newTask);
};

export const start = async function (id = 0) {
  const _tasks =
    localStorageService.get(NAME_ARRAY_LOCAL) ?? (await getTaskToday());
  const _task =
    _tasks.find((task) => task.id === id) ??
    _tasks.find((task) => !task[COMPLETED_KEY_OBJECT]);

  // Render default view when do not have any task.
  if (!_task) {
    Button.removeAll();
    [input.parentElement, taskContainer].forEach((elm) => {
      elm.removeAttribute("style");
    });

    renderEmptyTask();
    return;
  }

  const htmls = template.task.started(_task);

  //Hide the task container and input
  input.parentElement.style.display = "none";
  taskContainer.style.height = "100%";

  //Render view task on doing
  taskContainer.innerHTML = htmls;
  localStorage.setItem(NAME_ONDOING_LOCAL, JSON.stringify(_task.id));
  Button.init("complete");
  timeService.start();
};

export const complete = async function () {
  const taskID = document
    .querySelector(".task")
    .getAttribute("data-selection-id");
  const timeData = timeService.getTimeData();
  const isCompleted = window.confirm(
    "Are you sure you want to complete this task? \nYou will immediately come to the next task."
  );

  if (!isCompleted) return;

  timeService.stop();
  updateCompleted(taskID);
  fetchComplete(taskID, timeData);
  start();
};

export const updateCompleted = async (taskID) => {
  const listTask =
    localStorageService.get(NAME_ARRAY_LOCAL) || (await getTaskToday());

  listTask.forEach((task) => {
    if (task.id === taskID) return (task[COMPLETED_KEY_OBJECT] = true);
  });
  localStorageService.set(NAME_ARRAY_LOCAL, listTask);
};

export const isCompletedAll = (list) => {
  const filterList = list.filter((task) => !task[COMPLETED_KEY_OBJECT]);
  return filterList.length == 0 ? true : false;
};
