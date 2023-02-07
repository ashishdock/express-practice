const express = require('express');
const path = require('path');
require('dotenv').config();
const ejs = require('ejs');
const fs = require('fs');
const helmet = require('helmet');
const responseTime = require('response-time');
// const StatsD = require('node-statsd');
const favicon = require('serve-favicon');
const timeout = require('connect-timeout');
var vhost = require('vhost');

const birds = require('./birds');
const middleware = require('./middleware');
const my_middleware = require('./my-middleware');
const persons = require('./persons');
const miniapp = require('./miniapp');
const setcookie = require('./setcookie');
const resformat = require('./resformat');
const morganpage = require('./morganpage');
const bodyparserlink = require('./bodyparserlink');
const bodyparserroute = require('./bodyparserroute');
const cookietest = require('./cookietest');
const sessionsp = require('./public/js/sessions-practice');
const authorization = require('./auth/authorization');
const multerForm = require('./multer/multerForm');
const multerTest = require('./multer/multerTest');
const multerexample = require('./multerexample/multerexample');
const formidableexample = require('./formidable/formidableexample');
const jwtroot = require('./jwt/jwtroot');
const slugifyroute = require('./slugifyroute');
const otproute = require('./otp/otproute.js');
const queryparamsroute = require('./queryparamsroute');
const axiosroute = require('./axios/axiosroute');

const app = express();
// const stats = new StatsD();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(timeout('0.2ms'));

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.use(helmet('x-powered-by', false));

// app.disable('x-powered-by');
app.set('x-powered-by', false);

app.locals.title = 'My Express App';

app.set('view engine', 'ejs');
app.use(responseTime());

// app.use(
//   responseTime(function (req, res, time) {
//     var stat = (req.method + req.url)
//       .toLowerCase()
//       .replace(/[:\.]/g, '')
//       .replace(/\//g, '_');
//     stats.timing(stat, time);
//   })
// );

app.get('/', function (req, res) {
  res.send('Hello World!');
  //   res.send('Hi Universe!');
});

// app.use(
//   vhost('*.ashish.com', (req, res) => {
//     console.dir(req.vhost.host);
//     console.dir(req.vhost.hostname);
//     console.dir(req.vhost.length);
//     console.dir(req.vhost[0]);
//     console.dir(req.vhost[1]);
//   })
// );

// app.use(haltOnTimedout);

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
  console.dir(app.mountpath);
  res.send('ab?cd');
});

app.get('/abc+de', (req, res) => res.send('abc+de'));

//ROUTE PARAMETERS*****************************************************************************
app.get('/users/:userId/books/:bookId', (req, res) => res.send(req.params));

app.get('/flights/:from-:to', (req, res) => {
  res.send(`Flight from ${req.params.from} to ${req.params.to}`);
});

app.get('/animals', (req, res) => {
  console.log('animals route');
  res.send('animals route');
});

app.param('animalId', function (req, res, next, animalId) {
  console.log('CALLED ONLY ONCE');
  next();
});

app.get('/animals/:animalId', (req, res, next) => {
  console.log('although this matches');
  console.log(app.path());
  console.dir(`BaseUrl: ${req.baseUrl}`);
  console.dir(app.path());
  next();
});
app.get('/animals/:animalId', (req, res, next) => {
  console.log('and this matches too');
  console.dir(app.path());
  res.send(`Animal: ${req.params.animalId}`);
});

//ROUTE HANDLERS ******************************************************************************
app.get(
  '/example/b',
  (req, res, next) => {
    console.log('Example B: the response will be sent by the next function.');
    console.dir(app.path());
    console.log(req.baseUrl);
    console.dir(req.baseUrl);
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
    console.dir(app.path());
    console.log(app.path());
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

// Router level middleware *************************************
app.use('/persons', persons);

// Using template engines
app.get('/index/:id', (req, res) => {
  console.log('Index page');
  res.render('index', { data: req.params.id, name: 'Something' });
});

// Error handling
app.get('/broken', (req, res) => {
  throw new Error('BROKEN'); // Express will catch this on its own
});
// in the below case pass the error to next and express will handle the error
app.get('/missingfile', (req, res, next) => {
  fs.readFile('file-does-not-exist', (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

// this will throw error to next() function if there is an error in writing to file
app.get(
  '/writeinaccessible',
  (req, res, next) => {
    fs.writeFile('inaccessible-path', 'data', next); // this actually still creates the file
  },

  (req, res) => {
    res.send('OK');
  }
);

app.get('/timererror', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN');
    } catch (error) {
      next(error);
    }
  }, 100);
});

app.get('/promiseerror', (req, res, next) => {
  Promise.resolve()
    .then(() => {
      throw new Error('BROKEN');
    })
    .catch(next);
});

app.get('/readfileerror', (req, res, next) => {
  fs.readFile(
    '/maybe-valid-file',
    'utf-8',
    (err, data) => {
      res.locals.data = data;
      next(err);
    },
    (req, res) => {
      res.locals.data = res.locals.data.split(',')[1];
      res.send(res.locals.data);
    }
  );
});

app.use('/miniapp', miniapp);

app.use('/setcookie', setcookie);

app.use('/resformat', resformat);

app.use('/morganpage', morganpage);

app.use('/bodyparserlink', bodyparserlink);
// app.post('/bodyparserlink', bodyparserlink);

app.use('/bodyparserroute', bodyparserroute);

app.use('/cookietest', cookietest);

// SESSION PRACTICE ************************************************
app.use('/sessions', sessionsp);

// AUTHORIZATION
app.use('/signup', authorization);

// Multerform
app.use('/multerform', multerForm);
app.use('/multerexample', multerexample);

// Formidable
app.use('/formidableexample', formidableexample);

// JSON WEB TOKEN
app.use('/jwtroot', jwtroot);

//SLUGIFY
app.use('/slugifyroute', slugifyroute);

//OTP
app.use('/otproute', otproute);

// QUERYPARAMS
app.use('/queryparamsroute', queryparamsroute);

app.use('/axiosroute', axiosroute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  console.log(app.locals.title);
  console.log(app.locals.email);
  console.log(app.locals.__dirname);
  console.log(app.locals.PORT);
});
