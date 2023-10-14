const Model_user = require("../../model/model");
const Post = require("../../model/PostSchema");


const CreatePost = async (req, res) => {
  // router.post("/post",verifyToken,async(req,res)=>{
  try {
    

    const post = await Post.find({ user: req.user.id });
    console.log("userId:" + req.user.id);
    if (!post) {
      return res.status(200).send("you don't have any post");
    }
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path,
      author: req.user.id,
    });
    await newPost.save();
    console.log("newpost:" + newPost);
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json({
      error:message.error
    });
  }
  // });
  
  // try {
  //   console.log("userId====>"+user,id);
  //   const post = new Post({
  //       userId:req.user._id,
  //       title:req.body.title,
  //       description:req.body.description
  //   });
  //   await post.save();
  //   console.log("post=====>"+post.userId);

  // console.log("InstGram Post:");
  // const findpost = await Post.findOne({ user: req.user._id });
  // console.log("Post=====>"+findpost);
  // if (!findpost) {
  //   return res.json("You Don't have any Post");
  // }

  // } catch (error) {
  //   res.status(404).send({
  //     error: error.message,
  //   });
  // }
};
module.exports = CreatePost;

