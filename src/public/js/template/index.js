const template = {
    task: {
        one(name, timestamp) {
            return `<div class="task">
                        <div class="task__header">
                        <h3 class="task__name">${name}</h3>
                        <div class="task__options">
                            <button class="btn btn-round">
                            <i class="ri-more-line"></i>
                            </button>
                        </div>
                        </div>
                        <div class="task__footer">
                        <div class="task__timestamp-create">${timestamp}</div>
                        </div>
                    </div>`
        }
    },
    button: {
        startClass: 'js-start-button',
        start() {
            return ` <div class="btn-fixed">
                         <button class="btn btn-primary ${this.startClass}">Bắt đầu</button>
                     </div> `
        }
    }
};


export {
    template
}