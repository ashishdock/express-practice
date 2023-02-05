const express = require('express');
const resformat = express();

resformat.get('/', (req, res) => {
  //   resformat.disable('x-powered-by');
  resformat.set('x-powered-by', false);
  res.format({
    'text/plain': function () {
      res.send('hey');
    },

    'text/html': function () {
      res.send('<h6>hey</h6>');
    },
    'application/json': function () {
      res.send({ message: 'hey' });
    },

    default: function () {
      //log the request and respond with 406
      res.status(406).send('Not Accepatable');
    },
  });
});

module.exports = resformat;
