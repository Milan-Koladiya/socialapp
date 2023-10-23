const acceptFollowReq = require("../follower-following2/acceptFollowReq")
const GetAllFollower = require("./GetAllFollower")
const RejectFollowReq = require("./rejectFollowReq")

Dev
Milan
Trupesh
DK

Dev
    Milan => Request
    Trupesh => Not send
    DK => Request


user:- dev
followID:- Milan
Status:- 0

user:- dev
followID:- DK
Status:- 0

senderID:- 
RecinverId:- 
Status``



Milan         

notifaction (recive follow req)              acceptfollow req          RejectFollowReq
user:- Milan                                 user:dev                   user:dev
followID:- dev                           followID:Milan                   followId:Milan
Status:- 0                                 status:pending->Accepted       status:pending to rejected




Following   [done]                      send Folow Request/dev [done]
user:- Milan                           user:Milan
followID:- XYZ(not require)            followID:XYZ
Status:- 1                             status:pending



Followers[done]
user:- dev (not require)
followID:- Milan 
Status:- 1



user:- dev
followID:- Milan
Status:- 0

Request      Following       Followers    Rejected   


0  Pebnding
1 Accepted
2 Rejected
3 Unfollow



send follow req---->[done]
          login Milan send follow to dev following/65363429ce940c35f786eadf(dev) 

notifaction----->
          login devraj GetAllFollower    staus==pending
          
acceptFollowReq----->[done]
          login devraj accept follow req of Milan  acceptFollowReq/6536341cce940c35f786eadc(Milan)          

RejectFollowReq 
          login devraj reject follow req of Milan  RejectFollowReq/6536341cce940c35f786eadc(Milan)          
                     
GetAllFollower [done]
          login Milan           

getallFollowing[done]
                    
unfollow user