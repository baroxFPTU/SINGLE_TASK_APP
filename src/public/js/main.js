import { template } from './template/index.js';
import { Dropdown } from './components/dropdown.js';
import { taskService } from './services/taskService.js';
import { localStorageService } from './services/localStorageService.js';
import { Button } from './components/button.js';
import * as constants from './constants/index.js';

const { 
  input,
  addButton,
  NAME_ARRAY_LOCAL,
  NAME_ONDOING_LOCAL 
} = constants;

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

    document.addEventListener('click', function (e) {
      e.stopPropagation();
      const optionButton = e.target.closest('.js-btn-option');
      const dropdown = e.target.closest('.js-dropdown');

      if (optionButton) {
        const parent = optionButton.parentElement;

        document.querySelector('.js-dropdown')?.remove();
        document.querySelector('.js-btn-option.active')?.classList.remove('active');

        if (parent.querySelector('.js-dropdown')) {
          Dropdown.removeAll();

          optionButton.classList.remove('active');
          optionButton.parentElement.classList.remove('expanded');
          return
        };

        Dropdown.create({
          parent: parent,
        });
        parent.classList.add('expanded');
        optionButton.classList.add('active');
      }

      if (dropdown || optionButton) {
        return;
      } 

        const activeButton = document.querySelector('.js-btn-option.active');

        Dropdown.removeAll();
        activeButton?.classList.remove('active');
        activeButton?.parentElement.classList.remove('expanded');
    })
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
      handleEvents();

        let ondoingTask = JSON.parse(localStorage.getItem(NAME_ONDOING_LOCAL)) || false;

        if (ondoingTask) return taskService.startDoing(ondoingTask);

        handleDataOnLoad();
    }
  }
}());


app.run();