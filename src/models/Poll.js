import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 },
    },
  ],
});

const Poll = mongoose.models.Poll || mongoose.model("Poll", PollSchema);

export default Poll;
