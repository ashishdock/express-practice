const express = require('express');
const multerForm = express();
const multer = require('multer');
const path = require('path');
uploadDirectory = path.resolve(__dirname, './uploads');
const upload = multer({ dest: uploadDirectory });
const fs = require('fs');

let speakers;

multerForm.get('/', (req, res) => {
  res.render('multerform');
});

multerForm.post('/', upload.single('uploaded_file'), (req, res, next) => {
  console.log(req.body);
  speakers = req.body.nspeakers;
  res.redirect('multerForm/multerformResult');
});

multerForm.get('/multerformResult', (req, res) => {
  res.render('multerResult', { speakers: speakers });
});

multerForm.get('/multerformFile', (req, res) => {
  res.download(
    path.resolve(uploadDirectory, 'e4db86665fd31eeb9a3e0f633bb33604'),
    (err) => {
      if (err) {
        next(err);
      }
    }
  );
});

module.exports = multerForm;
