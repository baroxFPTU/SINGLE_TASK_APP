import Task from './TaskModel.js';

export const taskController = (() => {
    const create = (req, res, next) => {
        const taskName = req.body.name;
        const taskCreatedAt = req.body.createdAt;
        const task = new Task({
            name: taskName,
            createdAt: taskCreatedAt
        });


        res.json(task);
    }

    return {
        create
    }
})();