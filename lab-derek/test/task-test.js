'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempTask;

describe('Testing note-routes', () => {
  // DONE-TODO: start your server when they begin and
  before(server.start);
  // DONE-TODO: stop your server when they finish
  after(server.stop);

  // TODO: write a test to ensure that your api returns a status code of 404 for routes that have not been registered
  it('should return a status of 404 for unregistered routes', () => {
    superagent.post(`${API_URL}/api/failtest`)
    .then(err => {
      expect(res.status).toEqual(404);
    });
  });
});

// TODO: POST - test 200, response body like {<data>} for a post request with a valid body

it('should return a status of 200 and new task', () => {
  superagent.post(`${API_URL}/api/task`)
  .send({taskName: 'testTask', xp: 10, questTask: true, questName: 'testQuest'})
  .then(res => {
    console.log(res.status);
    console.log(res.body._id);
    console.log(res.body.created);
    console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body._id).toExist();
    expect(res.body.taskName).toEqual('testTask');
    expect(res.body.xp).toEqual(10);
    expect(res.body.questTask).toEqual(true);
    expect(res.body.taskName).toEqual('testQuest');
    expect(res.body.created).toExist();
    tempTask = res.body;

  });
});

// TODO: write tests to ensure your /api/resource-name endpoint responds as described for each condition below:
// TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found
// TODO: GET - test 200, response body like {<data>} for a request made with a valid id
// TODO: PUT - test 200, response body like {<data>} for a post request with a valid body

// TODO: POST - test 400, with an invalid request body
