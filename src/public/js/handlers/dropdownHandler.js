import { Dropdown } from "../components/dropdown.js";

export const handle = function (eventTarget) {
  const optionButton = eventTarget?.closest(".js-btn-option");
  const dropdown = eventTarget?.closest(".js-dropdown");

  if (optionButton) {
    const optionsContainer = optionButton.closest(".task__options");
    if (!Dropdown.isShowing()) {
      return Dropdown.create(optionsContainer, optionButton);
    }
    return resetOptionsState();
  }

  if (dropdown || optionButton) {
    return;
  } else {
    Dropdown.removeAll();
    Dropdown.resetContainerState();
  }
};

const resetOptionsState = function () {
  Dropdown.removeAll();
  Dropdown.switchContainerState();
};
