'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http//localhost:${process.env.PORT}`;
let tempTask;

describe('Testing note-routes', () => {
  // DONE-TODO: start your server when they begin and
  before(server.start);
  // DONE-TODO: stop your server when they finish
  after(server.stop);

  // TODO: write a test to ensure that your api returns a status code of 404 for routes that have not been registered
  it('should return a status of 404 for unregistered routes', () => {
    superagent.post(`${API_URL}/api/failtest`)
    .send({content: 'please fail this test'})
    .then(res => {
      expect(res.status).toEqual(404);
      expect(res.body._id).toExist();
      expect(res.body.content).toEqual('please fail this test');
      expect(res.body.created).toExist();
    });
  });
});



// TODO: write tests to ensure your /api/resource-name endpoint responds as described for each condition below:
// TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found
// TODO: GET - test 200, response body like {<data>} for a request made with a valid id
// TODO: PUT - test 200, response body like {<data>} for a post request with a valid body
// TODO: POST - test 200, response body like {<data>} for a post request with a valid body
// TODO: POST - test 400, with an invalid request body
