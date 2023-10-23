const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    followID :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected','unfollow'],
      default: 'pending',
    },

  });

  const Follow = mongoose.model('follow2',followSchema);
  module.exports = Follow;


  