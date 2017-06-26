'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const superagent = require('superagent');
const expect = require('expect');
const server= require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempHero;

describe('testing hero routes', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/notes', () => {
    it('should respond with a hero', () => {
      return superagent.post(`${API_URL}/api/heros`)
      .send({power: 'giving epic sunburns',
        name: 'Don Oucho'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Don Oucho');
        expect(res.body.created).toExist();
        tempHero = res.body;
      });
    });
  });
});
