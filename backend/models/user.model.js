import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
});


export const User = mongoose.model("User", UserSchema);

