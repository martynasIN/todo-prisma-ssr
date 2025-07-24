const Todo = require('../models/todo');

exports.listTodos = async (req, res) => {
  try {
    const todos = await Todo.getAllByUser(req.session.userId);
    res.render('index', { todos });
  } catch (err) {
    res.status(500).send('Error loading todos');
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.redirect('/');
    }
    await Todo.create(title.trim(), req.session.userId);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error creating todo');
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getById(id);
    if (!todo || todo.ownerId !== req.session.userId) return res.redirect('/');
    await Todo.update(id, { completed: !todo.completed });
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error updating todo');
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getById(id);
    if (!todo || todo.ownerId !== req.session.userId) return res.redirect('/');
    await Todo.delete(id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error deleting todo');
  }
}; 