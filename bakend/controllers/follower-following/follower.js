const Follow = require("../../model/FollwerSchema");

// const Follower = async (req, res) => {

//   try {
//     //   ========add following logic for login user=================
//     //if opposite user accept request then in our following list store therir ID

//     //b follow a
//a login user
//     const FollowingID = req.params.id; //b
//     console.log("b id" + FollowingID);
//     const LoginUserId = req.user._id; //a
//     console.log("a id" + LoginUserId);

//     //   const FindFollowing = await Follow.find({
//     //       user: FollowingID,
//     //     follower: LoginUserId,
//     //     // status: "following",
//     //   });
//     //   //below given null array
//     //   console.log("follower Detail:====>", FindFollowing);

//     const FindFollowing = await Follow.find({
//       user: LoginUserId,
//       follower: FollowingID,
//     });

//     if (FindFollowing.length > 0) {
//       res
//         .status(400)
//         .json({ message: `${FollowingID} is already in your Followe List` });
//     } else {
//       const NewFollowing = new Follow({
//         user: LoginUserId,
//         follower: FollowingID,
//         status: "follower",
//       });
//       await NewFollowing.save();
//       console.log("Follower Detail:====>", NewFollowing);
//       res
//         .status(200)
//         .json({ message: `${FollowingID} is in your Follower List` });
//     }

//   } catch (error) {
//     res.status(404).json({
//       error:error.message
//     })
//   }
// };

// module.exports = Follower;

// ============with Status Pending===========Some one send Follow request=============

// const Follower = async (req, res) => {
//   try {
//     const followingId = req.params.id; // b follow a

//     const loginUserId = req.user._id; // Logged-in user (a)

//     const existingFollow = await Follow.findOne({
//       user: loginUserId,
//       follower: followingId,
//     });
//     console.log("Existing Follower", existingFollow);
//     if (existingFollow) {
//       if (existingFollow.status === "accepted") {
//         return res
//           .status(400)
//           .json({ message: `${followingId} is already in your Follow List` });
//       }

//       if (existingFollow.status === "pending") {
//         return res
//           .status(200)
//           .json({ message: `${followingId}'s follow request is pending` });
//       }
//     }
//     // Add the follower to the login user's followers list
//     // await Follow.findByIdAndUpdate(loginUserId, {
//     //   $push: { follower: followingId },
//     // });

//     // // Add the login user to the follower's following list
//     // await Follow.findByIdAndUpdate(followingId, {
//     //   $push: { following: loginUserId },
//     // });
//     // ===========or==========
//     const newFollowRequest = new Follow({
//       user: loginUserId,
//       follower: followingId,
//       status: "pending",
//     });
//     console.log("NewFollowReq" + newFollowRequest);

//     await newFollowRequest.save();

//     return res
//       .status(200)
//       .json({ message: `Follow request sent to ${loginUserId}` });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = Follower;

// =======Get Follow Request========

const Follower = async (req, res) => {
  try {
    const followingId = req.params.id; // User B's ID (the user to be followed)
    const loginUserId = req.user._id; // User A's ID (the logged-in user)

    // Check if there is an existing follow record.
    const existingFollow = await Follow.find({
      user: loginUserId,
      follower: followingId,
    });
    console.log("existiong Follower===>" + existingFollow);
    if (existingFollow) {
      if (existingFollow.status === "accepted") {
        return res
          .status(400)
          .json({ message: `${followingId} is already in your Follow List` });
      } else if (existingFollow.status === "pending") {
        return res
          .status(200)
          .json({ message: `${followingId}'s follow request is pending` });
      }
    }

    if (!existingFollow) {
      const newFollowRequest = new Follow({
        user: loginUserId,
        follower: followingId,
        status: "pending",
      });

      await newFollowRequest.save();
    }
    return res
      .status(200)
      .json({ message: `Received follow Req from ${followingId}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = Follower;
