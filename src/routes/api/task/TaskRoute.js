import express from 'express';
import { taskController } from './TaskController.js';

const router = express.Router();

router.post('/new', taskController.create);

router.get('/today', taskController.getTaskToday);
router.get('/by-date', taskController.getByDate);


export default router;