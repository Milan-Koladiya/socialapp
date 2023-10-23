const Follow = require("../../model/FollowerSchema2");

const GetAllFollower2 = async (req, res) => {
  try {
    const LoginUserId = req.user._id;
    // const Following

    // const MyId = req.user._id;
    // console.log("myId==>" + MyId);

    const FindFollower = await Follow.find({
      //   user: LoginUserId,
      followID: LoginUserId,
      status: "accepted",
    }).populate("user");

    console.log(FindFollower);
    if (FindFollower.length > 0) {
      res.status(200).json({
        success: "All Follower are Here",
        Follower: FindFollower || [],
      });
      console.log("All Follower===>", FindFollower);
      // res.json("All Following "+FindFollowing);
    } else {
      res.status(400).json({
        message: "You have not any Following",
        Follower: [],
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = GetAllFollower2;