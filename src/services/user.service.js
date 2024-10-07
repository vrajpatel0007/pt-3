const User = require("../models/user.model");
const mongoose = require("mongoose");
const register = async (body) => {
  return User.create(body);
};


const findemail = async (email) => {
  return await User.findOne({ Email: email });
};
const getUser = async () => {
  const alluser = await User.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "user_id",
        as: "Task"
      }
    }
  ]);
  return alluser;
};

const findId = async (userid) => {
  const userWithTasks = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(userid) }
    },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "user_id",
        as: "tasks"
      }
    }
  ]);
  return userWithTasks;
};
const userupdate = async (userid, body) => {
  return await User.findByIdAndUpdate(userid, { $set: body }, { new: true });
};
const deleteUser = async (userid, taskid) => {
  await User.findByIdAndDelete(userid);
};


const passupdate = async (userid, body) => {
  return await User.findByIdAndUpdate(userid, { Password: body }, { new: true });
}






module.exports = {
  register,
  findemail,
  getUser,
  findId,
  userupdate,
  deleteUser,
  passupdate,
};
