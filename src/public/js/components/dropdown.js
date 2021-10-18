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
      _container = container;
      _btn = btn;
      const htmls = template.dropdown();
      const dropdownDOM = document
        .createRange()
        .createContextualFragment(htmls);
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
      console.log(isExpanded);
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

// document.addEventListener('click', function (e) {
//     e.stopPropagation();
//     const optionButton = e.target.closest('.js-btn-option');
//     const dropdown = e.target.closest('.js-dropdown');

//     if (optionButton) {
//       const parent = optionButton.parentElement;
//       const dropdownHTML = template.dropdown();

//       document.querySelector('.js-dropdown')?.remove();
//       document.querySelector('.js-btn-option.active')?.classList.remove('active');

//       if (parent.querySelector('.js-dropdown')) {
//         document.querySelector('.js-dropdown').remove();
//         optionButton.classList.remove('active');
//         optionButton.parentElement.classList.remove('expanded');
//         return
//       };

//       parent.insertAdjacentHTML('beforeend', dropdownHTML);
//       parent.classList.add('expanded');
//       optionButton.classList.add('active');
//     }

//     if (dropdown || optionButton) {
//       return;
//     }

//       const activeButton = document.querySelector('.js-btn-option.active');

//       document.querySelector('.js-dropdown')?.remove();
//       activeButton?.classList.remove('active');
//       activeButton?.parentElement.classList.remove('expanded');
//   })
