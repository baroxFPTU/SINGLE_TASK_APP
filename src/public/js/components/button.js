import { template } from "../template/index.js";
import { taskService } from "../services/taskService.js";

export const Button = (function () {
    let isEnabled = false;
    
    const handleEvents = function (type) {
        let button; 
        let handler;
        switch(type) {
            case 'start': 
                button = document.querySelector(`.${template.button.startClass}`);
                handler = taskService.startDoing;
                break;
            case 'complete': 
                button = document.querySelector(`.${template.button.completeClass}`);
                handler = taskService.complete;

                break;
            default:
                button = document.querySelector(`.${template.button.startClass}`);
        }

        button.addEventListener("click",() => {
            handler();
        });
    }

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
                    break;
                default:
                    htmls = template.button.start();
               }

                document.querySelector('body').insertAdjacentHTML('beforeend',htmls);

                handleEvents(type);
            }
        },
        reset() {
            isEnabled = false;
            document.querySelector(`.${template.button.startClass}`).parentElement.remove();
            document.querySelector(`.${template.button.completeClass}`)?.parentElement.remove();
        },
        checkEnabled() {
            return (isEnabled) ? isEnabled : false;
        }
    }
}());
