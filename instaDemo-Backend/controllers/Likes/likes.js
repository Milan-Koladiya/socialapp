const Like = require("../../model/LikeSchema");
//id:of like
//user:loginUser
//post:which is liked by user
const PostLike = async (req, res) => {
  console.log("first")
  try {
    // const { userId, PostId } = req.body;
    const userId = req.user._id;
    console.log("userId", userId);

    const postId = req.params.id;
    // console.log("postId", postId);

    const FindLike = await Like.find({
      user: userId,
       }).populate('user post')  
    

       
    // .populate(user);
    console.log("FindLike====>", FindLike);
    if (FindLike.length > 0) {
      return res.status(200).json({
        message: "You already Like this Post",
        likes:FindLike,
      });
    }
    const newlike = new Like({
      user: userId,
      post: postId,
    });

    await newlike.save();

    res.status(200).json({
      success: true,
      message: "You Like this Post",
      likes:newlike
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
