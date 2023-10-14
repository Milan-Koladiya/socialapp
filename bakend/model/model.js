
const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        userName:{
            type:String,
        }
        // follower:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"users"
        // },
        // following:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"users"
        // }
        // status:{

        // }
    }
) 


const Model_user = mongoose.model("users", ModelSchema);

module.exports = Model_user;