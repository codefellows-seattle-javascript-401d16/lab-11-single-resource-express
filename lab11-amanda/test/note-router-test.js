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
    let data = {name: 'amanda'};
    it('should respond with a note and 200 status', () => {
      return superagent.post(`${API_URL}/api/notes`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual(data.name);
        // tempNote = res.body; //do I need this?
        });
    });
    it('should respond with 400', () => {
      superagent.post(`${API_URL}/api/notes`)
        .catch(err => {
          expect(err.status).toEqual(400);
        });
    });
  });

  //GET
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

  //404
  describe('testing DELETE /api/note', () => {
    it('should delete a note', () => {
      superagent.get(`${API_URL}/no/id`)
        .then(err => {
          expect(err.status).toBe(404);
        });
    });
  });

  //PUT
  describe('testing PUT /api/note', () => {
    it('should respond with an updated note', () => {
      return superagent.delete(`${API_URL}/api/notes/${tempNote._id}`)
        .then(res => {
          expect(res.staus).toEqual(200);
          expect(res.body).toEqual({});
          expect(res.body.name).toEqual('deleted name');
          expect(res.body.created).toEqual(undefined);
        });
    });
  });
});

//DELETE
// describe('testing DELETE /api/note', () => {
//   it('should reposnd with a deleted note', () => {
//     return superagent.delete(`${API_URL}/api/notes/${tempNote}`)
//   })
// })
