const express = require('express');
const signup = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

signup.set('view engine', 'ejs');

// signup.set('views', './views');

signup.use(bodyParser.json());
signup.use(bodyParser.urlencoded({ extended: true }));
signup.use(upload.array());
signup.use(cookieParser());
signup.use(
  session({
    name: 'authtest',
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

var Users = [{ id: 'name', password: 'password' }];

function checkSignIn(req, res) {
  if (req.session.user) {
    next();
    // if session exists, proceed to page
  } else {
    var err = new Error('Not logged in');
    console.log(req.session.user);
    next(err); // Express will handle this error with the error message
  }
}

signup.get('/', (req, res) => {
  res.render('signup', { message: '' });
});

signup.post('/', (req, res) => {
  if (!req.body.id || !req.body.password) {
    res.status(400);
    res.send('Invalid details');
  } else {
    Users.filter((user) => {
      if (user.id === req.body.id) {
        res.render('signup', {
          message: 'User Already Exists! Login or choose another user id',
        });
      }
    });
    var newUser = { id: req.body.id, password: req.body.password };
    Users.push(newUser);
    req.session.user = newUser;
    console.log(newUser);
    console.log(Users);
    console.log(req.session);
    res.redirect('/signup/protected_page');
  }
});

signup.get('/protected_page', (req, res) => {
  console.log(req.session.user);
  console.log(req.session.user.id);
  res.render('protected_page', { id: req.session.user.id });
});

signup.get('/login', (req, res) => {
  res.render('login', { message: '' });
});

signup.post('/login', (req, res) => {
  console.log(Users);
  if (!req.body.id || !req.body.password) {
    res.render('login', { message: 'Please enter both id and password' });
  } else {
    Users.filter((user) => {
      console.log('Filtering users');
      if (user.id === req.body.id && user.password === req.body.password) {
        req.session.user = user;
        res.redirect('/signup/protected_page');
      }
    });
    res.render('login', { message: 'Invalid credentials' });
  }
});

signup.get('/logout', (req, res) => {
  req.session.destroy(() => {
    console.log('user logged out');
  });
  res.redirect('/signup/login');
});

signup.use('/protected_page', (err, req, res, next) => {
  console.log(err);
  res.redirect('/signup/login');
});

module.exports = signup;
