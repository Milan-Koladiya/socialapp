const express = require("express");
const Model_user = require("../../model/model");

const searchUser = async (req, res) => {
  try {
    // const alluser = await Model_user.find({ userName: req.body.query });
    const { search } = req.query;
    console.log(search);
    // const {q} = req.query.userName;
    // console.log("q====>",q);
    const alluser = await Model_user.find({userName: {$regex:search, $options:"i"}});
    if (!alluser || alluser.length === 0) {
      return res.status(400).json({
        message: "No user was Found",
      });
    }
    res.status(200).json({
      message: "user found",
      alluser,
    });
    console.log("serach user===>", req.body);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = searchUser;
