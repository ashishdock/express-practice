const express = require('express');
const jwtroot = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const os = require('os');

jwtroot.use(bodyParser.json());
jwtroot.use(bodyParser.urlencoded({ extended: true }));

const Users = [
  { name: 'John', password: 'password' },
  { name: 'Jane', password: 'password' },
];

jwtroot.get('/', (req, res) => {
  res.render('login', { message: '' });

  //   res.send(HMACSHA256token);
  //   const RSASHA256token = jwt.sign({ foo: 'bar' }, process.env.JWT_PRIVATEKEY, {
  //     algorithm: 'RS256',
  //   });
  //   console.log(RSASHA256token);
  //! This is about public and private key and is a little complex compared to HMAC, do later

  //   const asyncRSASHA256token = jwt.sign(
  //     { foo: 'bar' },
  //     process.env.JWT_PRIVATEKEY,
  //     { algorithm: 'RS256' },
  //     (err, token) => {
  //       console.log(token);
  //     }
  //   );
});

let HMACSHA256token;

jwtroot.post('/', (req, res) => {
  if (!req.body.id || !req.body.password) {
    res.send('Please enter valid data');
  } else {
    Users.filter((user) => {
      console.log('Filtering users in jwtroot...');
      if (user.name === req.body.id && user.password === req.body.password) {
        HMACSHA256token = jwt.sign(
          {
            user: req.body.id,
            opsystype: os.type(),
            opsysrelease: os.release(),
            opsysplatform: os.platform(),
          },
          process.env.JWT_SECRET
        );
        console.log(HMACSHA256token);
        res.redirect('/jwtroot/yourinfo');
      }
    });
    console.log('****************Reached Inavlid credentials');
    res.send('Invalid credentials');
  }
});

jwtroot.get('/yourinfo', (req, res) => {
  console.log(HMACSHA256token);
  console.log(jwt.verify(HMACSHA256token, process.env.JWT_SECRET));

  try {
    var decodedToken = jwt.verify(HMACSHA256token, 'wrong text secret');
  } catch (err) {
    console.log(err);
    res.send(err);
  }

  if (decodedToken) {
    res.send('You are verified');
  } else {
    console.log(err);
  }
});

module.exports = jwtroot;
