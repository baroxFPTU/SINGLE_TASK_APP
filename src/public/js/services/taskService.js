import { template } from '../template/index.js';
import { Button } from '../components/button.js';
import { utils } from '../utils/index.js';
import { localStorageService } from './localStorageService.js';
import { timeService } from './timeService.js';
import * as constants from '../constants/index.js';

const {
    input,
    appContainer,
    taskContainer,
    blankTaskClassName,
    TASK_LIMIT, NAME_ARRAY_LOCAL,
    API_URL,
    NAME_ONDOING_LOCAL,
    COMPLETED_KEY_OBJECT
} = constants;

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
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }

        try {
            const response = await fetch(`${API_URL}/task/new`, options);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const removeBlankTask = ()=> {
        const blankTaskElm = document.querySelector(blankTaskClassName);
        if (blankTaskElm) return blankTaskElm.remove(); 
    }

    const renderTask = (task) => {
        if (task[COMPLETED_KEY_OBJECT]) return;
        
        removeBlankTask();
        
        const htmls = template.task.one(task);
        taskContainer.insertAdjacentHTML('beforeend', htmls);

        if (utils.hasClass(taskContainer, 'is-blank')) {
            taskContainer.classList.remove('is-blank');
            taskContainer.classList.add('has-task');
            taskContainer.parentElement.classList.add('has-task');
        };
    }

    const renderEmptyTask = () => {
        const htmls = template.task.empty();

        taskContainer.innerHTML = htmls;
        taskContainer.classList.add('is-blank');
        taskContainer.classList.remove('has-task');
        appContainer.classList?.remove('has-task');
    }

    const handleNewTask = async function(input) {
        const startButton = Button;
        const listTask = localStorageService.get(NAME_ARRAY_LOCAL) || 0;
        const isLimitTask = (countTask > TASK_LIMIT) || (listTask.length > TASK_LIMIT - 1);
        const task = {
            id: Date.now(),
            name: input.value.trim(),
            createdAt: Date.now(),
        }

        countTask++;
        if (isLimitTask) { 
            console.log('Enough! stop.');
            console.log(countTask);
            input.value = '';
            return  alert('You have reached the limit task of today.');
        }

        if (task.name == '') return;
        
        input.value = ''; 
        
        startButton.init('start');
        localStorageService.push(NAME_ARRAY_LOCAL, task);
        renderTask(task);
        exchangeID(task);
    }

    const exchangeID = async function (task) {
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
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        try {
            const response = await fetch(`${API_URL}/task/today`, options);

            if (response.status !== 200) { throw new Error}
            return response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const startDoing = async function (id = 0) {
        const _tasks = localStorageService.get(NAME_ARRAY_LOCAL) ?? await getTaskToday();
        const _task = _tasks.find(task => task.id === id) ?? _tasks.find(task => !task[COMPLETED_KEY_OBJECT]);
        const button = Button;

        // Render default view when do not have any task.
        if (!_task) {
           button.removeAll();
           [input.parentElement, taskContainer].forEach(elm => {
                elm.removeAttribute('style');
           });

           renderEmptyTask();
           return;
        };

        const htmls = template.task.started(_task);

        localStorage.setItem(NAME_ONDOING_LOCAL, JSON.stringify(_task.id));
        input.parentElement.style.display = 'none';
        taskContainer.style.height = '100%';
        taskContainer.innerHTML = htmls;

        button.init('complete');

        timeService.start();
    }

    const complete = async function () {
        const taskID = document.querySelector('.task').getAttribute('data-selection-id');
        const timeData = timeService.getTimeData();

        const isCompleted = window.confirm('Are you sure you want to complete this task? \nYou will immediately come to the next task.');
        if (!isCompleted) return;

        timeService.stop();
        updateCompleted(taskID);
        fetchComplete(taskID, timeData);
        startDoing();
    }

    const updateCompleted = async (taskID) => {
        const listTask = localStorageService.get(NAME_ARRAY_LOCAL) || await getTaskToday();

        listTask.forEach(task => {
            if (task.id === taskID) return task[COMPLETED_KEY_OBJECT] = true;
        });
        localStorageService.set(NAME_ARRAY_LOCAL, listTask);
    }

    const fetchComplete = async function (id, timeData) {
        const data = {
            id: id,
            timeData: timeData,
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }

        try {
            const response = await fetch(`${API_URL}/task/completed`, options);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    
    const isCompletedAll = (listTask) => {
        const filterdList = listTask.filter(task => !task[COMPLETED_KEY_OBJECT]);
        return (filterdList.length == 0) ? true : false;
    }

    return {
        fetch: fetchTask,
        create: handleNewTask,
        render: renderTask,
        getTaskToday,
        startDoing,
        complete,
        isCompletedAll
    }
}());