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

  const handleDataOnLoad = async function () {
    const _tasksFromLocal =  localStorageService.get(NAME_ARRAY_LOCAL);
    const _tasksFromServer = await taskService.getTaskToday();
    if (_tasksFromLocal || await _tasksFromServer) {
      const _tasks = _tasksFromLocal || _tasksFromServer.tasks;

      localStorage.setItem(NAME_ARRAY_LOCAL, JSON.stringify(_tasks))

      _tasks.forEach((task) => {
        taskService.render(task);
      });

      const startButton = Button;
      startButton.init('start');
    }
  }

  return {
    async run() {
        let ondoingTask = JSON.parse(localStorage.getItem('ondoing')) || false;

        if (ondoingTask) {
          taskService.startDoing(ondoingTask);
          return;
        }

        handleDataOnLoad();

        handleEvents();
    }
  }
}());


app.run();