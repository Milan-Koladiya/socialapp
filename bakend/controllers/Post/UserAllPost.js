const Post = require("../../model/PostSchema");

const UserAllPost = async (req, res) => {
  try {
    console.log("autore id:" + req.params.id);
    const UserPosts = await Post.find({ author: req.params.id });
    if (!UserPosts) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }
    res.status(200).json({
      success: "All posts are here",
    //   allpost : UserAllPost,
    });
    console.log("UserAllPosts:=====>" + UserPosts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = UserAllPost;
