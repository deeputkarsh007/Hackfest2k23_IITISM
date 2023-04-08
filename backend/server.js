// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const User = require("./models/User");
// const dotenv = require("dotenv");
// const Post = require("./models/Post");
// dotenv.config();
// const DATABASE_URL = process.env.DB_URL;
// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// const PORT = process.env.PORT || 8000;
// mongoose
//   .connect(DATABASE_URL, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("database connected successfully"))
//   .catch((err) => console.log("error connecting to mongodb" + err));
// app.listen(PORT, () => {
//   console.log(`server is listening on port ${PORT}...`);
// });
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const foundUser = await User.findOne({ email });
//     if (!foundUser) {
//       return res
//         .status(400)
//         .json({ message: "Email address is not connected to an account" });
//     } else {
//       if (foundUser.password !== password) {
//         return res.status(400).json({ message: "Invalid credentials" });
//       } else {
//         return res
//           .status(200)
//           .json({ message: "login successful", user: foundUser });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, upiId, phone } = req.body;
//     const newuser = new User({
//       name,
//       email,
//       password,
//       upiId,
//       phone,
//       posts: [],
//       picturePath: "",
//     });
//     await newuser.save();
//     return res.status(200).json({ message: "Registration sucessful" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// app.post("/uploadtoDB", async (req, res) => {
//   try {
//     const {
//       amount,
//       description,
//       endingDate,
//       endingTime,
//       img_url,
//       postedBy,
//       startingDate,
//       startingTime,
//       title,
//       type,
//     } = req.body;
//     const newpost = new Post({
//       amount,
//       description,
//       endingDate,
//       endingTime,
//       img_url,
//       postedBy,
//       startingDate,
//       startingTime,
//       title,
//       type,
//       requestedBy: "",
//     });
//     const user = await User.findById(postedBy);
//     const resp = await newpost.save();
//     const posts = user?.posts;
//     const new_posts = [...posts, { id: resp._id }];
//     await User.findByIdAndUpdate(postedBy, { posts: new_posts });
//     return res.status(200).json({ message: "Post Saved" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// app.get("/getAllPosts", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.status(200).json({ posts: posts });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// app.post("/userPosts", async (req, res) => {
//   const { id } = req.body;
//   // console.log("hi");
//   // console.log(req.body);
//   // console.log({ nyid: id });
//   const userposts = await Post.find({ postedBy: id });
//   return res.status(200).json({ posts: userposts });
// });
// app.post("/getrequester", async (req, res) => {
//   try {
//     const { id } = req.body;
//     let user = "";
//     if ((await Post.findById(id)).requestedBy !== "") {
//       user = await User.findById((await Post.findById(id)).requestedBy);
//     }
//     res.status(200).json({ user: user });
//   } catch (error) {
//     console.log(error.message);
//   }
// });
// app.post("/handleaccept", async (req, res) => {
//   try {
//     const { postid } = req.body;
//     console.log(postid);
//     await Post.findByIdAndUpdate(postid, { type: "Approved" });
//     const reqby = (await Post.findById(postid)).requestedBy;
//     console.log(reqby);
//     const accarray = (await User.findById(reqby)).approved;
//     await User.findByIdAndUpdate(reqby, {
//       approved: [...accarray, postid],
//     });
//     res.status(200).json({ message: "Successfully Approved" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// app.post("/handledecline", async (req, res) => {
//   try {
//     const { postid } = req.body;
//     const fpost = await Post.findById(postid);
//     const reqby = (await Post.findById(postid)).requestedBy;
//     await Post.findByIdAndUpdate(postid, {
//       type: `${fpost.startingDate ? "Rent" : "Sell"}`,
//       requestedBy: "",
//     });
//     const declinedarray = (await User.findById(reqby)).declined;
//     await User.findByIdAndUpdate(reqby, {
//       declined: [...declinedarray, postid],
//     });
//     return res.status(200).json({ message: "Successfully Declined" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// app.post("/handledel", async (req, res) => {
//   try {
//     const { postid } = req.body;
//     const resp = await Post.findByIdAndDelete(postid);
//     return res.status(200).json({ message: "Deleted successfully" });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// });
// app.post("/handlerent", async (req, res) => {
//   try {
//     const { postid, requestedBy } = req.body;
//     await Post.findByIdAndUpdate(postid, {
//       requestedBy: requestedBy,
//       type: "Requested",
//     });
//     return res.status(200).json({ message: "Request sent" });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// });
// app.post("/handlebuy", async (req, res) => {
//   try {
//     const { postid, requestedBy } = req.body;
//     await Post.findByIdAndUpdate(postid, {
//       requestedBy: requestedBy,
//       type: "Requested",
//     });
//     return res.status(200).json({ message: "Request sent" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// app.post("/getreqby", async (req, res) => {
//   const { id } = req.body;
//   // console.log(typeof id);
//   const resp = await Post.find({ requestedBy: id });
//   res.status(200).json({ resp: resp });
// });

