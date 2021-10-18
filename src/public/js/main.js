import * as taskHander from "./handlers/taskHandler.js";
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
      localStorage.setItem(NAME_ARRAY_LOCAL, JSON.stringify(_tasks));

      window.taskList = _tasks;
      _tasks.forEach((task) => {
        taskHander.render(task);
      });

      !taskHander.isCompletedAll(_tasks)
        ? Button.init("start")
        : Button.removeAll();
    }
  };

  return {
    async run() {
      events.listen();

      let ondoingTask =
        JSON.parse(localStorage.getItem(NAME_ONDOING_LOCAL)) || false;
      if (ondoingTask) return taskHander.start(ondoingTask);

      handleDataOnLoad();
    },
  };
})();

app.run();
