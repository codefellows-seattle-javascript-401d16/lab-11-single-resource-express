'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const server = require('../lib/server.js');
const expect = require('expect');
const superagent = require('superagent');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempProfile;

describe('Testing profile routes\n', () => {
  before(server.start);
  after(server.stop);

  describe('Testing POST route at /api/profile', () => {
    describe('If successful', () => {
      it('it should respond with a new profile', () => {
        return superagent.post(`${API_URL}/api/profile`)
        .send({firstName: 'Scott', nickName: 'Dingo', age:25})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.firstName).toEqual('Scott');
          expect(res.body.nickName).toEqual('Dingo');
          expect(res.body.age).toEqual(25);
          expect(res.body._id).toExist();
          tempProfile = res.body;
          console.log(tempProfile._id);
        });
      });
    });
    describe('If passing in bad content', () =>{
      it('it should return with a 400', () => {
        return superagent.post(`${API_URL}/api/profile`)
        .send({firstName: 'Scott', nickName: 'Dingo', age:25})
        .then(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
    describe('If passing in a bad url path', () =>{
      it('it should return with a 404', () => {
        return superagent.post(`${API_URL}/api/notapath`)
        .send({firstName: 'Scott', nickName: 'Dingo', age:25})
        .then(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
  });



});
