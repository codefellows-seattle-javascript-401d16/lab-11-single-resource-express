'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempHero;

describe('Testing Hero routes', () => {
  before(server.start);
  after(server.stop);

  describe('Testing POST request', () => {
    it('should post information to database', () => {
      return superagent.post(`${API_URL}/api/heros`)
      .send({hero: 'Artanis', score: 97, player: 'Phan', team: 'Tempo Storm'})
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.hero).toEqual('Artanis');
        expect(res.body.score).toEqual(97);
        expect(res.body.player).toEqual('Phan');
        expect(res.body.team).toEqual('Tempo Storm');
        expect(res.body.dateCreated).toExist();
        tempHero = res.body;
      });
    });
    it('Should return 400 error', () => {
      return superagent.post(`${API_URL}/api/heros`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });
  describe('Testing Get request', () => {
    it('Should return with hero information', () => {
      return superagent.get(`${API_URL}/api/heros/${tempHero._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempHero._id);
        expect(res.body.hero).toEqual('Artanis');
        expect(res.body.score).toEqual(97);
        expect(res.body.player).toEqual('Phan');
        expect(res.body.team).toEqual('Tempo Storm');
        expect(res.body.dateCreated).toEqual(tempHero.dateCreated);
        tempHero = res.body;
      });
    });
  });
  describe('Testing PUT request', () => {
    it('should return with updated information', () => {
      return superagent.put(`${API_URL}/api/heros/${tempHero._id}`)
      .send({hero: 'Sonya', score: 88, player: 'Goku', team: 'Esport20'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempHero._id);
        expect(res.body.hero).toEqual('Sonya');
        expect(res.body.score).toEqual(88);
        expect(res.body.player).toEqual('Goku');
        expect(res.body.team).toEqual('Esport20');
        expect(res.body.dateCreated).toExist();
        tempHero = res.body;
      });
    });
  });
  describe('Testing DELETE request', () => {
    it('should return with updated information', () => {
      return superagent.delete(`${API_URL}/api/heros/${tempHero._id}`)
      .then(res => {
        console.log(res.body.id);
        expect(res.status).toEqual(204);
      });
    });
  });
});
