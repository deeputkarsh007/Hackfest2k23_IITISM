const User = require("../models/User");
const bcrypt = require("bcrypt");
/* REGISTER USER */

exports.register = async (req, res) => {
  try {
    const { name, email, password, upiId, phone } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      name,
      email,
      password: hashedpassword,
      upiId,
      phone,
      posts: [],
      picturePath: "",
    });
    await newuser.save();
    return res.status(200).json({ message: "Registration sucessful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*LOGIN FUNCTION*/

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Email address is not connected to an account" });
    } else {
      if (!(await bcrypt.compare(password, foundUser.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        return res
          .status(200)
          .json({ message: "login successful", user: foundUser });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**/
