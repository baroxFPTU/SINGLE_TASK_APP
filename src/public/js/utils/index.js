export const utils = (() => {
    const setSelectionID = (task) => {
        const taskID = task._id;
        const taskSelectionID = Date.parse(task.createdAt);

        const _task = document.querySelector(`.js-task[data-selection-id="${taskSelectionID}"]`);
        _task.setAttribute('data-selection-id', taskID);
    }

    const hasClass = (elm, className) => {
        if (!elm) return console.error('Can not check undefined element');

        return elm.classList.contains(className) ? true : false;
    }

    return {
        setSelectionID,
        hasClass,
    }

})();

