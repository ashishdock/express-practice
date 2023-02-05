const express = require('express');
const router = express.Router();

//middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', (req, res) => {
  console.log(req.baseUrl);
  console.log(req.hostname);
  console.dir(req.hostname);
  console.dir(req.ip);
  console.dir(req.method);
  console.dir(`BaseUrl: ${req.baseUrl}`);
  console.dir(req.originalUrl);
  console.log(req.protocol);
  console.log(req.route);
  res.send('Birds home page');
});
// define the about page
router.get('/about', (req, res) => {
  console.log(req.baseUrl);
  console.log(req.hostname);
  console.dir(req.hostname);
  console.dir(req.ip);

  console.dir(req.originalUrl);
  console.dir(`BaseUrl: ${req.baseUrl}`);
  console.dir(req.path);
  res.send('About birds');
});

module.exports = router;
