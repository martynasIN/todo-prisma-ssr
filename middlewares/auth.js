const User = require('../models/user');
const Todo = require('../models/todo');

exports.requireLogin = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.locals.currentUser = await User.findById(req.session.userId);
  next();
};

exports.requireOwnership = async (req, res, next) => {
  const todo = await Todo.getById(req.params.id);
  if (!todo || todo.ownerId !== req.session.userId) {
    return res.status(403).send('Forbidden');
  }
  next();
}; 