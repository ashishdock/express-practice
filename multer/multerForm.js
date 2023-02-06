const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const fs = require('fs')

const multerForm = express();

multerForm.get('/', (req, res) => {
  res.render('multerform');
});

multerForm.post('/', upload.single('uploaded_file'), (req, res, next) => {
const speakers = req.body.nspeakers;
const 
});

multerForm.get('/multerformResult', (req, res) => {
    res.render('multerformResult', {speakers, img});
})
module.export = multerForm;
