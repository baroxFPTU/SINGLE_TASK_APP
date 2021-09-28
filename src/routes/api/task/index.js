import express from 'express';
const router = express.Router();

router.get('/', function(req, res) {
    res.send('Task route');
})

router.post('/new', function(req, res) {
    const taskName = req.body.name;
    const taskCreatedAt = req.body.createdAt;

    console.log(taskName);
})


export default router;