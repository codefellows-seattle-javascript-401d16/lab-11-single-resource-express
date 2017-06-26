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

  describe('test pOST /api/animals', () => {
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
      });
    });
  });
});
