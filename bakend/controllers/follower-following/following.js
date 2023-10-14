const Follow = require("../../model/FollwerSchema");
const VerifyToken = require("../../middleware/Authmiddleware");
const Model_user = require("../../model/model");
// how to send follwing request to another person
//if i alredy follow that person then message "you alredy follow this person"
//if my request status is pending then show me
//if another person accept my follow request then he is in my following list and my following status is accept
//Cannot set headers after they are sent to the client -----error

// ===========Main Code==========

// const Following = async (req, res) => {
//   try {
//     // a follow b

//     //b
//     const followId = req.params.id;
//     console.log("followId:====>" + followId);
//     //a
//     const MyId = req.user._id;
//     console.log("MyId=====>" + MyId);

//     // =========this is opposite user who we will send request=======================
//     const existingFollow = await Follow.find({
//       user: MyId,
//       following: followId,
//     });

//     console.log("existingFollowing:====>", existingFollow);
//     // Here if existingFollow is Null [{}] then return true
//     //if is [{somevale}] then also return true
//     // console.log("Bollean",Boolean(existingFollow)); //true
//     //every time if [{}] or [{value}] ...it will go in if(existingFollow){} condition
//     // prevention of this we accesse of condition as if data inside existingFollow ==0 then access else condition
//     //other wise if data then if condition
//     //so we convert into length so if null [{}] then access below

//     if (existingFollow.length > 0) {
//       return res
//         .status(400)
//         .json({ message: "You Are already Following this user" });
//     } else {
//       const Newfollower = new Follow({
//         user: MyId,
//         following: followId,
//         status: "Following",
//       });
//       await Newfollower.save();
//       console.log("newFollowing:=====>" + Newfollower);

//       res.status(200).json({
//         message: "you are Following this user",
//       });

//     }
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: error.message,
//     });
//   }

const Following = async (req, res) => {
  try {
    console.log("sendfollowing req");
    const LoginUserId = req.user._id;
    const AnotherUserId = req.params.id;
    console.log("loginuser id" + LoginUserId);
    console.log("another User id" + AnotherUserId);

    const SerachFollower = await Follow.findOne({
      user: LoginUserId,
      following: AnotherUserId,
    });
    console.log("SerchFollower====>" + SerachFollower);
    if (SerachFollower) {
      return res
        .status(400)
        .json({
          message: "your request is pending or you alredy follow this user ",
        });
    }
    // if (SerachFollower) {
    //   if (SerachFollower.status === "pending") {
    //     res.status(400).json({
    //       message: `Your Follow Request Is Pending For ${AnotherUserId}`,
    //     });
    //   }
    // }
    // if (SerachFollower.status === "accepted");
    // {
    //    res.status(400).json({
    //     message: `You already follow ${AnotherUserId}`,
    //   });
    // }

    newSendFollowReq = new Follow({
      user: LoginUserId,
      following: AnotherUserId,
      status: "pending",
    });
    console.log("userSendFollowRequest" + newSendFollowReq);

    await newSendFollowReq.save();

    newReciveFollowReq = new Follow({
      user: AnotherUserId,
      follower: LoginUserId,
      status: "pending",
    });
    console.log("UserReciveFollowRequest" + newReciveFollowReq);

    await newReciveFollowReq.save();

    return res
      .status(200)
      .json({ message: `you send Follow Request to ${AnotherUserId}` });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = Following;

// =========if another user accept my follow request=======

// const Follow = require("../../model/FollowerSchema");

// const AcceptFollowRequest = async (req, res) => {
//   try {
//     const loggedInUserId = req.user._id;
//     const followerUserId = req.params.id;

//     // Check if there is a pending follow request from the follower.
//     const pendingRequest = await Follow.findOne({
//       user: loggedInUserId,
//       follower: followerUserId,
//       status: "pending",
//     });

//     if (!pendingRequest) {
//       return res.status(400).json({ message: "No pending follow request found from this user." });
//     }

//     // Update the status to "accepted".
//     pendingRequest.status = "accepted";
//     await pendingRequest.save();

//     // Now, you can add the logged-in user to the follower's following list.
//     const follower = await User.findById(followerUserId); // Assuming you have a User model.
//     if (!follower) {
//       return res.status(400).json({ message: "Follower not found." });
//     }

//     follower.following.push(loggedInUserId);
//     await follower.save();

//     return res.status(200).json({ message: `Accepted follow request from ${followerUserId}` });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = AcceptFollowRequest;
