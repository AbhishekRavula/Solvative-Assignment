import { Schema, model } from "mongoose";

const balanceAndHistory = {
  balance: {
    type: Number,
    required: true,
  },
  history: [
    {
      amount: {
        type: Number,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      timeStamp: {
        type: Date,
        required: true,
      },
    },
  ],
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  P5: balanceAndHistory,
  reward: balanceAndHistory,
});

export default model("user", userSchema);
