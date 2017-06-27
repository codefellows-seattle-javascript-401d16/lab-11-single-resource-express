'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);

  // if validation error respond with 400
  if(err.message.includes('validation failed')) {
    return res.sendStatus(400);
  }

  // if duplicate key respond with 409
  if(err.message.includes('duplicate key'))
    return res.sendStatus(409);

  // otherwise respond with 500
  res.sendStatus(500);
};
