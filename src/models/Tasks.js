import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El titulo es requerido'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'La descripcion es requerida'],
        trim: true,
    },
    status: {
        type: Boolean,
        required: [true, 'El estado es requerido'],
        trim: true,
    },
    userId: {
        type: String,
        require: [true, 'El Id de usuario es requerido'],
        trim: true,
    },
}, {
    timestamps: true,
});


export default mongoose.models.Task || mongoose.model("Task", taskSchema);

