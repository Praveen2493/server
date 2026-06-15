const User = require("../models/User");

const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



exports.updateProfile = async (req, res) => {

  try {

    const {
      name,
      email,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};






exports.changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};




exports.uploadProfileImage = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });

    }

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    user.profileImage =
      `/uploads/${req.file.filename}`;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};