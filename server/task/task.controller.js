
class TaskController {
    constructor(taskService) {
      this.taskService = taskService;
    }
  
    getAllTasks(req, res) {
        
        this.taskService.getAllTasks()
            .then(data => {
                res.status(200).send(data);
            }).catch((e) => {
                return res.status(500).json(e)
            })
        //console.log(userList)
        
    }

    async saveTask(req, res) {
        try{            
            console.log(req.body);
            const data = await this.taskService.saveTask( req.body )
            return res.status(201).json(data);
        }
        catch(e){
            return res.status(500).json(e)
        }
    }

    async updateTask(req, res) {
        try{
            console.log("controlñler" + JSON.stringify(req.body), req.params.id)
            const data = await this.taskService.updateTask( req.body, req.params.id);
            return res.status(201).json(data);
        }catch(e){
            return res.status(500).json(e)
        }
    }

    async deleteTask(req, res) {
        console.log("delete - controller")
        try{
            console.log("delete",  req.params.id)
            const data = await this.taskService.deleteTask( req.params.id);
            return res.status(201).json({deleted: req.params.id});
        }catch(e){
            return res.status(500).json(e)
        }
    }



} 
module.exports = TaskController;