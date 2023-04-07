const mongoose = require("mongoose");

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
        amount: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        endingDate: {
          type: Date,
          // required: true,
        },
        endingTime: {
          type: String,
          // required: true,
        },
        img_url: {
          type: String,
          required: true,
        },
        postedBy: {
          type: String,
          required: true,
        },
        startingDate: {
          type: Date,
          // required: true,
        },
        startingTime: {
          type: String,
          // required: true,
        },
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
