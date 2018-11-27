const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    tarea : {type:String, required:true},
    fecha : {type:String, required:true}
});

module.exports = mongoose.model('tareas',TaskSchema);