const fibonacciRoutes  = require('./fibonacci');

const constructorMethod = (app) => {
  app.use('/', fibonacciRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;
