'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}/api`;

describe('/api/seahawks routes', () => {
  let tempSeahawk;

  before(server.start);
  after(server.stop);

  describe('testing nonexistent endpoint', () => {
    it('Should respond 404', () => {
      return superagent.get(`${API_URL}/falcons`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
  describe('testing POST /api/seahawks', () => {
    it('Should respond 200 with the posted player', () => {
      return superagent.post(`${API_URL}/seahawks`)
      .send({name: 'Russell Wilson', height: `6'11"`, weight: 500, position: 'QB', picture: 'testpic/pic.png'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Russell Wilson');
        expect(res.body.height).toEqual('6\'11"');
        expect(res.body.weight).toEqual(500);
        expect(res.body.position).toEqual('QB');
        expect(res.body.picture).toEqual('testpic/pic.png');
        tempSeahawk = res.body;
      });
    });
    it('Should respond 400 bad request', () => {
      return superagent.post(`${API_URL}/seahawks`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });
  describe('testing GET /api/note', () => {
    it('Should respond 200 with all of the seahawks', () => {
      return superagent.get(`${API_URL}/seahawks`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toBeAn(Array);
      });
    });
    it('Should respond 200 with a player', () => {
      return superagent.get(`${API_URL}/seahawks/${tempSeahawk._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempSeahawk._id);
        expect(res.body.name).toEqual('Russell Wilson');
        expect(res.body.height).toEqual('6\'11"');
        expect(res.body.weight).toEqual('500');
        expect(res.body.position).toEqual('QB');
        expect(res.body.picture).toEqual('testpic/pic.png');
        tempSeahawk = res.body;
      });
    });
  });
  describe('testing PUT /api/note', () => {
    it('Should respond 200 with the updated player', () => {
      return superagent.put(`${API_URL}/seahawks/${tempSeahawk._id}`)
      .send({name: 'Russell Hawk', height: `6'12"`, weight: '185', position: 'QB', picture: 'testpic/pic.png'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Russell Hawk');
        expect(res.body.height).toEqual('6\'12"');
        expect(res.body.weight).toEqual('185');
        expect(res.body.position).toEqual('QB');
        expect(res.body.picture).toEqual('testpic/pic.png');
      });
    });
  });
  describe('testing DELETE /api/note', () => {
    it('Should respond 200', () => {
      return superagent.delete(`${API_URL}/seahawks/${tempSeahawk._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });
});
