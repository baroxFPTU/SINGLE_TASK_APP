import Task from './TaskModel.js';

export const taskController = (() => {
    const create = async (req, res, next) => {
        const taskName = req.body.name;
        const taskCreatedAt = req.body.createdAt;
        let task = new Task({
            name: taskName,
            createdAt: taskCreatedAt
        });

        try {
            task = await task.save();
            res.json(task);
        } catch (error) {
            console.error(error);
            res.json({
                status: 400,
                message: 'Cannot create task.'
            })
        }

    }

    return {
        create
    }
})();