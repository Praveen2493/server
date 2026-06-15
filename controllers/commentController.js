const Comment = require("../models/commentModel");


exports.addComment =
  async (req,res)=>{

    try {

      const comment =
        await Comment.create({

          taskId:
            req.params.taskId,

          userId:
            req.user.id,

          comment:
            req.body.comment

        });

      res.status(201).json({
        success:true,
        comment
      });

    } catch(error){

      res.status(500).json({
        success:false,
        message:error.message
      });

    }

};



exports.getComments =
async (req, res) => {

  try {

    const comments =
      await Comment.find({
        taskId:
          req.params.taskId,
      })
      .populate(
        "userId",
        "name"
      )
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      comments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};