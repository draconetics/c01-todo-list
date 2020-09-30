
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
},{ timestamps: true })
;

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;

