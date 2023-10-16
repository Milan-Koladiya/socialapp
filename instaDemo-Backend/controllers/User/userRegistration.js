const Model_user = require("../../model/model");
const bcrypt = require('bcrypt');
const UserRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All Fields Are Required");
    }

    const user = await Model_user.findOne({ email });
    if (user) {
      throw new Error("Email Already in Use, Try With Diffrent Email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    // const hashPassword =
    const newUser = new Model_user({
      name:name,
      userName:email.split('@')[0],
      email:email,
      password:hashPassword,
    });
    await newUser.save();
    console.log("new user"+newUser)
    return res.status(200).json({
      status: "Success",
      Message: "User Created Successfullys",
      newUser
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
  }
};
module.exports = UserRegistration;