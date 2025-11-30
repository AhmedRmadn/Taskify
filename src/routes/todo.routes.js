
const authMiddleware = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo.controller');

router.use(authMiddleware);

router.post('/', controller.createTodo);
router.get('/', controller.getAllTodos);
router.get('/:id', controller.getTodoById);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
