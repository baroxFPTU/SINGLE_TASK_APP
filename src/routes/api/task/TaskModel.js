import mongoose from 'mongoose';

const TaskScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});


export default mongoose.model('task', TaskScheme);