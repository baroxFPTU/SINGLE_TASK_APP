import moment from 'moment';
import Task from './TaskModel.js';
import { getTaskByDate } from './taskService.js';

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

    const getTaskToday = async (req, res, next) => {
        try {
            const today = moment().startOf('day');

            const _task = await getTaskByDate(today);
    
            res.status(200).json({
                tasks: _task
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    const getByDate = async (req, res, next) => {
        try {
            const { date } = req.body;
            const _task = await getTaskByDate(moment(date).startOf('day'));

            if (!_task) throw new Error('Task not found.');

            res.status(200).json({
                tasks: _task
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }

    }
 
    return {
        create,
        getTaskToday,
        getByDate
    }
})();