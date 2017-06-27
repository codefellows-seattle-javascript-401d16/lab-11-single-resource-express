'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempPlayer;

describe('testing player routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/players',() => {
    it('should respond with a player', () => {
      return superagent.post(`${API_URL}/api/players`)
        .send({name: 'Messi', team: 'Barcelona', position: 'G.O.A.T'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Messi');
          expect(res.body.team).toEqual('Barcelona');
          expect(res.body.position).toEqual('G.O.A.T');
          expect(res.body.created).toExist();
          tempPlayer = res.body;
        });
    });
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/players`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing GET /api/player', () => {
    it('should respond with a player', () => {
      return superagent.get(`${API_URL}/api/players/${tempPlayer._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempPlayer._id);
          expect(res.body.name).toEqual('Messi');
          expect(res.body.team).toEqual('Barcelona');
          expect(res.body.position).toEqual('G.O.A.T');
          expect(res.body.created).toEqual(tempPlayer.created);
        });
    });
    it('should respond with a 404', () => {
      return superagent.get(`${API_URL}/api/players/1234`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing PUT /api/player', () => {
    it('should respond with a altered player', () => {
      return superagent.put(`${API_URL}/api/players/${tempPlayer._id}`)
        .send({name: 'Ronaldo', team: 'Real Madrid', position: 'Other G.O.A.T'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempPlayer._id);
          expect(res.body.name).toEqual('Ronaldo');
          expect(res.body.team).toEqual('Real Madrid');
          expect(res.body.position).toEqual('Other G.O.A.T');
          expect(res.body.created).toEqual(tempPlayer.created);
        });
    });
  });

  describe('testing DELETE /api/player', () => {
    it('should respond with a 200', () => {
      return superagent.delete(`${API_URL}/api/players/${tempPlayer._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({});
        });
    });
  });
});
