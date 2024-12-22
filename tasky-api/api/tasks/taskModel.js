import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dateValidator = (date) => {
    return date instanceof Date && !isNaN(date) && date > new Date();
};

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    deadline: { type: Date, validate: dateValidator, required: [true, 'Deadline is required'] },
    done: Boolean,
    priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Task', TaskSchema);
