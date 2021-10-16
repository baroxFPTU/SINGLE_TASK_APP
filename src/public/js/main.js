import * as taskHander from "./handlers/taskHandler.js";
import * as taskService from "./services/taskService.js";
import * as localStorageHandler from "./handlers/localStorageHandler.js";
import * as constants from "./constants/index.js";
import { Dropdown } from "./components/dropdown.js";
import { Button } from "./components/button.js";

const { input, addButton, NAME_ARRAY_LOCAL, NAME_ONDOING_LOCAL } = constants;

const app = (function () {
  const handleEvents = function () {
    if (input) {
      addButton.addEventListener("click", function () {
        taskHander.create(input);
      });

      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          taskHander.create(input);
        }
      });
    }

    document.addEventListener("click", function (e) {
      e.stopPropagation();
      const optionButton = e.target.closest(".js-btn-option");
      const dropdown = e.target.closest(".js-dropdown");
      const editButton = e.target.closest(".js-edit-btn");
      const deleteButton = e.target.closest(".js-delete-btn");

      if (editButton) {
        console.log("editing..");

        const taskTarget = editButton.closest(".js-task");
        const taskId = taskTarget?.getAttribute("data-selection-id");
        const taskData = window.taskList.find((task) => task.id === taskId);
        const input = document.createElement("input");
        const button = document.createElement("button");
        button.setAttribute("class", "js-submit-btn");
        button.textContent = "Lưu";
        input.setAttribute("type", "text");
        input.value = taskData.name;
        taskTarget.classList.add("editing");
        taskTarget.appendChild(input);
        taskTarget.appendChild(button);

        button.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          handlerEditTask(taskId, taskTarget, input.value, input, button);
        });
      }

      if (deleteButton) {
        console.log("delete...");
      }

      if (optionButton) {
        const parent = optionButton.parentElement;

        document.querySelector(".js-dropdown")?.remove();
        document
          .querySelector(".js-btn-option.active")
          ?.classList.remove("active");

        if (parent.querySelector(".js-dropdown")) {
          Dropdown.removeAll();

          optionButton.classList.remove("active");
          optionButton.parentElement.classList.remove("expanded");
          return;
        }

        Dropdown.create({
          parent: parent,
        });
        parent.classList.add("expanded");
        optionButton.classList.add("active");
      }

      if (dropdown || optionButton) {
        return;
      } else {
        const activeButton = document.querySelector(".js-btn-option.active");

        Dropdown.removeAll();
        activeButton?.classList.remove("active");
        activeButton?.parentElement.classList.remove("expanded");
      }
    });
  };

  const handlerEditTask = async function (id, target, newName, input, button) {
    const taskNameElm = target.querySelector(".task__name");
    taskNameElm.textContent = newName;
    try {
      const response = await taskService.updateName({
        id,
        newName,
      });

      if ((await response.status) == 200) {
        localStorageHandler.updateByIdAndCallback(
          NAME_ARRAY_LOCAL,
          id,
          (item) => {
            item.name = newName;
            return item;
          }
        );

        target.classList.remove("editing");
        input?.remove();
        button?.remove();
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

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
      handleEvents();

      let ondoingTask =
        JSON.parse(localStorage.getItem(NAME_ONDOING_LOCAL)) || false;

      if (ondoingTask) return taskHander.start(ondoingTask);

      handleDataOnLoad();
    },
  };
})();

app.run();
