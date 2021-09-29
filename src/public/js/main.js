import { template } from './template/index.js';
import { Button } from './components/button.js';
import { taskService } from './services/taskService.js';
import { utils } from './utils/index.js';

const input = document.querySelector('.js-input');
const addButton = document.querySelector('.js-add-button');
const taskContainer = document.querySelector('.js-task-container');

if (input) {
    addButton.addEventListener('click', function () {
        newTask(input);
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            newTask(input);
        }
    });
}


async function newTask(input) {
    const task = {
        name: input.value.trim(),
        createdAt: Date.now(),
    }

    utils.saveToLocalStorage('tasks', task);

    if (task.name == '') return;

    input.value = ''; 
    const htmls = template.task.one(task.name, task.createdAt); 
    
    const blankTaskElm = document.querySelector('.js-blank-task');
    if (blankTaskElm) blankTaskElm.remove(); 

    taskContainer.insertAdjacentHTML('beforeend', htmls);
    taskContainer.classList.remove('is-blank');
    taskContainer.classList.add('has-task');
    taskContainer.parentElement.classList.add('has-task');
    
    const startButton = Button;
    startButton.init('start');

    const _task = await taskService.create(task);
    if (await _task) {
        utils.setSelectionID(_task);
    }
}


