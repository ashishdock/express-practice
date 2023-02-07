const express = require('express');
const multerTest = express();

multerTest.get('/', (req, res) => {
  //   res.send('multerTest');
  res.render('multerform');
});

module.exports = multerTest;
