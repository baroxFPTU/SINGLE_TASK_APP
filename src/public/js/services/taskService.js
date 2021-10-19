import { utils } from "../utils/index.js";
import * as localStorageHandler from "../handlers/localStorageHandler.js";
import * as constants from "../constants/index.js";

const { NAME_ARRAY_LOCAL, API_URL } = constants;

const apis = (type) => {
  const URLs = {
    newTask: `/task/new`,
    taskToday: `/task/today`,
    complete: `/task/completed`,
    updateName: `/task/`,
    deleteOne: `/task/delete`,
  };
  return API_URL + URLs[type];
};

const options = (method = "GET", data = "") => {
  const _options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET") {
    _options.body = JSON.stringify(data);
  }

  return _options;
};

const methods = {
  newTask: "POST",
  taskToday: "GET",
  complete: "PUT",
  updateName: "PATCH",
  deleteOne: "DELETE",
};

const fetchPattern = async function (type, data = "") {
  try {
    const response = await fetch(apis(type), options(methods[type], data));
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fetch task data to server.
 * @param {*} task
 * @returns JSON
 */
const fetchTaskData = async function (task) {
  const data = {
    name: task.name,
    createdAt: task.createdAt,
  };

  return await fetchPattern("newTask", data);
};

/**
 * Get the ID created by MongoDB from server and replace it with the ID of the task.
 * @param {*} task
 */
const exchangeID = async function (task) {
  try {
    let response = await fetchTaskData(task);
    const oldID = task.id;

    if (await response.ok) {
      const data = await response.json();

      utils.setSelectionID(data);
      localStorageHandler.updateById({
        nameItem: NAME_ARRAY_LOCAL,
        id: oldID,
        newData: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Just get all task of today
 * @param {*} task
 * @returns JSON
 */
const getTaskToday = async function () {
  const response = await fetchPattern("taskToday");
  return response.json();
};

/**
 * Update data when user click completed button
 * @param {*} task
 * @returns Response from server
 */
const fetchComplete = async function (id, timeData) {
  const data = {
    id: id,
    timeData: timeData,
  };

  return await fetchPattern("complete", data);
};

const updateName = async function ({ id, newName }) {
  const data = {
    id: id,
    name: newName,
  };

  return await fetchPattern("updateName", data);
};

const deleteOne = async function (id) {
  const data = {
    id: id,
  };

  return await fetchPattern("deleteOne", data);
};

export {
  fetchTaskData,
  getTaskToday,
  fetchComplete,
  exchangeID,
  updateName,
  deleteOne,
};
