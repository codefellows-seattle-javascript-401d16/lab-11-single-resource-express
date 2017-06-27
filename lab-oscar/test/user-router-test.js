'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL =  `http://localhost:${process.env.PORT}`;

let tempUser;

describe('testing user routes', ()=>{
  before(server.start);
  after(server.stop);

  describe('testing routes that don\'t exists', () => {
    it('should respond with 404', () => {
      return superagent.get(`${API_URL}/dont/exists`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('test POST /api/user', () =>{
    it('should respond with a user', () =>{
      return superagent.post(`${API_URL}/api/user`)
        .send({fname: 'oscar', lname: 'cauich'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.fname).toEqual('oscar');
          expect(res.body.lname).toEqual('cauich');
          tempUser = res.body;
        });
    });
  });

  describe('testing GET /api/user', () => {
    it('should respond with a user', () => {
      return superagent.get(`${API_URL}/api/user/${tempUser._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempUser._id);
          expect(res.body.fname).toEqual('oscar');
          expect(res.body.lname).toEqual('cauich');
        });
    });
  });
  describe('testing PUT /api/user', () => {
    it('should update user', () => {
      return superagent.put(`${API_URL}/api/user/${tempUser._id}`)
        .send({fname: 'jorge', lname: 'lopez'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempUser._id);
          expect(res.body.fname).toEqual('jorge');
          expect(res.body.lname).toEqual('lopez');
          tempUser = res.body;
        });
    });
  });
  describe('testing DELETE /api/user', () =>{
    it('should delete a user', () => {
      return superagent.delete(`${API_URL}/api/user/${tempUser._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({});
        });
    });
  });
});
