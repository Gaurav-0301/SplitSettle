const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified:{
      type:Boolean,
      default:false,
    },
    profilePic: {
      type: String,
      default: "",
    },

     uid: {
      type: String,
      default:"",
      unique: true,
      index: true
    },
    
    
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", authSchema);

module.exports = User;