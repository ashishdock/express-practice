const express = require('express');
const queryparamsroute = express();

queryparamsroute.get('/', (req, res) => {
  console.log(req.query);
  res.send('See console');
});

module.exports = queryparamsroute;

//! use url like this http://localhost:3000/queryparamsroute?name=John&age=30&date=today&job=ceo
