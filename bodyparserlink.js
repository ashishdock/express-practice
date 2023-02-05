const express = require('express');
const bodyParser = require('body-parser');

const bodyparserlink = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

bodyparserlink.use(urlencodedParser);

bodyparserlink.use(jsonParser);

bodyparserlink.route('/login').post(urlencodedParser, (req, res) => {
  console.log('bodyparserlink/login');
  res.send('welcome' + req.body.username);
});

bodyparserlink.post('/api/users', jsonParser, (req, res) => {
  console.log('bodyparserlink/api/users');
  // create user in req.body
  res.send('nothing');
});

bodyparserlink.use((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body, null, 2));
});

module.exports = bodyparserlink;
