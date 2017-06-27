'use strict';

require('dotenv').config({path: './.env'});
const request = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempBeer;

describe('testing beer routes', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/beers',() => {
    it('should respond with a 200 status code and a beer object.', () => {
      return request.post(`${API_URL}/api/beers`)
        .send({name: 'ipa', grain: '2row', hops: 'magnum', yeast: 's05'})
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('ipa');
          expect(res.body.grain).toEqual('2row');
          expect(res.body.hops).toEqual('magnum');
          expect(res.body.yeast).toEqual('s05');
          expect(res.body.created).toExist();
          tempBeer = res.body;
        });
    });
    it('should respond with a 400 status code if no body is sent.', () => {
      return request.post(`${API_URL}/api/beers`)
        .send(null)
        .catch(err => {
          expect(err.status).toEqual(400);
        });
    });
  });

  describe('testing GET /api/beers', () => {
    it('should respond with a 200 status code and a beer object.', () => {
      return request.get(`${API_URL}/api/beers/${tempBeer._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempBeer._id);
          expect(res.body.name).toEqual('ipa');
          expect(res.body.grain).toEqual('2row');
          expect(res.body.hops).toEqual('magnum');
          expect(res.body.yeast).toEqual('s05');
          expect(res.body.created).toEqual(tempBeer.created);
        });
    });
    it('should respond with a 200 status code and an array of IDs for all beer objects preseent in the DB.', () => {
      return request.get(`${API_URL}/api/beers`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(Array.isArray(res.body)).toEqual(true);
        })
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing PUT /api/beers', () => {
    it('should respond with a 202 status code and an updated beer object.', () => {
      return request.put(`${API_URL}/api/beers/${tempBeer._id}`)
        .send({name: 'pale ale', hops: 'chinook'})
        .then(res => {
          expect(res.status).toEqual(202);
          expect(res.body.name).toEqual('pale ale');
          expect(res.body.hops).toEqual('chinook');
        });
    });
    it('should respond with a 202 status code and a beer with name \'pale ale\'.', () => {
      return request.put(`${API_URL}/api/beers/${tempBeer._id}`)
        .send(null)
        .then(res => {
          expect(res.status).toEqual(202);
          expect(res.body.name).toEqual('pale ale');
        });
    });
    it('should respond with a 404 error code if an ID is not found.', () => {
      return request.get(`${API_URL}/api/beers/12345`)
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/beers', () => {
    it('should respond with a 204 status code and delete the given beer object', () => {
      return request.delete(`${API_URL}/api/beers/${tempBeer._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
          return request.get(`${API_URL}/api/beers/${tempBeer._id}`)
            .then(res => {
              expect(res.body).toNotExist();
            });
        });
    });
  });
});
