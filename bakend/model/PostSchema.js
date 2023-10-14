const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  // likes:[{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"like"
  // }]
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
