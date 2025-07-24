const User = require('../models/user');

exports.showRegister = (req, res) => {
  res.render('register', { error: req.flash('error') });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email and password required');
    return res.redirect('/register');
  }
  const existing = await User.findByEmail(email);
  if (existing) {
    req.flash('error', 'Email already registered');
    return res.redirect('/register');
  }
  await User.create(email, password);
  res.redirect('/login');
};

exports.showLogin = (req, res) => {
  res.render('login', { error: req.flash('error') });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user || !(await User.validatePassword(user, password))) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }
  req.session.userId = user.id;
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}; 