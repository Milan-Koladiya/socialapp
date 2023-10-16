// const Model_user = require("../model/model");
const jwt = require('jsonwebtoken');
const Model_user = require("../../model/model");
const SecreatKey = "SecreatKey";
const Refresh_SecreatKey = "SecreatKey";
const bcrypt = require('bcrypt');



const UserLogin = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log("email:" + email);
    console.log("password:" + password);
    if (!email && !password) {
      throw new Error("All Feild Are Required");
    }

    // if (email && password) {
    const findUser = await Model_user.findOne({ email: email });

    if(!findUser){
        throw new Error("User not found!");
    }

    console.log("findUser email:" + findUser.email);
    console.log("findUser password:" + findUser.password);

    const Matchpasword = await bcrypt.compare(password,findUser.password)

    if (email != findUser.email || !Matchpasword) {
      throw new Error("Username or Password are wrong");
    }

    // ==========Json Web Token
    //  jwt.sign({id: findUser.id} ,SecreatKey,{expiresIn:"1d"},(err,token)=>{

    //         if(err){
    //             res.json("invalid token")
    //         }else{
    //             res.json({
    //                 message:"profile Access",
    //                 token
    //             });
    //         }
    //  } )
     
    jwt.sign({id:findUser.id},Refresh_SecreatKey,{expiresIn:"365d"},(err,token)=>{
      if(err){
       return res.json("invalid token")
      }
      // else{
        res.json({
          message:"profile Access",
          token,
          findUser
        })
      // }
    }
    )
    // res.status(200).send("Log in successfully");
    
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = UserLogin;
