'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempFood;

describe('testing food routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/foods',() => {
    it('should respond with a food', () => {
      return superagent.post(`${API_URL}/api/foods`)
      .send({content: 'got an epic sunburn'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.content).toEqual('got an epic sunburn');
        expect(res.body.created).toExist();
        tempFood = res.body;
      });
    });
  });

  describe('testing GET /api/foods', () => {
    it('should respond with a food', () => {
      return superagent.get(`${API_URL}/api/foods/${tempFood._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempFood._id);
        expect(res.body.content).toEqual('got an epic sunburn');
        expect(res.body.created).toEqual(tempFood.created);
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/foods')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing PUT /api/food', () => {
    it('should respond with updating a notes information...', () => {
      return superagent.get(`${API_URL}/api/notes/${tempFood._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempFood._id);
        expect(res.body.content).toEqual('got an epic sunburn');
        expect(res.body.created).toEqual(tempFood.created);
      });
    });
  });
});
