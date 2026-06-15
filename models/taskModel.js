const mongoose = require("mongoose");

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },

      category: {
        type: String,
        default: "Work",
      },

      priority: {
        type: String,
        enum: [
          "Low",
          "Medium",
          "High",
        ],
        default: "Medium",
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "In Progress",
          "Completed",
        ],
        default: "Pending",
      },

      deadline: {
        type: Date,
      },

      assignedTo: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Task ||
  mongoose.model(
    "Task",
    taskSchema
  );