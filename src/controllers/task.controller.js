const task_service = require("../services/task.service");
const user_service = require("../services/user.service");


// Create Task
const createtask = async (req, res) => {
  console.log(
    "==================================== createtask ===================================="
  );
  try {
    const userExists = await user_service.findId(req.body._id);
    console.log("🚀 ~ createtask ~ userExists:", userExists);

    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const taskCount = await task_service.taskCount(req.body._id);
    console.log("🚀 ~ createtask ~ taskCount:", taskCount)
    if(taskCount >=10){
      res.status(400).json({ message: "Task limit exceeded" });
    }
    const body = {
      Title: req.body.Title,
      Description: req.body.Description,
      dueDate: req.body.dueDate,
      user_id: req.body._id,
    };
    const task = await task_service.createtask(body);
    console.log("🚀 ~ createtask ~ taskid:", task._id);
    return res
      .status(200)
      .json({ message: "Task created successfully", data: task });
  } catch (error) {
    console.error("Error in createtask:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Task List
const tasklist = async (req, res) => {
  console.log(
    "==================================== tasklist ===================================="
  );
  try {
    const list = await task_service.tasklist();
    return res.status(200).json({ message: "Task list", data: list });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Userby Id task
const userbyidt = async (req, res) => {
  console.log(
    "==================================== UserByIdt ===================================="
  );
  console.log("🚀 ~ userbyidt ~ userid:", req.user);
  console.log("🚀 ~ userbyidt ~ userid:", req.user._id);
  try {
    const userExists = await user_service.findId(req.user._id);
    console.log("🚀 ~ userbyidt ~ userExists:", userExists);
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const usertask = await task_service.usertask(req.user._id);
    // await usertask.populate("User")
    console.log("🚀 ~ userbyidt ~ usertask:", usertask);
    return res.status(200).json({ message: "User Task", data: usertask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Task Delete
const taskdelete = async (req, res) => {
  console.log(
    "==================================== taskdelete ===================================="
  );
  const taskid = req.params.taskId;
  console.log("🚀 ~ taskdelete ~ taskid:", taskid);
  try {
    const taskExists = await task_service.taskByid(taskid);
    console.log("🚀 ~ taskdelete ~ taskExists:", taskExists);
    if (!taskExists) {
      return res.status(400).json({ message: "Task Not Exists" });
    }
    return res.status(200).json({ message: "Task Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Task Update
const taskupdate = async (req, res) => {
  console.log(
    "==================================== taskupdate ===================================="
  );
  const taskid = req.params.taskId;
  const task = req.body;
  console.log("🚀 ~ taskupdate ~ task:", task);
  console.log("🚀 ~ taskupdate ~ taskid:", taskid);
  try {
    const taskExists = await task_service.taskByid(taskid);
    console.log("🚀 ~ taskdelete ~ taskExists:", taskExists);
    if (!taskExists) {
      return res.status(400).json({ message: "Task Not Exists" });
    }
    const body = {};
    if (req.body) {
      body.Title = req.body.Title,
      body.Description = req.body.Description,
      body.dueDate = req.body.dueDate;
    }
    console.log("🚀 ~ taskupdate ~ body:", body);
    const update = await task_service.updatatask(taskid, body);
    return res
      .status(200)
      .json({ message: "Task Updata successfully", data: update });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createtask,
  tasklist,
  userbyidt,
  taskdelete,
  taskupdate
}