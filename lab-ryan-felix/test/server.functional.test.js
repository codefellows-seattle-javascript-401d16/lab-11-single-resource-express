'use strict';

require('dotenv').config({ path: `${__dirname}/.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;


describe('server functional test', () => {
  before(server.start);
  after(server.stop);

  let testId;
  it('should respond 201 and write a proper post request', () => {

    return superagent.post(`${API_URL}/api/sofas`)
      .send({
        material: 'wicker',
        colors: ['natural', 'black'],
        price: 299.99,
      })
      .then(res => {
        expect(res.status).toEqual(201);
        expect(res.body._id).toExist();
        expect(res.body.material).toEqual('wicker');
        expect(res.body.colors).toEqual(['natural', 'black']);
        expect(res.body.price).toEqual(299.99);
        testId = res.body._id;
      });
  });

  it('should respond 400 to a malformed POST request', () => {
    return superagent.post(`${API_URL}/api/sofas`)
      .send({
        material: 'rainbows',
        colors: 42,
      })
      .catch(err => {
        expect(err.status).toEqual(400);
      });
  });

  it('should respond 200 with list of ids to GET to api root', () => {
    return superagent.get(`${API_URL}/api/sofas`)
      .then(res => {
        expect(res.body).toExist();
        expect(res.body[0]).toEqual(testId);
      });
  });

  it('should respond 200 and return a proper GET request', () => {

    return superagent.get(`${API_URL}/api/sofas/${testId}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(testId);
        expect(res.body.material).toEqual('wicker');
        expect(res.body.colors).toEqual(['natural', 'black']);
        expect(res.body.price).toEqual(299.99);
      });
  });

  it('should respond 404 to a GET for a bad id', () => {
    return superagent.get(`${API_URL}/api/sofas/not-an-id`)
      .catch(err => {
        expect(err.status).toEqual(404);
      });
  });

  it('should respond 202 and give back sofa on proper PUT request', () => {

    return superagent.put(`${API_URL}/api/sofas/${testId}`)
      .send({
        material: 'cloth',
      })
      .then(res => {
        expect(res.status).toEqual(202);
        expect(res.body.material).toEqual('cloth');
        expect(res.body.colors).toEqual(['natural', 'black']);
        expect(res.body.price).toEqual(299.99);
      });
  });

  it('should respond 404 to a PUT for a non-existent ID', () => {
    return superagent.put(`${API_URL}/api/sofas/not-an-id`)
      .send({
        material: 'leather',
        colors: ['red', 'orange'],
        price: 350,
      })
      .catch(err => {
        expect(err.status).toEqual(404);
      });
  });

  it('should respond 204 on DELETE', () => {
    return superagent.delete(`${API_URL}/api/sofas/${testId}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });

  it('should actually have deleted it', () => {
    return superagent.get(`${API_URL}/api/sofas/${testId}`)
      .catch(err => {
        expect(err.status).toEqual(404);
      });
  });

  it('should respond 404 to DELETE for non-existent item', () => {
    return superagent.delete(`${API_URL}/api/sofas/not-an-id`)
      .catch(err => {
        expect(err.status).toEqual(404);
      });
  });
});
