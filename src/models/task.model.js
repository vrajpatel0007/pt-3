const { Schema, model, mongoose } = require("mongoose");

const taskSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Overdue'],
      default: 'Pending'
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("task", taskSchema);

module.exports = Task;
