import * as taskHandler from "./handlers/taskHandler.js";
import * as constants from "./constants/index.js";
import * as events from "./handlers/eventsHandler.js";
import { Button } from "./components/button.js";

const { NAME_ARRAY_LOCAL, NAME_ONDOING_LOCAL } = constants;

const app = (function () {
  const handleDataOnLoad = async function () {
    const taskList = await taskHandler.getTaskList();
    let ondoingTask =
      JSON.parse(localStorage.getItem(NAME_ONDOING_LOCAL)) || false;

    if (ondoingTask) return taskHandler.start(ondoingTask);

    if (taskList) {
      localStorage.setItem(NAME_ARRAY_LOCAL, JSON.stringify(taskList));

      taskList.forEach((task) => {
        taskHandler.render(task);
      });

      !taskHandler.isCompletedAll(taskList)
        ? Button.init("start")
        : Button.removeAll();
    } else {
      console.error("Cannot get data");
    }
  };

  return {
    async run() {
      handleDataOnLoad();
      events.listen();
    },
  };
})();

app.run();
