module.exports = function (mode) {
  return function (req, res, next) {
    if (mode === 'dark') {
      console.log('Dark mode enabled');
      res.send('DARK MODE');
    } else {
      console.log('Light mode enabled');
      res.send('LIGHT MODE');
    }
  };
};
