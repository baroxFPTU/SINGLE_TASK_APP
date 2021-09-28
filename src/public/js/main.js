import { template } from './template/index.js';
import { Button } from './components/button.js';
import { taskService } from './services/taskService.js';

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


function newTask(input) {
    // Get data from input
    const task = {
        name: input.value.trim(),
        createdAt: Date.now(),
    }

    if (task.name == '') return;

    taskService.create(task);

    input.value = ''; //Reset the input
    const htmls = template.task.one(task.name, task.createdAt); //Render HTML string with data above
    
    // Check and remove blank task which is used to illustrate for nothing added.
    const blankTaskElm = document.querySelector('.js-blank-task');
    if (blankTaskElm) blankTaskElm.remove(); 

    taskContainer.insertAdjacentHTML('beforeend', htmls);
    taskContainer.classList.remove('is-blank');
    taskContainer.classList.add('has-task');
    taskContainer.parentElement.classList.add('has-task');
    
    // enable start button
    const startButton = Button;
    startButton.init('start');
}

