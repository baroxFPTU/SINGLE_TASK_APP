import { utils } from "../utils/index.js";
import * as localStorageHandler from "../handlers/localStorageHandler.js";
import * as constants from "../constants/index.js";

const { NAME_ARRAY_LOCAL, API_URL } = constants;

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
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${API_URL}/task/new`, options);

    return response;
  } catch (error) {
    console.log(error);
  }
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
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${API_URL}/task/today`, options);

    if (response.status !== 200) {
      throw new Error();
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
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
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${API_URL}/task/completed`, options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateName = async function ({ id, newName }) {
  const data = {
    id: id,
    name: newName,
  };

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${API_URL}/task/`, options);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { fetchTaskData, getTaskToday, fetchComplete, exchangeID, updateName };
