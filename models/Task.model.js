const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String},
    description: {type: String},
    priority: {type: Number, enum: [1, 2, 3, 4, 5]}
  },
  {timestamps: true}
)

const Task = model('Task', taskSchema);

module.exports = Task;