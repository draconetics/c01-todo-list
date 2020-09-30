const TaskRepository = require("./task.repository");
const TaskService = require("./task.service");

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
module.exports = {
  taskRepository,
  taskService
};
