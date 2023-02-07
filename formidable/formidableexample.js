const express = require('express');
const formidable = require('formidable');
const formidableexample = express();
const fs = require('fs');
const path = require('path');
const mv = require('mv');

/**
 * ! When a file is successfully uploaded to the server, it is placed on a temporary folder. The path to this directory can be found in the "files" object, passed as the third argument in the parse() method's callback function.
 * ? To move the file to the folder of your choice, use the File System module, and rename the file:
 */

formidableexample.get('/', (req, res) => {
  res.render('formidableform');
});

formidableexample.post('/', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(req.body);
    // console.log(res.json({ fields, files }));
    const oldpath = files.filetoupload.filepath;
    console.log(files.filetoupload.originalFilename);

    const newPath = path.resolve(
      __dirname,
      './uploads',
      files.filetoupload.originalFilename
    );
    console.log(`New Path: ${newPath}`);
    // fs.rename(oldpath, newPath, (err) => {
    //   next(err);
    // });
    //! fs.rename is not able to rename the file as the file may be on another partition, better to use a different approach than this.
    mv(oldpath, newPath, { mkdirp: true, clobber: false }, (err) => {
      if (err) {
        console.log(err);
        if (err.code === 'EEXIST') {
          res.send('You have already uploaded a file with the same name');
        } else {
          res.send(err.code);
        }
      } else {
        res.send('File uploaded');
        // res.json({ fields, files });
      }
    });
  });
});

module.exports = formidableexample;
