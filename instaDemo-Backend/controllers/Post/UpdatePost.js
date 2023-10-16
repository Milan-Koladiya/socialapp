
const express = require("express");
const Post = require("../../model/PostSchema");
const UpdatePost = async (req, res) => {
  try {
    console.log("userid" + req.user);

    //============it will give single Post then pass  post(_id) in postman
    const SinglePost = await Post.findById({ _id: req.params.id });
    console.log("FindSinglePost" + SinglePost);
    // res.json("SinglePost:" + SinglePost);

    //update image as well as like image:req.file.path
    const UpdatePost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    // await UpdatePost.save();
    console.log("updated post::::" + UpdatePost);
    res.status(200).json({
      success: "post Updated Succesfully",
      updatedProduct: UpdatePost,
    });

    //=============it will give Authore(user) all post pass author id in postman

    // const UserAllPost = await Post.find({ author: req.params.id });
    // console.log("UserAll Post=======>"+UserAllPost);
    // res.json("userAllPost:"+UserAllPost);
    // res.json(FindPostID);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = UpdatePost;
