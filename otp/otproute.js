const express = require('express');
otproute = express();
const { authenticator } = require('otplib');

const secret = process.env.SECRET_KEY;

const token = authenticator.generate(secret);

otproute.get('/', (req, res) => {
  console.log(token);
  try {
    const isValid = authenticator.verify({ token, secret });
    console.log(isValid);
    console.log(authenticator.timeRemaining()); //Total is 30 seconds
    console.log(authenticator.timeUsed());
  } catch (err) {
    console.error(err);
    next(err);
  }
  res.send(token);
});

module.exports = otproute;
