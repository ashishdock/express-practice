const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const morganpage = express();

// morganpage.use(morgan('combined'));

morganpage.get('/', (req, res) => {
  res.send('Hello World!');
});

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log')
);

morganpage.use(morgan('combined', { stream: accessLogStream }));

morganpage.get('/log', (req, res) => {
  res.send('Hello World:)');
});

module.exports = morganpage;
