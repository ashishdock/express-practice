const express = require('express');
const path = require('path');

const birds = require('./birds');
const middleware = require('./middleware');
const my_middleware = require('./my-middleware');
require('dotenv').config();

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
  //   res.send('Hi Universe!');
});

app.post('/', (req, res) => res.send('Post request to the homepage'));

// app.use(express.static('public'));
// app.use('/static', express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//ROUTE PATHS

app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section...');
  res.send('secret');
  next();
});

app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

app.get('/abc+de', (req, res) => res.send('abc+de'));

//ROUTE PARAMETERS*****************************************************************************
app.get('/users/:userId/books/:bookId', (req, res) => res.send(req.params));

app.get('/flights/:from-:to', (req, res) => {
  res.send(`Flight from ${req.params.from} to ${req.params.to}`);
});

//ROUTE HANDLERS ******************************************************************************
app.get(
  '/example/b',
  (req, res, next) => {
    console.log('Example B: the response will be sent by the next function.');
    next();
  },
  (req, res) => {
    res.send('Hello from example B');
  }
);

const cb0 = (req, res, next) => {
  console.log('CB0');
  next();
};

const cb1 = function (req, res, next) {
  console.log('CB1');
  next();
};

const cb2 = (req, res) => {
  console.log('CB2');
  res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);

app.get(
  '/example/d',
  [cb0, cb1],
  (req, res, next) => {
    console.log('From example D');
    next();
  },
  (req, res) => {
    res.send('This is example D');
  }
);

// ROUTES. app.route() ***************************************************************
app
  .route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });

// express.Router ******************************************************************
app.use('/birds', birds);

// middleware **************************************************************
app.use('/middleware', middleware);

app.use('/mode', my_middleware('light'));

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
