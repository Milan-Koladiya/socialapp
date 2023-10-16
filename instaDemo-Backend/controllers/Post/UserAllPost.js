const Post = require("../../model/PostSchema");

const UserAllPost = async (req, res) => {
  try {
    console.log("autore id:" + req.user.id);
    const UserPosts = await Post.find({ author: req.user.id });
    if (!UserPosts) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }
    res.status(200).json({
      success: "All posts are here",
      allpost : UserPosts
    });
    console.log("UserAllPosts:=====>" + UserPosts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = UserAllPost;
