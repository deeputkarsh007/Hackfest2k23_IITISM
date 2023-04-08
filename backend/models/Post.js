const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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
  requestedBy: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
