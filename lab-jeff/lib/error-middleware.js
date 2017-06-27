'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.status);
  if(err.message.toLowerCase.includes('validation failed') > -1) {
    return res.sendStatus(400);
  }
  res.sendStatus(500);
};
