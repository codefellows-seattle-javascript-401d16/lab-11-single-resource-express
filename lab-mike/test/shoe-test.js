'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;

let tempShoe;

describe('testing shoe routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/shoes', () => {
    it('should respond with a shoe', () => {
      return superagent.post(`${API_URL}/api/shoes`)
        .send({
          brand: 'nike',
          color: 'red',
          size: 13,
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.brand).toEqual('nike');
          expect(res.body.color).toEqual('red');
          expect(res.body.size).toEqual(13);
          tempShoe = res.body;
        });
    });
    it('should respond with a 400 validation failed', () => {
      return superagent.post(`${API_URL}/api/shoes`)
        .send({
          color: 'red',
          size: 13,
        }).catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('should respond with a 400 validation failed', () => {
      return superagent.post(`${API_URL}/api/shoes`)
        .send({
          brand: 'nike',
          size: 13,
        }).catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('should respond with a 400 validation failed', () => {
      return superagent.post(`${API_URL}/api/shoes`)
        .send({
          brand: 'nike',
          color: 'red',
        }).catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
    it('should respond with a 400 validation failed', () => {
      return superagent.post(`${API_URL}/api/shoes`)
        .send({})
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
  });

  describe('test GET at /api/shoes/:id', () => {
    it('should respond with tempShoe', () => {
      return superagent.get(`${API_URL}/api/shoes/${tempShoe._id}`)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempShoe._id);
          expect(res.body.brand).toEqual(tempShoe.brand);
          expect(res.body.color).toEqual(tempShoe.color);
          expect(res.body.size).toEqual(tempShoe.size);
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/shoes/`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/shoes/3`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing PUT requests /api/shoes/:id', () => {
    it('should respond with an updated shoe', () => {
      return superagent.put(`${API_URL}/api/shoes/${tempShoe._id}`)
        .send({
          brand: 'adidas',
          color: 'black',
          size: 3,
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.brand).toEqual('adidas');
          expect(res.body.color).toEqual('black');
          expect(res.body.size).toEqual(3);
        });
    });
    it('should respond with a partially updated shoe', () => {
      return superagent.put(`${API_URL}/api/shoes/${tempShoe._id}`)
        .send({
          color: 'green',
          size: 4,
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.brand).toEqual('adidas');
          expect(res.body.color).toEqual('green');
          expect(res.body.size).toEqual(4);
        });
    });
    it('should respond with a partially updated shoe', () => {
      return superagent.put(`${API_URL}/api/shoes/${tempShoe._id}`)
        .send({
          brand: 'zappos',
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.brand).toEqual('zappos');
          expect(res.body.color).toEqual('green');
          expect(res.body.size).toEqual(4);
          tempShoe = res.body;
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.put(`${API_URL}/api/shoes/`)
        .send({})
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.put(`${API_URL}/api/shoes/3`)
        .send({})
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('test DELETE /api/shoes', () => {
    it('should respond with the deleted shoe', () => {
      return superagent.delete(`${API_URL}/api/shoes/${tempShoe._id}`)
        .then((res) => {
          expect(res.status).toEqual(204);
          expect(res.body).toEqual({});
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/shoes/${tempShoe._id}`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.delete(`${API_URL}/api/shoes/`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.delete(`${API_URL}/api/shoes/3`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });
});
