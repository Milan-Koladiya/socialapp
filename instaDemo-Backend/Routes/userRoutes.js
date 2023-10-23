//login user send Follow request to another person code... if another persont accept login user follow request then updation in login user's following list

//(followe following complete code 
//if person accept myfollow req then update my following list)

//if login user has get follow request from another person then in login user's api follow status is pending
//if login user accept another person follow request then follow status is accept and updation in login user's follow list as well as updation in another person following list 
//if login user reject another person follow req then follow status is rejected

//multererror

const express = require('express');

const router = express.Router();
const UserRegistration = require('../controllers/User/userRegistration');
const UserLogin = require('../controllers/User/userLogin');
const Getdata = require('../controllers/User/Getdata');
const CreatePost = require('../controllers/Post/Createpost');
const VerifyToken = require('../middleware/Authmiddleware');
const UploadFile = require('../config/MulterConfig');
const UpdatePost = require('../controllers/Post/UpdatePost');
const DeletePost = require('../controllers/Post/DeletePost');
const { verify } = require('jsonwebtoken');
const UserAllPost = require('../controllers/Post/UserAllPost');
const Following = require('../controllers/follower-following/following');
const UnFollow = require('../controllers/follower-following/unfollow');
const Follower = require('../controllers/follower-following/follower');
const GetAllFollower = require('../controllers/follower-following/GetAllFollower');
const GetAllFollowing = require('../controllers/follower-following/GetAllFollowing');
const PostLike = require('../controllers/Likes/likes');
const AcceptFollowReq = require('../controllers/follower-following/acceptFollowReq');
const RejectFollowReq = require('../controllers/follower-following/rejectFollowReq');
const searchUser = require('../controllers/User/searchUser');
const AllLikes = require('../controllers/Likes/allLikes');
const sendFollowing = require('../controllers/follower-following2/sendfollowreq');
const acceptFollowReq = require('../controllers/follower-following2/acceptFollowReq');
const GetAllFollowing2 = require('../controllers/follower-following2/getallFollowing');
const GetAllFollower2 = require('../controllers/follower-following2/getallFollower');
// const AllLikes = require('../controllers/Likes/allLikes');

//registration
router.post('/registration',UserRegistration);

//login
router.post('/login',UserLogin);

//getdata
router.get('/login/data',VerifyToken,Getdata)

//searchUser
router.get('/search/users',VerifyToken,searchUser);


//create post
router.post('/user/post',VerifyToken,UploadFile,CreatePost);
 
//updatePost
router.put('/update/:id',VerifyToken,UpdatePost);

//deletePost
router.delete('/post/delete/:id',VerifyToken,DeletePost);

//userAllPost
router.get('/user/posts',VerifyToken,UserAllPost);


//LikePost //pass post id
router.post('/likes/:id',VerifyToken,PostLike);

//allLikes 
router.get('/likes/:id',VerifyToken,AllLikes);


//   ===========Follower-Following Section=========
// send request:---->following  following.js
//accept request:---->acceptFollow  acceptFollowReq.js
// ---there is no need of get follow request---
//reject request--->rejectfollow  
//unfollow request---->unfollow  unFollow.js

// //following 
// //here user send follow req and also anthoter user get follow req
// router.post('/following/:id',VerifyToken,Following);

// //getfollow request
// // router.post('/follow/:id',VerifyToken,Follower);


// //accept Follow Req 
// router.post('/acceptFollow/:id',VerifyToken,AcceptFollowReq);


// //reject Follow Req
// router.post('/rejectFollow/:id',VerifyToken,RejectFollowReq);

// //unfollow
// router.post('/unfollow/:id',VerifyToken,UnFollow);

// //GetAllFollower
// router.get('/getFollower',VerifyToken,GetAllFollower); 

// //GetAllFollowing
// router.get('/getFollowing',VerifyToken,GetAllFollowing);

// ===========follower -following 2nd==========


//new schema FollowerSchema2.js
//folder follower-following 2 inside controller

//send follow req
router.post('/following/:id',VerifyToken,sendFollowing);


//accept (notifaction)
router.post('/acceptFollowReq/:id',VerifyToken,acceptFollowReq);


//getallFollowing
router.get('/getFollowing',VerifyToken,GetAllFollowing2)

//getallFollower
router.get('/getFollower',VerifyToken,GetAllFollower2);





module.exports = router;

