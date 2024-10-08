const express = require("express");
const task_controller = require("../controllers/task.controller");
const router = express.Router();
const { authUser,authorizeAdmin } = require("../middleware/auth");



router.post("/createtask",  authUser,authorizeAdmin, task_controller.createtask);
router.get("/tasklist", authUser,authorizeAdmin, task_controller.tasklist);
router.get("/useridbytask", authUser, task_controller.userbyidt);
router.put("/taskupdate",authUser, task_controller.taskupdate);
router.delete("/taskdelete", authUser,authorizeAdmin, task_controller.taskdelete);




module.exports = router;
