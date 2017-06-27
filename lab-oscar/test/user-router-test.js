'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL =  `http://localhost:${process.env.PORT}`;

let tempNote;

describe('testing user routes', ()=>{
  before(server.start);
  after(server.stop);

  describe('test POST /api/user', () =>{
    it('should respond with a user', () =>{
      return superagent.post(`${API_URL}/api/user`)
        .send({fname: 'oscar', lname: 'cauich'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.fname).toEqual('oscar');
          expect(res.body.lname).toEqual('cauich');
          tempNote = res.body;
        });
    });
  });
});
