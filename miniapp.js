const express = require('express');

const miniapp = express();

miniapp.use(express.json());
miniapp.use(express.urlencoded({ extended: true }));

miniapp.all('/', (req, res) => {
  console.log('This is miniapp');
  res.send('MiniApp');
});

miniapp.post('/profile', function (req, res, next) {
  console.log(req.body);
  console.log(req.hostname);
  res.json(req.body);
});

module.exports = miniapp;
