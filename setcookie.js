const express = require('express');
const setcookie = express();

setcookie.get('/', (req, res) => {
  console.log('SET COOKIE');
  res.cookie('name', 'tobi', {
    domain: 'example.com',
    path: '/setcookie',
  });
  res.cookie('rememberme', '1', {
    expires: new Date(Date.now() + 900000),
  });
  res.send('Cookie set');
});

setcookie.get('/multiple', (req, res) => {
  console.log('MULTIPLE COOKIE');
  res
    .status(201)
    .cookie('access_token', 'Bearer ' + token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    })
    .cookie('test', 'test')
    .redirect(301, '/birds');
});

// token is not defined

module.exports = setcookie;
