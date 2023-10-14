const Post = require("../../model/PostSchema");

const DeletePost = async (req, res) => {
  try {
    console.log("delete====>"+req.params.id);
      const FindPost = await Post.findOne({_id:req.params.id});
    //   console.log("findPost:"+FindPost);
      if(!FindPost){
        return res.status(404).json({message:"Post not found"})
      }
     
      const deletePost = await Post.deleteOne({ _id: req.params.id });
     
      
      res.status(200).json({
        success:"Post Successfully Deleted",
        DeletePost:deletePost
      })
      
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = DeletePost;
