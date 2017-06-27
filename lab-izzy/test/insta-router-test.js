'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempInsta;

describe('testing insta routes', () => {
  before(server.start);
  after(server.stop);


  describe('testing POST /api/instas', () => {
    it('should respond with an insta', () => {
      return superagent.post(`${API_URL}/api/instas`)
        .send({content: 'lounging in the sun all weekend long'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.content).toEqual('lounging in the sun all weekend long');
          expect(res.body.created).toExist();
          tempInsta = res.body;
        });
    });
  });

  describe('testing GET /api/instas', () => {
    it('should respond with an insta', () => {
      return superagent.get(`${API_URL}/api/notes/${tempInsta._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempInsta._id);
          expect(res.body.content).toEqual('lounging in the sun all weekend long');
          expect(res.body.created).toEqual(tempInsta.created);
        });
    });
  });

  describe('testing PUT /api/instas', () => {
    it('should respond with an updated insta', () => {
      return superagent.put()
        .send()
        .then()
          expect();
          expect();
          expect();
    });
  });
});

describe('testing DELETE /api/instas', () => {
  it('should respond with an updated insta', () => {
    return superagent.delete()
      .send()
      .then()
        expect();
        expect();
        expect();
      });
    });
});
