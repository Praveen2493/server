const Notification = require("../models/Notification");
const Task = require("../models/Task");
const sendEmail = require("../utils/sendEmail");

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy:req.user.id,
        });


        res.status(200).json({
            success:true,
            task,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



exports.getTask = async (req, res) => {

  try {

    const {
      search,
      category,
      status,
      priority,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    // Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category && category !== "All") {
      filter.category = category;
    }

    // Filter by status
    if (status && status !== "All") {
      filter.status = status;
    }

    // Filter by priority
    if (priority && priority !== "All") {
      filter.priority = priority;
    }


        // Sorting
    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    if (sort === "deadline") {
      sortOption = { deadline: 1 };
    }

    const totalTasks = await Task.countDocuments(filter);

    
    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: tasks.length,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: Number(page),
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



exports.assignTask = async (
  req,
  res
) => {
  try {

    const { userId } = req.body;

    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {
      return res.status(404).json({
        success:false,
        message:"Task Not Found"
      });
    }

    task.assignedTo = userId;

    await task.save();

    await Notification.create({
      userId: userId,
      message: `You have been assigned task: ${task.title}`
    })


    await sendEmail(
  assignedUser.email,
  "Task Assigned",
  `You have been assigned task: ${task.title}`
);

    res.json({
      success:true,
      message:"Task Assigned",
      task
    });

  } catch(error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



exports.getNotifications =
async(req,res)=>{

  const notifications =
  await Notification.find({

    userId:req.user.id

  }).sort({
    createdAt:-1
  });

  res.json({
    success:true,
    notifications
  });

};