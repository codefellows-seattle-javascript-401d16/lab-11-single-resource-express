'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempNote;

describe('testing note routes', () =>{
  before(server.start);
  after(server.stop);

  describe('test POST /api/notes', () => {
    it('should respond with a note', () => {
      return superagent.post(`${API_URL}/api/notes`)
      .send({content:'first test'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.content).toEqual('first test');
        expect(res.body.created).toExist();
        tempNote = res.body;
      });
    });
  });

  describe('testing GET /api/note', () => {
    it('should respong with a note', () => {
      return superagent.get(`${API_URL}/api/notes/${tempNote._id}`)
    .then(res => {
      expect(res.body.status).toEqual(200);
      expect(res.body._id).toEqual(tempNote._id);
      expect(res.body.content).toEqual('first test');
      expect(res.body.created).toEqual(tempNote.created);
    });
    });
  });
});
