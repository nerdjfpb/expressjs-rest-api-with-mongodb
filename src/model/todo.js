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

// initialing the shema for validation parameters
const JoiSchema = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  completed: Joi.boolean(),
})

// validation using Joi & finally return the result of validation
export const validateTodo = (todo) => JoiSchema.validate(todo)

export default TodoModel
