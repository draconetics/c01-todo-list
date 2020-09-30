import http from "../config/http-common";

class TaskService {
  getAll() {
    return http.get("/tasks");
  }

    createTask(data){
      return http.post("/tasks", data);    
    }

    updateTask(id,editedTask){
      return http.put("/tasks/"+id, editedTask)
    }

    deleteTask(id){
      return http.delete("/tasks/"+id)
    }
}
export default new TaskService();
