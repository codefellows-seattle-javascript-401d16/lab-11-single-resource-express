
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

  describe('testing POST /api/heros', () => {
    it('should respond with 200', () => {
      return superagent.post(`${API_URL}/api/heros`)
      .send({power: 'giving epic sunburns',
        name: 'Don Oucho'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Don Oucho');
        expect(res.body.dateCreated).toExist();
        tempHero = res.body;
      });
    });

    it('should respond with 400', () => {
      superagent.post(`${API_URL}/api/heros`)
      .send(null)
      .then(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/heros', () => {
    it('should respond with 200', () => {
      // console.log(tempHero);

      return superagent.get(`${API_URL}/api/heros/${tempHero._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempHero._id);
        expect(res.body.name).toEqual('Don Oucho');
        expect(res.body.dateCreated).toEqual(tempHero.dateCreated);

      });
    });
    it('should respond with a 404', () => {
      // console.log(tempHero);
      superagent.get(`${API_URL}/api/heros/1234`)
      .then(err => {
        expect(err.status).toEqual(404);
        // expect(res.body._id).toEqual(tempHero._id);
        // expect(res.body.name).toEqual('Don Oucho');
        // expect(res.body.dateCreated).toEqual(tempHero.dateCreated);
        // console.log('AFTER GET ', tempHero);
      });
    });
  });

  describe('testing PUT /api/heros', () => {
    it('should respond with 200', () => {
      console.log(tempHero);

      superagent.put(`${API_URL}/api/heros/${tempHero._id}`)
      .send({power: 'large cat-like tongue, purrs loudly',
        name: 'Don Gato'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempHero._id);
        expect(res.body.name).toEqual('Don Gato');
        expect(res.body.power).toEqual('large cat-like tongue, purrs loudly');
        expect(res.body.dateCreated).toEqual(tempHero.dateCreated);
        tempHero.body = res.body;
      });
    });
  });

  describe('testing DELETE /api/heros', () => {
    console.log(tempHero);

    it('should delete the hero', () => {
      return superagent.delete(`${API_URL}/api/heros/${tempHero._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });
});
