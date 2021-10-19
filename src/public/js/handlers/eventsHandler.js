import * as constants from "../constants/index.js";
import * as taskHandler from "./taskHandler.js";
import * as taskService from "../services/taskService.js";
import * as localStorageHandler from "./localStorageHandler.js";
import * as dropdownHandler from "./dropdownHandler.js";
import { Dropdown } from "../components/dropdown.js";

const { input, NAME_ARRAY_LOCAL } = constants;

export const listen = function (taskList) {
  document.addEventListener("click", async function (e) {
    const editButton = e.target.closest(".js-edit-btn");
    const deleteButton = e.target.closest(".js-delete-btn");
    const _input = e.target.closest(".js-input");
    const _addButton = e.target.closest(".js-add-button");
    const taskTarget = e.target?.closest(".js-task");
    const taskId = taskTarget?.getAttribute("data-selection-id");
    e.stopPropagation();

    if (_input || _addButton) {
      _addButton?.addEventListener("click", function () {
        taskHandler.create(input);
      });

      _input?.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          taskHandler.create(input);
        }
      });
    }

    if (editButton) {
      const taskList =
        localStorageHandler.get(NAME_ARRAY_LOCAL) ??
        (await taskHandler.getTaskToday());
      const taskData = taskList.find((task) => task.id === taskId);

      const { input, button: saveButton } = createEditFrom(
        taskData,
        taskTarget
      );
      input.focus();
      saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handlerEditTask(
          taskData.id,
          taskTarget,
          input.value,
          input,
          saveButton
        );
        Dropdown.removeAll();
      });
    }

    if (deleteButton) {
      const taskList =
        localStorageHandler.get(NAME_ARRAY_LOCAL) ??
        (await taskHandler.getTaskToday());
      const newTaskList = taskList.filter((task) => task.id !== taskId);
      const isComfirm = confirm("Chắc chưa? Xóa nhé?");

      if (!isComfirm) return;

      localStorageHandler.set(NAME_ARRAY_LOCAL, newTaskList);
      if (taskHandler.isCompletedAll(newTaskList)) {
        taskHandler.renderEmptyTask();
        taskHandler.resetViewTask();
      }
      taskTarget.remove();

      const response = await taskService.deleteOne(taskId);
      if (response.status === 200) {
      }
    }
    dropdownHandler.handle(e.target);
  });
};

const createEditFrom = function (taskData, taskTarget) {
  const fragment = new DocumentFragment();
  const input = document.createElement("input");
  const saveButton = document.createElement("button");

  saveButton.setAttribute(
    "class",
    "btn btn__actions btn__actions--save js-submit-btn"
  );
  saveButton.textContent = "Lưu";
  input.setAttribute("type", "text");
  input.setAttribute("class", "edit-input js-edit-input");
  input.value = taskData.name;

  fragment.appendChild(input);
  fragment.appendChild(saveButton);

  taskTarget?.classList.add("editing");
  taskTarget.appendChild(fragment);

  return {
    input,
    button: saveButton,
  };
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
