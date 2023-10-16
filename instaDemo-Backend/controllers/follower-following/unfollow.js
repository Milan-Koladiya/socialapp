const Follow = require("../../model/FollwerSchema");

const UnFollow = async (req, res) => {
  try {
    const UnFolloweruserId = req.params.id;
    const LoginUserId = req.user._id;

    console.log("LoginUserId:" + LoginUserId);
    console.log("userId:" + UnFolloweruserId);

    const FindUser = await Follow.find({
      user: LoginUserId,
      following: UnFolloweruserId,
      status: "accepted",
    });
    console.log("FindUserAnd Delete===>", FindUser);

    const FollowerInAnother = await Follow.find({
      user: UnFolloweruserId,
      follower: LoginUserId,
      status: "accepted",
    });
    // ================
    if (FindUser.length > 0 && FollowerInAnother.length > 0) {
      const unfollowUser = await Follow.deleteOne({
        user: LoginUserId,
        following: UnFolloweruserId,
        status: "accepted",
      });
      //  await unfollowUser.save();
      console.log("UnfollowUser:====>" + unfollowUser);
      // }

      // if (FollowerInAnother.length > 0) {
      const unfollowFromAnother = await Follow.deleteOne({
        user: UnFolloweruserId,
        follower: LoginUserId,
        status: "accepted",
      });
      console.log("unfollowFromAnother" + unfollowFromAnother);
      // }

      res.status(200).json({
        message: "You unfollowing this user",
      });
    } else {
      res.status(400).json({
        message: "Sorry this User is Not in your Following List",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = UnFollow;

// try {
//     const { userIdToUnfollow } = req.params;
//     const followerId = req.user._id;

//     // Delete the follow relationship
//     const result = await Follow.findOneAndDelete({
//       user: userIdToUnfollow,
//       follower: followerId,
//     });

//     if (!result) {
//       return res.status(400).json({ error: "You are not following this user" });
//     }

//     res.json({ message: "You have unfollowed this user" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
