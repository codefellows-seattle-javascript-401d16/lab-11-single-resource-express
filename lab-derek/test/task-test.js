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
  describe('testing failed route', () => {
    it('should return a status of 404 for unregistered routes', () => {
      return superagent.get(`${API_URL}/api/failtest`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  // TODO: POST - test 200, response body like {<data>} for a post request with a valid body

  describe('testing post new task', () => {
    it('should return a status of 200 and new task', () => {
      return superagent.post(`${API_URL}/api/tasks`)
      .send({taskName: 'testTask', xp: 10, questTask: true, questName: 'testQuest'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.taskName).toEqual('testTask');
        expect(res.body.xp).toEqual(10);
        expect(res.body.questTask).toEqual(true);
        expect(res.body.questName).toEqual('testQuest');
        expect(res.body.created).toExist();
        tempTask = res.body;
        console.log(tempTask);
      });
    });
  });

// TODO: write tests to ensure your /api/resource-name endpoint responds as described for each condition below:
// TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found

  describe('testing GET request with invalid id', () => {
    it('should return status 404 for request with id that was not found', () => {
      return superagent.get(`${API_URL}/api/tasks/id:123123`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

// TODO: GET - test 200, response body like {<data>} for a request made with a valid id

  describe('testing GET for file not found for valid id', () => {
    it('should return status 200 and task with valid id', () => {
      return superagent.get(`${API_URL}/api/tasks/${tempTask._id}`)
      // .catch(err => {
      //   console.log(err, 'err');
      //   console.log(tempTask._id);
      .then(res => {
        expect(res.status).toEqual(200);
        // expect(res.body._id).toEqual(tempTask._id);
        // expect(res.body.taskName).toEqual(tempTask.taskName);
        // expect(res.body.xp).toEqual(tempTask.xp);
        // expect(res.body.questTask).toEqual(tempTask.questTask);
        // expect(res.body.questName).toEqual(tempTask.questName);
        // expect(res.body.created).toExist();
        console.log(tempTask);
      });
    });
  });
// TODO: PUT - test 200, response body like {<data>} for a post request with a valid body

  describe('testing PUT - update task', () => {
    it('should return status 200 and updated body', () => {
      return superagent.put(`${API_URL}/api/tasks/${tempTask._id}`)
      .send({taskName: 'updatedTestName'})
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });

// TODO: POST - test 400, with an invalid request body

  describe('testing POST with invalid request body', () => {
    it('should return status 400', () => {
      return superagent.post(`${API_URL}/api/tasks/${tempTask._id}`)
      .send({terk: 'asdfadfasdf'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });
});
