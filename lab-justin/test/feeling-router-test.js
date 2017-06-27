'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

// const API_URL = `http://localhost:${process.env.PORT}`;
const API_URL = process.env.API_URL;
let tempFeeling;

describe('testing routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/feeling', () => {
    it('should respond with a name, age and feeling', () => {
      return superagent.post(`${API_URL}/api/feeling`)
      .send({name: 'Justin', age: '23', feeling: 'Happy'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Justin');
        expect(res.body.age).toEqual('23');
        expect(res.body.feeling).toEqual('Happy');
        expect(res.body.created).toExist();
        tempFeeling = res.body;
      });
    });
    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/feeling`)
      .catch(err => {
        expect(err.status).toEqual(500);
      });
    });
  });

  describe('testing GET /api/feeling', () => {
    it('should respond with a name, age, and feeling', () => {
      return superagent.get(`${API_URL}/api/feeling/${tempFeeling._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempFeeling._id);
        expect(res.body.name).toEqual(tempFeeling.name);
        expect(res.body.age).toEqual(tempFeeling.age);
        expect(res.body.feeling).toEqual(tempFeeling.feeling);
        expect(res.body.created).toEqual(tempFeeling.created);
      });
    });
    it('should respond with a 404 not found', () => {
      superagent.get(`${API_URL}/api/feeling/6576720283`)
      .then(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('test PUT /api/feeling', () => {
    it('should respond with an updated feeling', () => {
      return superagent.put(`${API_URL}/api/feeling/${tempFeeling._id}`)
      .send({name: 'Justin', age: '23', feeling: 'Mad'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Justin');
        expect(res.body.age).toEqual('23');
        expect(res.body.feeling).toEqual('Mad');
        expect(res.body.created).toExist();
        tempFeeling = res.body;
      });
    });
  });

  describe('test DELETE /api/feeling', () => {
    it('should delete', () => {
      return superagent.delete(`${API_URL}/api/feeling/${tempFeeling._id}`)
      .send({name: 'Justin', age: 23, feeling: 'Mad'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({});
      });
    });
  });
});
