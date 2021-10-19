import { template } from "../template/index.js";

export const Dropdown = (function () {
  let _container, _btn;
  const events = {
    edit() {
      console.log("edit");
    },
    delete() {
      console.log("delete");
    },
  };

  return {
    create(container, btn) {
      const htmls = template.dropdown();
      const dropdownDOM = document
        .createRange()
        .createContextualFragment(htmls);

      _container = container;
      _btn = btn;
      container.appendChild(dropdownDOM);
      this.switchContainerState(container, btn);
    },

    removeAll() {
      const listItem = document.querySelectorAll(".js-dropdown");
      listItem.forEach((item) => {
        item?.remove();
      });
    },

    switchContainerState(container = _container, btn = _btn) {
      const isExpanded = !container.classList.contains("expanded");
      btn?.classList.toggle("active", isExpanded);
      container?.classList.toggle("expanded", isExpanded);
    },

    resetContainerState(container = _container, btn = _btn) {
      btn?.classList.remove("active");
      container?.classList.remove("expanded");
    },

    isShowing() {
      const dropdown = document.querySelector(".js-dropdown");
      return dropdown ? true : false;
    },

    isMe(target) {
      return target.classList.contains("js-dropdown") ? true : false;
    },
  };
})();
