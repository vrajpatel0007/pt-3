const Task = require("../models/task.model")


const createtask = async (body) => {
    return await Task.create(body);
};
const tasklist = async () => {
    return await Task.find();
};
const usertask = async (userid) => {
    return await Task.find({ user_id: userid }).populate("user_id", {
        Password: 0,
    });
};
const taskByid = async (taskid) => {
    return await Task.findById(taskid);
};
const deletetask = async (taskid) => {
    return await Task.findByIdAndDelete(taskid);
};
const updatatask = async (taskid, body) => {
    return Task.findByIdAndUpdate(taskid, { $set: body }, { new: true });
};

const taskCount =  async (id)=>{
    return await Task.countDocuments({ userId: id });
}

module.exports = {
    createtask,
    tasklist,
    usertask,
    taskByid,
    deletetask,
    updatatask,
    taskCount
}