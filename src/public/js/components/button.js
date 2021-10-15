import { template } from "../template/index.js";

export const Button = (function () {
  let isEnabled = false;

  return {
    init(type = "start") {
      if (!isEnabled) {
        isEnabled = true;
        this.removeAll();
        const containerFixed = document.createElement("div");
        const button = template.button(type);
        containerFixed.className = "btn-fixed";

        containerFixed.appendChild(button);
        document.body.appendChild(containerFixed);
      }
    },
    removeAll() {
      isEnabled = false;
      document.querySelector(`.${"js-start-button"}`)?.parentElement.remove();
      document
        .querySelector(`.${"js-complete-button"}`)
        ?.parentElement.remove();
    },
    checkEnabled() {
      return isEnabled ? isEnabled : false;
    },
  };
})();
