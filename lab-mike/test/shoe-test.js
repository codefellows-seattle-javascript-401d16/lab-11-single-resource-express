'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;

let tempShoe;

describe('testing shoe routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/shoes', () => {
    it('should respond with a shoe', () => {
      return superagent.post(`${API_URL}/api/shoes`)
        .send({
          brand: 'nike',
          color: 'red',
          size: 13,
        })
        .then((res) => {
          console.log(res.body._id);
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.brand).toEqual('nike');
          expect(res.body.color).toEqual('red');
          expect(res.body.size).toEqual(13);
        });
    });
  });
});
