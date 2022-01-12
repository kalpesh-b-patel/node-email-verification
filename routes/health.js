const route = require('express').Router();

route.get('/', (_, res) => {
    return res.status(200).json({
      health: 'Up',
    });
  });

  module.exports = route;