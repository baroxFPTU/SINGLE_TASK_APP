export const utils = (() => {
    const setSelectionID = (task) => {
        const taskID = task._id;
        const taskSelectionID = Date.parse(task.createdAt);

        const _task = document.querySelector(`.js-task[data-selection-id="_${taskSelectionID}"]`);
        _task.setAttribute('data-selection-id', taskID);
    }

    const saveToLocalStorage = (name,data) => {
        const exitData = getLocalStorage(name);

        if (exitData instanceof Array) {
            exitData.push(data);
            localStorage.setItem(name, JSON.stringify(exitData));
            return;
        }

        localStorage.setItem(name, JSON.stringify([data]));
    }

    const getLocalStorage = (name) => {
        const data = localStorage.getItem(name);
        return data ? JSON.parse(data) : null;
    }

    const clearLocalStorage = (name) => {
        localStorage.removeItem(name);
    }

    const hasClass = (elm, className) => {
        if (!elm) return console.error('Can not check undefined element');

        return elm.classList.contains(className) ? true : false;
    }

    return {
        setSelectionID,
        saveToLocalStorage,
        hasClass,
        clearLocalStorage 
    }

})();

