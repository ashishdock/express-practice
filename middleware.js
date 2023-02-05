const express = require('express');
const router = express.Router();

const requestTime = (req, res, next) => {
  req.timeStamp = Date.now();
  next();
};

router.use(requestTime);

router.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.timeStamp}</small>`;
  res.send(responseText);
});

router
  .route('/router')
  .get((req, res) => {
    res.send('middleware/router-GET');
    console.log('middleware/router-get');
  })
  .post((req, res) => {
    res.send('middleware/router-POST');
    console.log('middleware/router-POST');
  })
  .patch((req, res) => {
    res.send('middleware/router-PATCH');
    console.log('middleware/router-PATCH');
  });

router.get(
  '/user/:id',
  (req, res, next) => {
    if (req.params.id % 2 === 0) {
      next('route');
    } else {
      next();
    }
  },
  (req, res, next) => {
    res.send('You are odd');
  }
);

router.get('/user/:id', (req, res, next) => {
  if ((req, res)) {
    res.send('You are special even!');
  }
});

module.exports = router;
