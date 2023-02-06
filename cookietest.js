const express = require('express');
const cookie = require('cookie');

const cookietest = express();

cookietest.get('/', (req, res) => {
  previousCookie = req.cookies;
  console.log('Previous Cookies: ', req.cookies);
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('name', 'Some data', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  );
  res.statusCode = 302;
  res.send(`Cookie set. Previous Cookie: ${req.cookies}`);
});

module.exports = cookietest;
