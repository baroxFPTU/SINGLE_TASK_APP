import express from 'express';
const router = express.Router();

const initRoute = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    return app.use('/', router);
}

export {
    initRoute,
}