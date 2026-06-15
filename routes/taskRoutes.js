const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {createTask, getTask, getTaskById, updateTask, deleteTask, assignTask, getNotifications} = require("../controllers/taskController");



router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getTask);

router.get("/:id", authMiddleware, getTaskById);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);


router.put("/assign/:id", authMiddleware, assignTask);

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  (req, res) => {
    res.status(200).json({
      success: true,
      file: req.file,
    });
  }
);


router.get(
 "/",
 authMiddleware,
 getNotifications
);

module.exports = router;