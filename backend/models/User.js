const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
// UserSchema.pre("save", async function (next) {
//   if (!this.ismodified) {
//     next();
//   }

//   const salt = 10;
//   this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
