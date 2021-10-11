import { taskService } from './services/taskService.js';
import { localStorageService } from './services/localStorageService.js';
import { Button } from './components/button.js';

import { input, addButton, NAME_ARRAY_LOCAL, NAME_ONDOING_LOCAL } from './constants/index.js';

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
    const startButton = Button;
    const _tasksFromLocal =  localStorageService.get(NAME_ARRAY_LOCAL);
    const _tasksFromServer = await taskService.getTaskToday();
    const _tasks = _tasksFromLocal || _tasksFromServer;

    if (_tasksFromLocal || await _tasksFromServer) {
      localStorage.setItem(NAME_ARRAY_LOCAL, JSON.stringify(_tasks))

      _tasks.forEach((task) => {
        taskService.render(task);
      });

      (!taskService.isCompletedAll(_tasks)) ? startButton.init('start') : startButton.reset();
    }
  }

  return {
    async run() {
        let ondoingTask = JSON.parse(localStorage.getItem(NAME_ONDOING_LOCAL)) || false;

        if (ondoingTask) return taskService.startDoing(ondoingTask);

        handleDataOnLoad();
        handleEvents();
    }
  }
}());


app.run();