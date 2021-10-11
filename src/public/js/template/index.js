const template = {
    task: {
        empty () {
            return `<div class="tasks__blank col js-blank-task">
                        <img src="/images/illustration_empty.svg" alt="Nothing here" />
                            <p class="tasks__imply">
                                Chào buổi sáng. Hãy bắt đầu ngày mới với 5 nhiệm vụ quan trọng nhất.
                            </p>
                        <a href="#" class="tasks__link">Tại sao chỉ với 5?</a>
                </div>`
        },
        one (task) {
            const taskId = task.id;
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
            const taskId = task.id;

            return `
                    <div class="timer">
                        <span class="hours js-hours-output">00</span>
                        <span class="minutes js-minutes-output">00</span>
                        <span class="seconds js-seconds-output">00</span>
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
    },
    dropdown () {
        return `
        <ul>
          <li>
          <li></li>
            <a href="#"><i class="ri-pencil-fill"></i> Chỉnh sửa</a>
          </li>
          <li>
            <a href="#"><i class="ri-delete-bin-5-line"></i> Xóa</a>
          </li>
        </ul>
        `
    }
};


export {
    template
}