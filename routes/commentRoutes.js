const express = require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  addComment,
  getComments,
} = require(
  "../controllers/commentController"
);

router.post(
  "/:taskId",
  authMiddleware,
  addComment
);

router.get(
  "/:taskId",
  authMiddleware,
  getComments
);

module.exports = router;