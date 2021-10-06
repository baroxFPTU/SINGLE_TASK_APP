import moment from 'moment';
import Task from './TaskModel.js';

export async function getTaskByDate (date) {
    try {
        const _task = await Task.find({
            createdAt: {
                $gte: date.toDate(),
                $lte: moment(date).endOf('day').toDate()
              }
        });

        if (!_task) {throw Error}
        
        return _task;
    } catch (error) {
        return null;
    }
}