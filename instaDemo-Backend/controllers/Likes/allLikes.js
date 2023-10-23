const Like = require("../../model/LikeSchema");

const AllLikes = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("UserId======>", userId);

    const postId = req.params.id;
    console.log("psotId=====>", postId);

    const FindLike = await Like.find({
      user: userId,
    }).populate("user post");

    
    console.log("FindLike======>", FindLike.length);
    if(FindLike.length > 0){
        return res.status(200).json({
            message:"this Post All Likes here",
            likes:FindLike,
            likeCount:FindLike.length,
        })
    }
 
  } catch (error) {}
};

module.exports = AllLikes;
