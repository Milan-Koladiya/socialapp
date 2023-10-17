const mongoose = require("mongoose");

// const FollowSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//   },
//   follower: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//   }],
//   following: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//   }],
//   status: {
//     type: String,
//     // require: true,
//   },
// });
// const Follow = mongoose.model("follow", FollowSchema);

// module.exports = Follow;




const followSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    // required: true,
  },
  following:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    // require:true 
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
});
const Follow = mongoose.model('follow',followSchema);
module.exports = Follow;


