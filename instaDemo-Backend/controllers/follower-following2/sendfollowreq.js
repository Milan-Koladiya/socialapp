const Follow = require('../../model/FollowerSchema2');

const sendFollowing = async(req,res)=>{

    console.log("sendFollowing")
    try {
        
        const LoginUserId = req.user._id;
        console.log("LoginUSerId=====>",LoginUserId);
        const AnotherUserId = req.params.id;
        console.log("AnotherUserId======>",AnotherUserId);
       
        const searchFollower = await Follow.findOne({
            user:LoginUserId,
            followID:AnotherUserId
        }).populate('user');
        console.log("Search Follower=======>",searchFollower);
        if(searchFollower){
            return res.status(400).json({
                message:"Yor request is pending or you already send request"
            })
        }
        newSendFollowReq= await Follow({
            user:LoginUserId,
            followID:AnotherUserId,
            status:"pending"
        });
        console.log("newSendFollowReq========>",newSendFollowReq);
        await newSendFollowReq.save();
         return res.status(200).json({
            message:`You send follow request to ${AnotherUserId}`,
            sendFollowing:newSendFollowReq,
         })
    } catch (error) {
        
   return res.status(500).json({
    error:error.message,

   })

    }

}

module.exports = sendFollowing;

