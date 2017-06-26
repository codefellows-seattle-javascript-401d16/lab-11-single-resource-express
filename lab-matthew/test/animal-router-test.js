'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempAnimal;

describe('testing animal routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/animals', () => {
    it('should respond with an animal', () => {
      return superagent.post(`${API_URL}/api/animals`)
      .send({name: 'Gato', species: 'Cat', class: 'Shadow Knight'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Gato');
        expect(res.body.species).toEqual('Cat');
        expect(res.body.class).toEqual('Shadow Knight');
        expect(res.body.created).toExist();
        tempAnimal = res.body;
        console.log(tempAnimal);
      });
    });
  });

  describe('testing GET /api/animals', () => {
    it('should respond with an animal', () => {
      return superagent.get(`${API_URL}/api/animals/${tempAnimal._id}`)
      .then(res => {
        // console.log('tempAnimal', tempAnimal);
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempAnimal._id);
        expect(res.body.name).toEqual(tempAnimal.name);
        expect(res.body.species).toEqual(tempAnimal.species);
        expect(res.body.class).toEqual(tempAnimal.class);
        expect(res.body.created).toEqual(tempAnimal.created);
      });
    });
  });

  describe('test PUT /api/animals', () => {
    it('should respond with a modified animal', () => {
      return superagent.put(`${API_URL}/api/animals/${tempAnimal._id}`)
      .send({name: 'Gato', species: 'Cat', class: 'El Gato Diablo'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Gato');
        expect(res.body.species).toEqual('Cat');
        expect(res.body.class).toEqual('El Gato Diablo');
        expect(res.body.created).toExist();
        tempAnimal = res.body;
        console.log(tempAnimal);
      });
    });
  });

  describe('test DELETE /api/animals', () => {
    it('should delete specified animal', () => {
      console.log('animal before delete', tempAnimal);
      return superagent.delete(`${API_URL}/api/animals/${tempAnimal._id}`)
      .send({name: 'Gato', species: 'Cat', class: 'El Gato Diablo'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({});
      });
    });
  });
});
