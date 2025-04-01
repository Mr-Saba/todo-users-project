import mongoose from "mongoose";

const TodosSchema = new mongoose.Schema({
    title: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    alreadyCounted: { type: Boolean, default: false } 
},
    {timestamps: true}
)

export default mongoose.model('Todos', TodosSchema);
