const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        require:true
    }
});

const Like = mongoose.model("like",LikeSchema);
module.exports = Like;


