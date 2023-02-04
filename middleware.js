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

module.exports = router;
