import * as taskHandler from "../handlers/taskHandler.js";

const template = {
  task: {
    empty() {
      return `<div class="tasks__blank col js-blank-task">
                        <img src="/images/illustration_empty.svg" alt="Nothing here" />
                            <p class="tasks__imply">
                                Chào buổi sáng. Hãy bắt đầu ngày mới với 5 nhiệm vụ quan trọng nhất.
                            </p>
                        <a href="#" class="tasks__link">Tại sao chỉ với 5?</a>
                </div>`;
    },
    one(task) {
      const taskId = task.id;
      return `<div class="task js-task" data-selection-id="${taskId}">
                        <div class="task__header">
                        <h3 class="task__name">${task.name}</h3>
                        <div class="task__options">
                            <button class="btn btn-round js-btn-option">
                            <i class="ri-more-line"></i>
                            </button>
                        </div>
                        </div>
                        <div class="task__footer">
                        <div class="task__timestamp-create">${task.createdAt}</div>
                        </div>
                    </div>`;
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
                            <button class="btn btn-round js-btn-option">
                                <i class="ri-more-line"></i>
                            </button>
                            
                        </div>
                    </div>
                    <div class="task__footer">
                        <div class="task__timestamp-create">${task.createdAt}</div>
                        </div>
                        <img src="/images/illustration_ondoing.svg" alt="" class="task__img">`;
    },
  },
  button(type) {
    const buttons = {
      start: {
        className: "js-start-button",
        textContent: "Bắt đầu",
        listener: taskHandler.start,
      },
      complete: {
        className: "js-complete-button",
        textContent: "Hoàn thành",
        listener: taskHandler.complete,
      },
    };

    const _button = document.createElement("button");
    _button.setAttribute("class", `btn btn-primary ${buttons[type].className}`);
    _button.textContent = buttons[type].textContent;
    _button.addEventListener("click", buttons[type].listener);

    return _button;
  },
  dropdown() {
    return `
        <div class="dropdown js-dropdown">
        <ul>
        <li>
          <a href="#"><i class="ri-pencil-fill"></i> Chỉnh sửa</a>
        </li>
        <li>
          <a href="#"><i class="ri-delete-bin-5-line"></i> Xóa</a>
        </li>
      </ul> 
        </div>
        `;
  },
};

export { template };
