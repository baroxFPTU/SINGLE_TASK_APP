import express from 'express';
import taskRouter from './task/TaskRoute.js';
const router = express.Router();

const initAPIs = (app) => {
    router.use('/task', taskRouter);
    
    return app.use('/api', router);
}

export {
    initAPIs
}