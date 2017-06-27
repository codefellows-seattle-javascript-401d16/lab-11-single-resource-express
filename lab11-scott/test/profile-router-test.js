'use strict';

require('dotenv').config({path: ${__dirname}/../.test.env});
const server = require('../lib/server.js');
const expect = require('expect');
const superagent = require('superagent');

const API_URL = 'http://localhost:${process.env.PORT}';
let tempProfile;

describe('Testing profile routes', () => {
  before(server.start);
  after(server.stop)

  describe('Testing POST route', () =>{
    describe('If successful' () =>{
      it('it should return a new profile', () => {
        superagent.post(`${API_URL}/api/profile`)
        .send({firstName: 'Scott', nickName: 'Dingo', age:25})
        .then(res => {
          expect(res.status).toEqual(202);
          expect(res.body.firstName).toEqual('Scott');
          expect(res.body.nickName).toEqual('Dingo');
          expect(res.body.age).toEqual(25);
          expect(res.body._id).toExist();
          tempProfile = res.body;
        });
      });
    });
    describe('If passing in bad content' () =>{
      it('it should return with a 400', () => {
        superagent.post(`${API_URL}/api/profile`)
        .send({firstName: 'Scott', nickName: 'Dingo', age:25})
        .then(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
    describe('If passing in a bad url path' () =>{
      it('it should return with a 404', () => {
        superagent.post(`${API_URL}/api/notapath`)
        .send({firstName: 'Scott', nickName: 'Dingo', age:25})
        .then(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
  });



});;
