const Follow = require("../../model/FollwerSchema");

const GetAllFollowing = async (req, res) => {
  try {
    const MyId = req.user._id;
    console.log("myId==>" + MyId);

    // const findUser = await Model_user.findOne({ _id:Anoth });

    const FindFollowing = await Follow.find({
      user: MyId,
    //   following
    //   status: "Following",
    }).populate('following');
console.log(FindFollowing);
    if (FindFollowing.length > 0) {
      res.status(200).json({
        success: "All Following are Here",Following:FindFollowing || [],
      });
      console.log("All Following===>", FindFollowing);
      // res.json("All Following "+FindFollowing);
    } else {
      res.status(400).json({
        message: "You have not any Following",Following:[],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = GetAllFollowing;
