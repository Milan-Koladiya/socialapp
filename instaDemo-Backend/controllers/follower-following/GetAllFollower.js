const Follow = require("../../model/FollwerSchema");

const   GetAllFollower = async (req, res) => {
  console.log("AllFollower=====>");

  try {
    const MyId = req.user._id;
    console.log("myid===>" + MyId);

    const AllFollower = await Follow.find({
      user: MyId,

      // status: "follower",
    }).populate('follower')
    console.log("AllFollower=====>",AllFollower);
    if (AllFollower.length > 0) {
      res
        .status(200)
        .json({
          success: "All followers are Here",
          followers: AllFollower || [],
        });
    }else{
      res.status(200).json({
        message:"You have not any Followers",followers:[]
      });
    }
    console.log("all follower====>", AllFollower);

    // if (AllFollower.length > 0) {
    //   res.status(200).json({
    //     success: "All followers are Here",
    //   });
    //   console.log("All follower ======>", AllFollower);
    //   res.json("All Follower ===>", AllFollower);
    // } else {
    //   res.status(400).json({
    //     message: "You have not any follower",
    //   });
    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = GetAllFollower;
