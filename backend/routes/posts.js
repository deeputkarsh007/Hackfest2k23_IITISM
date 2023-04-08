const express = require("express");
const {
  uploadToDb,
  getAllPosts,
  userPosts,
  getRequesters,
  handleAccept,
  handleDecline,
  handledel,
  handlerent,
  handlebuy,
  getreqby,
  updateuserinfo,
} = require("../controllers/posts.js");

const postRouter = express.Router();

postRouter.post("/uploadtoDB", uploadToDb);
postRouter.get("/getAllPosts", getAllPosts);

postRouter.post("/userPosts", userPosts);

postRouter.post("/getrequester", getRequesters);

postRouter.post("/handleaccept", handleAccept);

postRouter.post("/handledecline", handleDecline);
postRouter.post("/handledel", handledel);
postRouter.post("/handlerent", handlerent);
postRouter.post("/handlebuy", handlebuy);
postRouter.post("/getreqby", getreqby);
postRouter.post("/updateuserinfo", updateuserinfo);

module.exports = postRouter;
