
const { Todo } = require('../models');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, completed, dueDate, priority } = req.body;

    const todo = await Todo.create({
      userId: req.user.id,    
      title,
      description,
      completed,
      dueDate,
      priority
    });

    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};


exports.getAllTodos = async (req, res, next) => {
  console.log("Fetching todos for user:", req.user);
  try {
      const todos = await Todo.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
       });
    return res.json(todos);
  } catch (err) { next(err); }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
  where: { id: req.params.id, userId: req.user.id }
});
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    return res.json(todo);
  } catch (err) { next(err); }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority } = req.body;
    const todo = await Todo.findOne({
  where: { id: req.params.id, userId: req.user.id }
});

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
    const todo = await Todo.findOne({
    where: { id: req.params.id, userId: req.user.id }
    });

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await todo.destroy();
    return res.status(204).send();
  } catch (err) { next(err); }
};
