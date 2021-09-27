import { template } from './template/index.js';

const input = document.querySelector('.js-input');
const addButton = document.querySelector('.js-add-button');
const taskContainer = document.querySelector('.js-task-container');

if (input) {
    addButton.addEventListener('click', function () {
        createNewTask();
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            createNewTask();
        }
    });
}


function createNewTask() {
    const value = input.value;
    const createdAt = Date.now();
    input.value = '';
    const htmls = template.task.one(value, createdAt);
    taskContainer.innerHTML = '';
    taskContainer.insertAdjacentHTML('beforeend', htmls);
    taskContainer.classList.remove('is-blank');
    taskContainer.classList.add('has-task');

    console.log(htmls);
}