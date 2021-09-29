import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
        });

        if (connect) console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
}