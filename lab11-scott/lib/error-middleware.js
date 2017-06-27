'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);
//all errors have a .message property new Error('pass in your message string')
//if validation error respond with 400
  if(err.message.toLowerCase().includes('validation failed')) {
    return res.sendStatus(400);
  }
//if duplicate key respond with 409
  if(err.message.toLowerCase().includes('duplicate key')) {
    return res.sendStatus(409);
  }
  //if the id is not found
  if(err.message.toLowerCase().includes('objectid failed')) {
    return res.sendStatus(404);
  }
//otherwise respond with 500
  res.sendStatus(500);
};
