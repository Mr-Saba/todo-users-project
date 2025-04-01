import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an username"],
    unique: [true, "username should be unique"],
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  completedTasks: { type: Number, default: 0 },
});

export default mongoose.model("Users", UsersSchema);
