const Task = require("../models/taskModel");

exports.getDashboardStats = async (req, res) => {
  try {

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const highPriorityTasks = await Task.countDocuments({
      priority: "High",
    });

    res.status(200).json({
      success: true,

      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        highPriorityTasks,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};