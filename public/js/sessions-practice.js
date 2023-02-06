const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const sessionsp = express();

sessionsp.use(
  session({
    genid: (req) => uuidv4(),
    name: 'testSession',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);
sessionsp.use(cookieParser());

sessionsp.get('/', (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;

    res.send('You visited this page ' + req.session.page_views + ' times.');
  } else {
    req.session.page_views = 1;
    res.send('Welcome! This is your first time visiting this page.');
  }
});

module.exports = sessionsp;

// In this example, we will use the default store for storing sessions, i.e., MemoryStore. Never use this in production environments.

//Note Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.

//Warning The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.
