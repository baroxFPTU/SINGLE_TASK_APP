import { template } from '../template/index.js';
import { Button } from '../components/button.js';
import { utils } from '../utils/index.js';
import { localStorageService } from './localStorageService.js';
import { taskContainer, blankTaskClassName, TASK_LIMIT, NAME_ARRAY_LOCAL} from '../constants/index.js';

export const taskService = (function (){
    let countTask = 0;

    /**
     * Module fetch task data to server.
     * @param {*} task 
     * @returns JSON 
     */
    const fetchTask = async function fetchTaskToServer (task) {
        const data = {
            name: task.name,
            createdAt: task.createdAt,
        }
        
        try {
            const _task = await fetch(`http://localhost:2703/api/task/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            
            return _task.json()
        } catch (error) {
            console.log(error);
        }

    }
    const removeBlankTask = ()=> {
        const blankTaskElm = document.querySelector(blankTaskClassName);
        if (blankTaskElm) blankTaskElm.remove(); 
    }

    const renderTask = (task) => {
        const htmls = template.task.one(task);

        removeBlankTask();
        taskContainer.insertAdjacentHTML('beforeend', htmls);

        if (utils.hasClass(taskContainer, 'is-blank')) {
            taskContainer.classList.remove('is-blank');
            taskContainer.classList.add('has-task');
            taskContainer.parentElement.classList.add('has-task');
        };
    }

    const handleNewTask = async function(input) {
        countTask++;
        const taskStorage = localStorageService.get(NAME_ARRAY_LOCAL) || 0;

        if (countTask > TASK_LIMIT || taskStorage.length > TASK_LIMIT - 1) { return console.log('Enough! stop.') }

        const task = {
            id: Date.now(),
            name: input.value.trim(),
            createdAt: Date.now(),
        }

        input.value = ''; 
        if (task.name == '') return;
    
        localStorageService.save('tasks', task);
        renderTask(task);
        
        const startButton = Button;
        startButton.init('start');
        
        try {
            const response = await fetchTask(task);
            if (await response) {
                utils.setSelectionID(response);
                console.log('response id' + response._id);
                const oldID = task.id;
                localStorageService.updateById({
                    nameItem: NAME_ARRAY_LOCAL,
                    id: oldID,
                    newData: response,
                });
            }
        } catch (error) {
            console.log(error)
        }

    }

    return {
        fetch: fetchTask,
        create: handleNewTask,
        render: renderTask,
    }
}());