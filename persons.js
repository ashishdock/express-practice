const express = require('express');
const { route } = require('./birds');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('You have reached persons path');
  res.send('/persons');
});

// router.param('id'),
//   (req, res, next, id) => {
//     console.log('CALLED ONLY ONCE');
//     next();
//   };

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
    // next();
  }
);

router.get('/user/:id', (req, res, next) => {
  res.send('You are special even!');
});

module.exports = router;
