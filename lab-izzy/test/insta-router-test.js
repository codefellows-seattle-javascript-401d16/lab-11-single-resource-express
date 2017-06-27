'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempInsta;

describe('testing insta routes', () => {
  before(server.start);
  after(server.stop);


  describe('testing POST /api/instas', () => {
    it('should respond with a 200', () => {
      return superagent.post(`${API_URL}/api/instas`)
        .send({name: 'Izabella Baer', content: 'lounging in the sun all weekend long'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.content).toEqual('lounging in the sun all weekend long');
          expect(res.body.created).toExist();
          tempInsta = res.body;
        });
    });
    it('should respond with a 400 invalid request', () => {
      superagent.post(`${API_URL}/api/instas`)
        .send(null)
        .then(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing GET /api/instas', () => {
    it('should respond with an insta', () => {
      return superagent.get(`${API_URL}/api/instas/${tempInsta._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempInsta._id);
          expect(res.body.content).toEqual('lounging in the sun all weekend long');
          expect(res.body.created).toEqual(tempInsta.created);
        });
    });
    it('should respond with a 404 not found', () => {
      superagent.get(`${API_URL}/api/instas/458376`)
        .then(err => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing PUT /api/instas', () => {
    it('should respond with an updated insta', () => {
      return superagent.put(`${API_URL}/api/instas/${tempInsta._id}`)
        .send({name: 'Isla Maeve', content: 'hacker baby'})
        .then(res => {
          expect(res.status).toEqual(200);
          // expect(res.body._id).toEqual(tempInsta._id);
          expect(res.body.content).toEqual('hacker baby');
          expect(res.body.created).toEqual(tempInsta.created);
        });
    });
  });

  describe('testing DELETE /api/instas', () => {
    it('should delete the file', () => {
      return superagent.delete(`${API_URL}/api/instas/${tempInsta._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with a 404 not found', () => {
      superagent.get(`${API_URL}/api/instas/`)
        .then(err => {
          expect(err.status).toEqual(404);
        });
    });
  });


});
