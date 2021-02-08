const { update } = require('./task.model');
const Task = require('./task.model');

class TaskRepository {
  constructor() {
    this.Task = Task;
  }

  async getAllTasks() {
    console.log('repository 2');

    return await this.Task.find({})
      .catch((e) => {
        const error = new Error('db - error getting all users');
        error.stack = e;
        throw error;
      });
  }

  async saveTask(taskBody) {
    try {
      console.log(`repository${JSON.stringify(taskBody)}`);
      const task = new this.Task(taskBody);
      await task.save()
        .catch((e) => {
          console.log(e);
          throw e;
        });
      return task;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateTask(taskBody, id) {
    try {
      return await this.Task.findByIdAndUpdate(id, taskBody, { useFindAndModify: false }, (err, doc) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log(JSON.stringify(doc));
        return doc;
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deleteTask(id) {
    try {
      return await this.Task.findByIdAndRemove(id, { useFindAndModify: false }, (err, doc) => {
        if (err) {
          console.log(err);
          throw err;
        }
        console.log(JSON.stringify(doc));
        return doc;
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = TaskRepository;
