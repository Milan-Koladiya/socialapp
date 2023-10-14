const Follow = require("../../model/FollwerSchema");

const AcceptFollowReq = async (req, res) => {
  try {
    const LoginUserId = req.user._id;
    const ReqSenderId = req.params.id;

    const FindFollowReq = await Follow.findOne({
      user: LoginUserId,
      follower: ReqSenderId,
      status: "pending"
    });
    const FindFollowerReq = await Follow.findOne({
      user: ReqSenderId,
      following: LoginUserId,
      status: "pending"
    });
    console.log("Before findFollowReq===>" + FindFollowReq);
    if (!FindFollowReq) {
      res.status(401).json({ message: "Follow request Not Found" });
    }

    FindFollowReq.status = "accepted";
    await FindFollowReq.save();
    console.log("after Accept Req====>" + FindFollowReq);

    FindFollowerReq.status = "accepted";
    await FindFollowerReq.save();
    console.log("After Accept Req ------>" + FindFollowerReq);
    // const FollowingId = Follow.findByIdAndUpdate(ReqSenderId, {
    //   $push: { following: LoginUserId },
    // });
    // await FollowingId.save();
    // console.log("FollowingID If LogUserAccept Req====>" + FollowingId);

    res
      .status(200)
      .json({ message: `you accept ${ReqSenderId}'s followe Request`,status:FindFollowReq });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = AcceptFollowReq;
