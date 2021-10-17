import * as constants from "../constants/index.js";
const { input, addButton, NAME_ARRAY_LOCAL, NAME_ONDOING_LOCAL } = constants;

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

const createEditFrom = function (taskData, taskTarget) {
  console.log(taskData);
  const fragment = document.createDocumentFragment;
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

  taskTarget.appendChild(fragment);
  input.focus();

  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    handlerEditTask(taskData.id, taskTarget, input.value, input, saveButton);
  });
};

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

    createEditFrom(taskData, taskTarget);
  }

  if (deleteButton) {
    console.log("delete...");
  }

  if (optionButton) {
    const parent = optionButton.parentElement;

    document.querySelector(".js-dropdown")?.remove();
    document.querySelector(".js-btn-option.active")?.classList.remove("active");

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
