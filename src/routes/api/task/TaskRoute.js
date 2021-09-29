import express from 'express';
import { taskController } from './TaskController.js';

const router = express.Router();

router.post('/new', taskController.create);


export default router;