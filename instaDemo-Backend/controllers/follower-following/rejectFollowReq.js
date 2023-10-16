const Follow = require("../../model/FollwerSchema");

const RejectFollowReq = async (req, res) => {
  try {
    const LoginUserId = req.user._id;
    const ReqSenderId = req.params.id;

    const FindFollowReq = await Follow.findOne({
      user: LoginUserId,
      follower: ReqSenderId,
      status: "pending",
    });
    if (!FindFollowReq) {
      return res.status(401).json({
        message: "Follow Req is Not Found",
      });
    }

    // FindFollowReq.status = "rejected";
    // await FindFollowReq.save();

    // =====delete rejectApi====
    const RemoveFollowReq = await Follow.deleteOne({
      user: LoginUserId,
      follower: ReqSenderId,
      status: "pending",
    });
    // await RemoveFollowReq.save();
    console.log("rejectFollow Req====>" + FindFollowReq);

    const RemoveFollowingReq = await Follow.deleteOne({
      user: ReqSenderId,
      following: LoginUserId,
      status: "pending",
    });
    // await RemoveFollowingReq.save();
    console.log("rejectFollow Req====>" + RemoveFollowingReq);

    return res
      .status(200)
      .json({ message: `you Reject ${ReqSenderId}'s follow request` });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = RejectFollowReq;
