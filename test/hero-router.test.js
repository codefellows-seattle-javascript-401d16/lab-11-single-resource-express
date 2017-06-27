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
    it('should update dataase wiht information', () => {
      return superagent.post(`${API_URL}/api/hero`)
      .send({hero: 'Artanis', score: 97, player: 'Phan', team: 'Tempo Storm'})
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.hero).toEqual('Artanis');
        expect(res.body.score).toEqual(97);
        expect(res.body.player).toEqual('Phan');
        expect(res.body.team).toEqual('Temp Storm');
        expect(res.body.dateCreated).toExist();
        tempHero = res.body;
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
        expect(res.body.team).toEqual('Temp Storm');
        expect(res.body.dateCreated).toEqual(tempHero.dateCreated);
      });
    });
  });
});
