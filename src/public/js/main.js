import { taskService } from './services/taskService.js';
import { input, addButton} from './constants/index.js';

// const input = document.querySelector('.js-input');
// const addButton = document.querySelector('.js-add-button');
// const taskContainer = document.querySelector('.js-task-container');


const app =(() => {
  const handleEvents = function() {
    
    if (input) {
        addButton.addEventListener('click', function () {
            taskService.create(input);
        });
    
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                taskService.create(input);
            }
        });
    }
  }

  return {
    run() {
        handleEvents();
    }
  }
})();


app.run();