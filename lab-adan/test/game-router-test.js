require('dotenv').config({ path: `${__dirname}/../.test.env` });
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempGame;

describe('testing gamescore routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/gamescore', () => {
    it('should respond with a gamescore', () => {
      return superagent
        .post(`${API_URL}/api/gamescore`)
        .send({
          name: 'Sonic',
          score: '9000',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Sonic');
          expect(res.body.score).toEqual('9000');
          expect(res.body.created).toExist();
          tempGame = res.body;
        });
    });

    it('should respond with 400 invalid request body', () => {
      return superagent.post(`${API_URL}/api/gamescore`).send().catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/gamescore', () => {
    it('should respond with a gamescore', () => {
      return superagent
        .get(`${API_URL}/api/gamescore/${tempGame._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Sonic');
          expect(res.body.score).toEqual('9000');
          expect(res.body.created).toExist();
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/gamescore/`).catch(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('testing PUT /api/gamescore', () => {
    it('should respond with a 200 and updated gamescore', () => {
      return superagent
        .put(`${API_URL}/api/gamescore/${tempGame._id}`)
        .send({
          name: 'Sonic the Hedgehog',
          score: '19000',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Sonic the Hedgehog');
          expect(res.body.score).toEqual('19000');
        });
    });
  });

  describe('testing DELETE /api/gamescore', () => {
    it('should respond with a 200', () => {
      return superagent
        .delete(`${API_URL}/api/gamescore/${tempGame._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toNotExist();
        });
    });
  });
});
