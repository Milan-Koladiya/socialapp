// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTYzMDkxODIsImV4cCI6MTY5NjM0NTE4Mn0.H35aY0Sjd1OTOdls-TWrwr1zEpy_ul0DlTVNAd3zmlc

const express = require("express");
const jwt = require("jsonwebtoken");
const validToken = require("../../middleware/Authmiddleware");
const Model_user = require("../../model/model");
const SecreatKey = "SecreatKey";

const Getdata = async (req, res) => {
  try {
    // console.log("getdata");
    // const user = Model_user.findOne({ _id: validUser.id });
    // res.json(user);
    isValidUser = req.user;
    console.log("IsvalidUserFrom Getdata:" + isValidUser);
    res.json(isValidUser);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = Getdata;
