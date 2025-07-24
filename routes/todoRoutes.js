const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.listTodos);
router.post('/add', todoController.createTodo);
router.post('/toggle/:id', todoController.toggleTodo);
router.post('/delete/:id', todoController.deleteTodo);

module.exports = router; 