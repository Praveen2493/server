const express = require("express");

const router = express.Router();

// Middleware
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Controllers
const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require("../controllers/userController");


// ========================================
// GET USER PROFILE
// ========================================
router.get(
  "/profile",
  authMiddleware,
  getProfile
);


// ========================================
// UPDATE USER PROFILE
// ========================================
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);


// ========================================
// CHANGE PASSWORD
// ========================================
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);


// ========================================
// UPLOAD PROFILE IMAGE
// ========================================
router.put(
  "/profile-image",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);


module.exports = router;