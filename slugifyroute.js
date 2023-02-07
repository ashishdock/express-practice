const express = require('express');
slugifyroute = express();
const slugify = require('slugify');

slugifyroute.get('/', (req, res) => {
  const newString = slugify('some string');
  let uni = slugify('unicode ♥ is ☢'); // unicode-love-is
  console.log(newString);
  console.log(uni);
  slugify.extend({ '☢': 'radioactive' });
  uni = slugify('unicode ♥ is ☢'); // unicode-love-is-radioactive
  console.log(uni);
  res.send(newString);
});

module.exports = slugifyroute;
