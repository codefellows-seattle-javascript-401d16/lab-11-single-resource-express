'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const API_URL = `http://localhost:${process.env.PORT}`;
let tempNote;

describe('testing note routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/notes',() => {
    it('should respond with a note', () => {
      return superagent.post(`${API_URL}/api/notes`)
      .send({name: 'amanda'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('amanda');
        tempNote = res.body;
      });
    });
  });

  describe('testing GET /api/note', () => {
    it('should respond with a note', () => {
      return superagent.get(`${API_URL}/api/notes/${tempNote._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempNote._id);
        expect(res.body.name).toEqual('amanda');
      });
    });
  });
});

describe('testing PUT /api/note', () => {
  it('should respond with an updated note', () => {
    return superagent.put(`${API_URL}/api/notes/${tempNote._id}`)
    .then(res => {
      expect(res.staus).toEqual(200);
      expect(res.body.id).toEqual(tempNote._id);
      expect(res.body.name).toEqual('patricia');
      tempNote = res.body;
    });
  });
});
//
// describe('testing DELETE /api/note', () => {
//   it('should reposnd with a deleted note', () => {
//     return superagent.delete(`${API_URL}/api/notes/${tempNote}`)
//   })
// })
