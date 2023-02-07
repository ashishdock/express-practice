const express = require('express');
const multerexample = express();
// const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

// multerexample.use(bodyParser.json());
// multerexample.use(bodyParser.urlencoded({ extended: true }));
// multerexample.use(upload.array());
// multerexample.use(express.static('public'));
//! instead of the above lines, we can just simply add middleware upload.none() in the route get/post method as middleware

multerexample.get('/', (req, res) => {
  res.render('form');
});

multerexample.post('/', upload.none(), (req, res) => {
  console.log(req.body);
  res.send('Received your request');
});

module.exports = multerexample;
