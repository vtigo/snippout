import mongoose from "mongoose";

// TODO: define actual user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters']
  },
  deleted_at: Date
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// UserSchema.pre('save', function (next) {
//   this.updated_at; = Date.now();
//   next();
// });

const User = mongoose.model("User", UserSchema);

export {
  User,
  UserSchema
}