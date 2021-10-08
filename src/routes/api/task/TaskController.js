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
            const _tasks = await getTaskByDate(today);
    
            res.status(200).json(_tasks);
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    const getByDate = async (req, res, next) => {
        try {
            const { date } = req.body;
            const _tasks = await getTaskByDate(moment(date).startOf('day'));

            if (!_tasks) throw new Error('Task not found.');

            res.status(200).json(_tasks);
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    const completed = async (req, res, next) => {
        try {
            const {id, timeData} = req.body;
            let task = await Task.findById(id);
            task.startedAt = timeData.start;
            task.completedAt = timeData.complete;
            task.isCompleted = true;
            
            task = await task.save();
            console.log(task);
    
            res.json(task);
        } catch (error) {
            console.log(error);
        }
    }
 
    return {
        create,
        getTaskToday,
        getByDate,
        completed
    }
})();