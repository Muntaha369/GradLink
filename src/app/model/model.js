import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

// ✅ Hot-reload safe:
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;