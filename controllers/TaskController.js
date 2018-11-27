const Task = require('../models/Task');
const taskController = {};

//almacenar la tarea
taskController.store = function(req, res, next)
{
    console.log("entrar");
    let task = new Task({
        tarea:req.body.tarea,
        fecha:req.body.fecha
    });

    task.save(function(err){
        if(err)
            return res.satus(400).send({"error":err});
        return res.status(200).json({"message":"creado con exito"});
    });

} 

taskController.getTareas = function(req,res,next)
{
    Task.find({},function(err,tareas){
        if(err)
            return res.status(400).send({"error":err});
        return res.status(200).json({tareas});
    })
}

taskController.delete = function(req, res, next)
{
    let {id} = req.params;
    console.log(id);
    Task.deleteOne({_id:id},function(err){
        if(err)
        {
            return res.status(400).send({"error":err});
        }
        return res.status(200).json({"message":"Eliminado con exito"});
    })
}


module.exports = taskController;