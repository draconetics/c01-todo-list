class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks() {
    const results = await this.taskRepository.getAllTasks()
      .catch((e) => { throw e; });
    return { results };
  }

  saveTask(taskBody) {
    try {
      return this.taskRepository.saveTask(taskBody);
    } catch (e) {
      throw e;
    }
  }

  updateTask(taskBody, id) {
    try {
      return this.taskRepository.updateTask(taskBody, id);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  deleteTask(id) {
    try {
      return this.taskRepository.deleteTask(id);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = TaskService;
