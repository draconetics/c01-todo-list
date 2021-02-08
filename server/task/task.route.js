const express = require('express');

const router = express.Router();
const TaskController = require('./task.controller');
const { taskService } = require('./dependency');

const taskController = new TaskController(taskService);

router.get('/tasks', (req, res) => taskController.getAllTasks(req, res));
router.post('/tasks', (req, res) => taskController.saveTask(req, res));
router.put('/tasks/:id', (req, res) => taskController.updateTask(req, res));
router.delete('/tasks/:id', (req, res) => taskController.deleteTask(req, res));

module.exports = router;
