import mongoose from "mongoose";

// TODO: define actual user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  best_friend: mongoose.SchemaTypes.ObjectId,
  created_at: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updated_at: {
    type: Date,
    default: () => Date.now()
  },
  deleted_at: Date
});

const User = mongoose.model("User", userSchema);

export {
  User,
  userSchema
}