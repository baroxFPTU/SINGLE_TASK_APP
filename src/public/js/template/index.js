const template = {
    task: {
        one(task) {
            const taskId = task.id || task._id;
            return `<div class="task js-task" data-selection-id="${taskId}">
                        <div class="task__header">
                        <h3 class="task__name">${task.name}</h3>
                        <div class="task__options">
                            <button class="btn btn-round">
                            <i class="ri-more-line"></i>
                            </button>
                        </div>
                        </div>
                        <div class="task__footer">
                        <div class="task__timestamp-create">${task.createdAt}</div>
                        </div>
                    </div>`
        },
        started(task) {
            const taskId = task.id || task._id;

            return `
                    <div class="timer">
                        <span class="hours">00</span>
                        <span class="minutes">00</span>
                        <span class="seconds">00</span>
                    </div>
                    <div class="task" data-status="started" data-selection-id="${taskId}">
                        <div class="task__header">
                        <h3 class="task__name">${task.name}</h3>
                         <div class="task__options">
                            <button class="btn btn-round">
                                <i class="ri-more-line"></i>
                            </button>
                        <div class="dropdown">
                        
                        </div>
                        </div>
                    </div>
                    <div class="task__footer">
                        <div class="task__timestamp-create">${task.createdAt}</div>
                        </div>
                        <img src="/images/illustration_ondoing.svg" alt="" class="task__img">`
        }
    },
    button: {
        startClass: 'js-start-button',
        completeClass: 'js-complete-button',
        start() {
            return ` <div class="btn-fixed">
                         <button class="btn btn-primary ${this.startClass}">Bắt đầu</button>
                     </div> `
        },
        complete() {
            return ` <div class="btn-fixed">
                         <button class="btn btn-primary ${this.completeClass}">Hoàn thành</button>
                     </div> `
        }
    }
};


export {
    template
}