const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  picturePath: {
    type: String,
    default: "",
  },
  upiId: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  posts: {
    type: [
      {
        id: ObjectId,
      },
    ],
    default: [],
  },
  sentRequests: [
    {
      id: ObjectId,
    },
  ],
  incomingRequests: [
    {
      id: ObjectId,
    },
  ],
  declined: [String],
  approved: [String],
});

module.exports = mongoose.model("User", UserSchema);
