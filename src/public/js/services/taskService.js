import { template } from '../template/index.js';
import { Button } from '../components/button.js';
import { utils } from '../utils/index.js';
import { localStorageService } from './localStorageService.js';
import { taskContainer, blankTaskClassName, TASK_LIMIT, NAME_ARRAY_LOCAL, API_URL} from '../constants/index.js';

export const taskService = (function (){
    let countTask = 0;

    /**
     * Fetch task data to server.
     * @param {*} task 
     * @returns JSON 
     */
    const fetchTask = async function fetchTaskToServer (task) {
        const data = {
            name: task.name,
            createdAt: task.createdAt,
        }
        
        try {
            const response = await fetch(`${API_URL}/task/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            return response;
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
        const startButton = Button;
        const taskStorage = localStorageService.get(NAME_ARRAY_LOCAL) || 0;
        const task = {
            id: Date.now(),
            name: input.value.trim(),
            createdAt: Date.now(),
        }

        countTask++;
        if (countTask > TASK_LIMIT || taskStorage.length > TASK_LIMIT - 1) { return console.log('Enough! stop.') }

        input.value = ''; 
        if (task.name == '') return;
    
        localStorageService.save('tasks', task);
        renderTask(task);
        
        startButton.init('start');

        try {
            let response = await fetchTask(task);
            const oldID = task.id;
            
            if (await response.ok) {
                const data = await response.json();

                utils.setSelectionID(data);
                localStorageService.updateById({
                    nameItem: NAME_ARRAY_LOCAL,
                    id: oldID,
                    newData: data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTaskToday = async function () {
        try {
            const response = await fetch(`${API_URL}/task/today`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status !== 200) { throw new Error}

            return response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    return {
        fetch: fetchTask,
        create: handleNewTask,
        render: renderTask,
        getTaskToday
    }
}());