const Follow = require("../../model/FollowerSchema2");


const GetAllFollowing2 = async (req, res) => {
  try {
    const LoginUserId = req.user._id;
    // const Following

    // const MyId = req.user._id;
    // console.log("myId==>" + MyId);

    const FindFollowing = await Follow.find({
      user: LoginUserId,
      //   following
      status: "accepted",
    }).populate("followID");

    

    console.log(FindFollowing);
    if (FindFollowing.length > 0) {
      res.status(200).json({
        success: "All Following are Here",
        Following: FindFollowing || [],
      });
      console.log("All Following===>", FindFollowing);
      // res.json("All Following "+FindFollowing);
    } else {
      res.status(400).json({
        message: "You have not any Following",
        Following: [],
      });
    }

    

  } catch (error) {
       
    return res.status(500).json({ error: error.message });
          
          
  }
};
module.exports = GetAllFollowing2;