const express = require("express");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const User = require("./models/User");
const dotenv = require("dotenv");
// const Post = require("./models/Post");
dotenv.config();
const DATABASE_URL = process.env.DB_URL;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

/* MONGOOSE CONNECT */
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});

/* ROUTES */
app.use("", authRouter);
app.use("", postRouter);

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const foundUser = await User.findOne({ email });
//     if (!foundUser) {
//       return res
//         .status(400)
//         .json({ message: "Email address is not connected to an account" });
//     } else {
//       if (foundUser.password !== password) {
//         return res.status(400).json({ message: "Invalid credentials" });
//       } else {
//         return res
//           .status(200)
//           .json({ message: "login successful", user: foundUser });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, upiId, phone } = req.body;
//     const newuser = new User({
//       name,
//       email,
//       password,
//       upiId,
//       phone,
//       posts: [],
//       picturePath: "",
//     });
//     await newuser.save();
//     return res.status(200).json({ message: "Registration sucessful" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// app.post("/uploadtoDB", async (req, res) => {
//   try {
//     const {
//       amount,
//       description,
//       endingDate,
//       endingTime,
//       img_url,
//       postedBy,
//       startingDate,
//       startingTime,
//       title,
//       type,
//     } = req.body;
//     const newpost = new Post({
//       amount,
//       description,
//       endingDate,
//       endingTime,
//       img_url,
//       postedBy,
//       startingDate,
//       startingTime,
//       title,
//       type,
//       requestedBy: "",
//     });
//     const user = await User.findById(postedBy);
//     const resp = await newpost.save();
//     const posts = user?.posts;
//     const new_posts = [...posts, { id: resp._id }];
//     await User.findByIdAndUpdate(postedBy, { posts: new_posts });
//     return res.status(200).json({ message: "Post Saved" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// app.get("/getAllPosts", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.status(200).json({ posts: posts });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });
// app.post("/userPosts", async (req, res) => {
//   const { id } = req.body;
//   const userposts = await Post.find({ postedBy: id });
//   return res.status(200).json({ posts: userposts });
// });
// app.post("/getrequester", async (req, res) => {
//   try {
//     const { id } = req.body;
//     console.log(id);
//     let user = "";
//     if ((await Post.findById(id).requestedBy) !== "")
//       user = await User.findById((await Post.findById(id)).requestedBy === "");
//     // console.log({ id, user });
//     // if (id == "6430da310038e89fbc520e24") {
//     //   console.log({ user });
//     // }
//     res.status(200).json({ user: user });
//   } catch (error) {
//     console.log(error.message);
//   }
// });
// app.post("/handleaccept", async (req, res) => {
//   try {
//     const { postid } = req.body;
//     console.log(postid);

//     await Post.findByIdAndUpdate(postid, { type: "Approved" });
//     res.status(200).json({ message: "Successfully Approved" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// app.post("/handledecline", async (req, res) => {
//   try {
//     const { postid } = req.body;
//     await Post.findByIdAndUpdate(postid, { type: "Declined" });
//     res.status(200).json({ message: "Successfully Declined" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
