import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validator: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide strong password"],
    select: false,
  },
  images: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  authProviderId: {
    type: String,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
