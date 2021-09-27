const template = {
    task: {
        one: (name, timestamp) => {
            return `<div class="task">
                        <div class="task__header">
                        <h3 class="task__name">${name}</h3>
                        <div class="task__options">
                            <button class="btn btn-round">
                            <i class="ri-more-line"></i>
                            </button>
                            <div class="dropdown">
                            <ul>
                                <li></li>
                                <a href="#"><i class="ri-pencil-fill"></i> Chỉnh sửa</a>
                                </li>
                                <li>
                                <a href="#"><i class="ri-delete-bin-5-line"></i> Xóa</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        <div class="task__footer">
                        <div class="task__timestamp-create">${timestamp}</div>
                        </div>
                    </div>`
        }
    }
};


export {
    template
}