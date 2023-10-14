const Like = require("../../model/LikeSchema");
//id:of like
//user:loginUser
//post:which is liked by user
const PostLike = async (req, res) => {
  try {
    // const { userId, PostId } = req.body;
    const userId = req.user._id;
    console.log("userId", userId);

    const postId = req.params.id;
    // console.log("postId", postId);

    const FindLike = await Like.find({
      user: userId,
      post: postId,
    });
    console.log("FindLike====>", FindLike);
    if (FindLike.length > 0) {
      return res.status(400).json({
        message: "You already Like this Post",
      });
    }
    const newlike = new Like({
      user: userId,
      post: postId,
    });
    await newlike.save();
    console.log("Like=====>" + newlike);
    res.status(200).json({
      success: true,
      message: "You Like this Post",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = PostLike;

//   app.get('/api/posts', async (req, res) => {
//     try {
//       const posts = await Post.find().populate('likes');
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//     // const likeCount = post.likes.length;
