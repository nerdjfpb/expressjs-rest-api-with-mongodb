import Joi from 'joi'
import Mongoose from 'mongoose'

const todoSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

// create model by mongoose
const TodoModel = Mongoose.model('Todo', todoSchema)

// validation using Joi
export function validateTodo(todo) {
  // initialing the shema for validation parameters
  const schema = {
    title: Joi.string().min(5).max(255).required(),
  }
  // finally return the result of validation
  return Joi.validate(todo, schema)
}

export default TodoModel
