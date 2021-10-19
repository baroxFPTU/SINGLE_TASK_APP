import * as taskHandler from "./handlers/taskHandler.js";
import * as taskService from "./services/taskService.js";
import * as localStorageHandler from "./handlers/localStorageHandler.js";
import * as constants from "./constants/index.js";
import * as events from "./handlers/eventsHandler.js";
import { Button } from "./components/button.js";

const { input, addButton, NAME_ARRAY_LOCAL, NAME_ONDOING_LOCAL } = constants;

const app = (function () {
  const handleDataOnLoad = async function () {
    const _tasksFromLocal = localStorageHandler.get(NAME_ARRAY_LOCAL);
    const _tasksFromServer = await taskService.getTaskToday();
    const _tasks = _tasksFromLocal || _tasksFromServer;

    if (_tasksFromLocal || (await _tasksFromServer)) {
      const _tasksFiltered = filterTaskInSameDay(_tasks);
      console.log(_tasksFiltered);
      localStorage.setItem(NAME_ARRAY_LOCAL, JSON.stringify(_tasksFiltered));

      window.taskList = _tasksFiltered;
      _tasksFiltered.forEach((task) => {
        if (isInSameDay(task)) {
          taskHandler.render(task);
        } else {
        }
      });

      !taskHandler.isCompletedAll(_tasksFiltered)
        ? Button.init("start")
        : Button.removeAll();
    }
  };

  return {
    async run() {
      events.listen();

      let ondoingTask =
        JSON.parse(localStorage.getItem(NAME_ONDOING_LOCAL)) || false;
      if (ondoingTask) return taskHandler.start(ondoingTask);

      handleDataOnLoad();
    },
  };
})();

app.run();

function filterTaskInSameDay(list) {
  return list.filter((task) => isInSameDay(task));
}

function isInSameDay(task = Date.now()) {
  const createdDay = new Date(task.createdAt || task).getDay();
  const today = new Date().getDay();
  return createdDay === today ?? false;
}
