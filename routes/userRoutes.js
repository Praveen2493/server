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
router.get("/profile-image", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Use POST with an image field named profileImage to upload a profile image",
  });
});

router.post(
  "/profile-image",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);


module.exports = router;