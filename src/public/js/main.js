import { taskService } from './services/taskService.js';
import { localStorageService } from './services/localStorageService.js';
import { Button } from './components/button.js';

import { input, addButton, NAME_ARRAY_LOCAL} from './constants/index.js';

const app =(function (){
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
        const _tasks =  localStorageService.get(NAME_ARRAY_LOCAL);
        if (_tasks) {
          _tasks.forEach((task) => {
            taskService.render(task);
          });

          const startButton = Button;
          startButton.init('start');
        }

        handleEvents();
    }
  }
}());


app.run();