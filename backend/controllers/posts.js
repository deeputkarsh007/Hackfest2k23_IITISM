const Post = require("../models/Post");
const User = require("../models/User");
exports.uploadToDb = async (req, res) => {
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
    const posts = user?.posts;
    const new_posts = [...posts, { id: resp._id }];
    await User.findByIdAndUpdate(postedBy, { posts: new_posts });
    return res.status(200).json({ message: "Post Saved" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts: posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.userPosts = async (req, res) => {
  const { id } = req.body;
  // console.log("hi");
  // console.log(req.body);
  // console.log({ nyid: id });
  const userposts = await Post.find({ postedBy: id });
  return res.status(200).json({ posts: userposts });
};
exports.getRequesters = async (req, res) => {
  try {
    const { id } = req.body;
    let user = "";
    if ((await Post.findById(id)).requestedBy !== "") {
      user = await User.findById((await Post.findById(id)).requestedBy);
    }
    res.status(200).json({ user: user });
  } catch (error) {
    // console.log(error.message);
  }
};
exports.handleAccept = async (req, res) => {
  try {
    const { postid } = req.body;
    // console.log(postid);
    await Post.findByIdAndUpdate(postid, { type: "Approved" });
    const reqby = (await Post.findById(postid)).requestedBy;
    // console.log(reqby);
    const accarray = (await User.findById(reqby)).approved;
    await User.findByIdAndUpdate(reqby, {
      approved: [...accarray, postid],
    });
    res.status(200).json({ message: "Successfully Approved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.handleDecline = async (req, res) => {
  try {
    const { postid } = req.body;
    const fpost = await Post.findById(postid);
    const reqby = (await Post.findById(postid)).requestedBy;
    await Post.findByIdAndUpdate(postid, {
      type: `${fpost.startingDate ? "Rent" : "Sell"}`,
      requestedBy: "",
    });
    const declinedarray = (await User.findById(reqby)).declined;
    await User.findByIdAndUpdate(reqby, {
      declined: [...declinedarray, postid],
    });
    return res.status(200).json({ message: "Successfully Declined" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.handledel = async (req, res) => {
  try {
    const { postid } = req.body;
    const resp = await Post.findByIdAndDelete(postid);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.handlerent = async (req, res) => {
  try {
    const { postid, requestedBy } = req.body;
    await Post.findByIdAndUpdate(postid, {
      requestedBy: requestedBy,
      type: "Requested",
    });
    return res.status(200).json({ message: "Request sent" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.handlebuy = async (req, res) => {
  try {
    const { postid, requestedBy } = req.body;
    await Post.findByIdAndUpdate(postid, {
      requestedBy: requestedBy,
      type: "Requested",
    });
    return res.status(200).json({ message: "Request sent" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getreqby = async (req, res) => {
  const { id } = req.body;
  // console.log(typeof id);
  const resp = await Post.find({ requestedBy: id });
  res.status(200).json({ resp: resp });
};
exports.updateuserinfo = async (req, res) => {
  try {
    // console.log("ho");
    const { email, name, phone, upiId, id } = req.body;
    await User.findByIdAndUpdate(id, {
      email,
      name,
      phone,
      upiId,
    });
    // console.log(upduser);
    const upduser = await User.findById(id);
    return res
      .status(200)
      .json({ message: "Successfully updated", user: upduser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
