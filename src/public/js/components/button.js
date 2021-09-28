import { template } from "../template/index.js";

export const Button = (() => {
    let isEnabled = false;
    return {
        init(type) {
            if (!isEnabled) {
               let htmls;
                isEnabled = true;

               switch(type) {
                case 'start': 
                    htmls = template.button.start();
                    break;
                case 'complete': 
                    htmls = template.button.complete();
               }

                document.querySelector('body').insertAdjacentHTML('beforeend',htmls);
            }
        },
        checkEnabled() {
            return (isEnabled) ? isEnabled : false;
        }
    }
})();
