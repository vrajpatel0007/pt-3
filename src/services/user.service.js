const User = require("../models/user.model");
const Task = require("../models/task.model");

const register = async (body) => {
  return User.create(body);
};

const verifyupdate = async (user) => {
  return User.findOneAndUpdate({ Email: user }, { Isverify: true, OTP: "0" }, { new: true })
}

const findemail = async (email) => {
  return await User.findOne({ Email: email });
};
const getUser = async () => {
  const alluser = await User.aggregate([
    {
      $lookup: {
        from: "Task",
        localField: "_id",
        foreignField: "user_id",
        as: "tasks"
      }
    }
  ]);
  return alluser;
};
const findId = async (userid) => {
  return await User.findById(userid).populate("Task", { user_id: 0 });
};
const userupdate = async (userid, body) => {
  return await User.findByIdAndUpdate(userid, { $set: body }, { new: true });
};
const deleteUser = async (userid, taskid) => {
  await User.findByIdAndDelete(userid);
  await Task.findByIdAndDelete(taskid);
};


const passupdate = async (userid, body) => {
  return await User.findByIdAndUpdate(userid, { Password: body }, { new: true });
}






module.exports = {
  register,
  verifyupdate,
  findemail,
  getUser,
  findId,
  userupdate,
  deleteUser,
  passupdate,
};
