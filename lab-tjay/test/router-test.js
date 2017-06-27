'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempMinion;

describe('testing all the routes! :', () => {

  before(server.start);
  after(server.stop);

  describe('testing the POST of api/minions/ :', () => {
    it('should respond with a note', () => {
      return superagent.post(`${API_URL}/api/minions`)
        .send({content: 'Its so FLUFFY!'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.content).toEqual('Its so FLUFFY!');
          expect(res.body.created).toExist();
          tempMinion = res.body;
        });
    });
  });

  describe('testing the POST of api/minions/ :', () => {
    it('should respond with a note', () => {
      return superagent.get(`${API_URL}/api/minions/${tempMinion._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempMinion._id);
          expect(res.body.created).toEqual(tempMinion.created);
        });
    });
  });

});
