const Follow = require("../../model/FollwerSchema");

const acceptFollowReq = async (req, res) => {
  console.log("get Follow req======notifaction");
  try {
    const loginUserId = req.user._id;
    const followingId = req.params.id;

    const existingFollowing = await Follow.find({
      user: followingId,
      followID: loginUserId,
      status:"pending",
    });
    console.log("existingFollower=====>", existingFollowing);

    if(!existingFollowing){
        res.status(401).json({ message: "Follow request Not Found" });

    }

    
    // if (existingFollowing) {
    //   if (existingFollowing.status === "accepted") {
    //     res.status(400).json({
    //       message: `${loginUserId} is already in your follow list`,
    //     });
    //   } else if (existingFollowing.status === "pending") {
    //     res.status(200).json({
    //       message: `${loginUserId}'s request is pending. `,
    //     });
    //   }
    // }
    // if(!existingFollowing){
    //     const newFollowReq= new Follow({
    //         user:followingId,
    //         followID:loginUserId,
    //     })
    //     await newFollowReq.save();
    // }
   return res.status(200).json({
    message:`recived follow request from ${loginUserId}`
   })
  } catch (error) {
    return res.status(500).json({ error: error.message });

  }
};

module.exports = acceptFollowReq;
