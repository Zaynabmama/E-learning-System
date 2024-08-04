import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

export const Withdrawal = mongoose.model("Withdrawal", WithdrawalSchema);