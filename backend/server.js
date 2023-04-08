const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
const dotenv = require("dotenv");
const Post = require("./models/Post");
dotenv.config();
const DATABASE_URL = process.env.DB_URL;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Email address is not connected to an account" });
    } else {
      if (foundUser.password !== password) {
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
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, upiId, phone } = req.body;
    const newuser = new User({
      name,
      email,
      password,
      upiId,
      phone,
      posts: [],
      picturePath: "",
    });
    await newuser.save();
    return res.status(200).json({ message: "Registration sucessful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/uploadtoDB", async (req, res) => {
  try {
    const {
      amount,
      description,
      endingDate,
      endingTime,
      img_url,
      postedBy,
      startingDate,
      startingTime,
      title,
      type,
    } = req.body;
    const newpost = new Post({
      amount,
      description,
      endingDate,
      endingTime,
      img_url,
      postedBy,
      startingDate,
      startingTime,
      title,
      type,
      requestedBy: "",
    });
    const user = await User.findById(postedBy);
    const resp = await newpost.save();
    console.log({ user, resp });
    const posts = user?.posts;
    // console.log(resp);

    const new_posts = [...posts, { id: resp._id }];
    await User.findByIdAndUpdate(postedBy, { posts: new_posts });
    return res.status(200).json({ message: "Post Saved" });
  } catch (error) {
    console.log("hi");

    return res.status(500).json({ message: error.message });
  }
});
app.get("/getAllPosts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts: posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.post("/userPosts", async (req, res) => {
  const { id } = req.body;
  const userposts = await Post.find({ postedBy: id });
  return res.status(200).json({ posts: userposts });
});
// app.get("/getrequester", async (req, res) => {
//   const { requestedBy } = req.body;
//   const resp = await Post.find({ requestedBy });
//   res.status(200).json({ poster: resp });
// });
app.post("/getrequester", async (req, res) => {
  const { id } = req.body;
  const reque = (await Post.findById(id)).requestedBy;
  console.log(reque);
  // const user = await User.findById(reque);
  // console.log(user);
  // res.status(200).json({ requester: user.name, phone: user.phone });
});
