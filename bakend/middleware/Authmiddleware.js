const jwt = require("jsonwebtoken");
const Model_user = require("../model/model");
// const SecreatKey = "SecreatKey";

const VerifyToken = async (req, res, next) => {
  //   const tokenString = req.header("authorization");
  //   console.log("tokenString==>" + tokenString);
  //   if (!tokenString || !tokenString.startsWith("Bearer")) {
  //     throw Error("Please required the Token");
  //   }

  //   const token = tokenString.split(" ")[1];
  //   if (!token) {
  //     throw Error("Please Provide Token");
  //   }

  //   jwt.verify(token, SecreatKey, (err, data) => {

  //     if (err) {
  //       throw new Error("Could not connected to protected route");
  //     }

  //     res.json({
  //       message: "succesful login",
  //       data,
  //     });
  //     console.log("connected to protected");
  //   });
  //   next();
  try {

    const tokenString = req.header("authorization");
    console.log("tokenString==>" + tokenString);
    if (!tokenString || !tokenString.startsWith("Bearer")) {
    
      res.status(401).json({message:"please require provide Token"});

      // throw Error("Please required the Token");
    }

    const token = tokenString.split(" ")[1];
    if (!token) {
      token = null;
      res.status(401).json({message:"Please Provide Token"});

      // throw Error("Please Provide Token");
    }

    const VerifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    console.log("VerifyToken UserID id:", VerifyUser);
    // ====below is undefine=========
   if(!VerifyUser.id){
    req.user = null;
    return res.status(401).json({message:"Invalid Toked Provided"});
   }
    const user = await Model_user.findById(VerifyUser.id);

    if (!user) {
      req.user = null;
      return res.status(400).json({ message: "User dose Not exits" });
    }

    //   res.json = isValidUser;
    console.log("isvalidUser======>" + user);
    req.user = user;
    // res.json(req.user);

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      
    });
  }
};

module.exports = VerifyToken;




// const VerifyToken = async (req, res, next) => {
//   try {
//     const tokenString = req.header("authorization");
//     if (!tokenString || !tokenString.startsWith("Bearer")) {
//       return res.status(401).json({ message: "Please provide a valid token" });
//     }

//     const token = tokenString.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Please provide a valid token" });
//     }

//     const VerifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);

//     if (!VerifyUser.id) {
//       // Clear req.user if the token is invalid
//       req.user = null;
//       return res.status(401).json({ message: "Invalid token provided" });
//     }

//     const user = await Model_user.findById(VerifyUser.id);

//     if (!user) {
//       // Clear req.user if the user doesn't exist
//       req.user = null;
//       return res.status(401).json({ message: "User does not exist" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     // Clear req.user on any error during token verification
//     req.user = null;
//     return res.status(401).json({ message: "Token verification failed" });
//   }
// };

// module.exports = VerifyToken;

