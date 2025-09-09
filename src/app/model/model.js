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
  phone:{
    type: String,
    required:true
  },
  GY:{
    type: String,
    required:true
  },
  Uname:{
    type: String,
    required: true,
    unique:true
  },
  JobDesc:{
    type:String,
    require:true
  },
  admin:{
    type:Boolean
  }
});

// ✅ Hot-reload safe:
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;