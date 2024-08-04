import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  files: [
    {
      filename: { type: String, required: true },
      fileUrl: { type: String, required: true },
    }
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});



export const Class = mongoose.model("Class", ClassSchema)
