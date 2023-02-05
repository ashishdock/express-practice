const express = require('express');
const bodyParser = require('body-parser');

const bodyparserroute = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

bodyparserroute.use(urlencodedParser);

bodyparserroute.use(jsonParser);

bodyparserroute.post('/login', urlencodedParser, (req, res) => {
  console.log('bodyparserlink/login');
  res.send('welcome' + req.body.username);
});

bodyparserroute.post('/api/users', jsonParser, (req, res) => {
  console.log('bodyparserlink/api/users');
  // create user in req.body
});

module.exports = bodyparserroute;
