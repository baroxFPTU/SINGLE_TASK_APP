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

TaskScheme.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });
  
export default mongoose.model('task', TaskScheme);