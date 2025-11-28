
const Todo = require('../models/todo.model');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, completed, dueDate, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'title is required' });

    const todo = await Todo.create({
        title,
        description,
        completed,
        dueDate,
        priority
    });
    return res.status(201).json(todo);
  } catch (err) { next(err); }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(todos);
  } catch (err) { next(err); }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    return res.json(todo);
  } catch (err) { next(err); }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.dueDate = dueDate ?? todo.dueDate;
    todo.priority = priority ?? todo.priority;

    if (typeof completed === 'boolean') todo.completed = completed;

    await todo.save();
    return res.json(todo);
  } catch (err) { next(err); }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await todo.destroy();
    return res.status(204).send();
  } catch (err) { next(err); }
};
