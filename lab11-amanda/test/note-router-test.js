'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Note = require('../model/note.js');
const API_URL = `http://localhost:${process.env.PORT}`;
let tempNote;
let data = {name: 'amanda'};

describe('testing note routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/notes',() => {
    it('should respond with a noteand 200 status', () => {
      return superagent.post(`${API_URL}/api/notes`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual(data.name);
      });
    });
    it('should respond with 400', () => {
      return superagent.post(`${API_URL}/api/notes`)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  //GET
  describe('testing GET /api/note', () => {
    var tempNote;

    afterEach(() => Note.remove({}));
    beforeEach(() => {
      return new Note({name: 'Evan'})
    .save()
    .then(note => {
      tempNote = note;
    });
    });

    it('should respond with a note', () => {
      return superagent.get(`${API_URL}/api/notes/${tempNote._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempNote._id);
        expect(res.body.name).toEqual(tempNote.name);
      });
    });
  });

  // //404
  // describe('testing DELETE /api/note', () => {
  //   it('should delete a note', () => {
  //     return superagent.get(`${API_URL}/no/id`)
  //   .then(err => {
  //     expect(err.status).toBe(404);
  //   });
  //   });
  // });

//PUT
  describe('testing PUT /api/notes/:id', () => {
    afterEach(() => Note.remove({}));
    beforeEach(() => {
      return new Note({name: 'Patricia',
      })
    .save()
    .then(note => {
      tempNote = note;
    });
    });

    it('should respond with a note', () => {
      let newName = {
        name: 'Evan',
      };
      return superagent.put(`${API_URL}/api/notes/${tempNote._id}`)
      .send(newName)
      .then(res => {
        console.log(res.body.name);
        console.log('temp name', tempNote.name);
        // console.log(note.name);
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempNote._id);
        expect(res.body.name).toEqual(newName.name);
      });
    });

    it('should respond with 404', () => {
      // console.log('tempNote', tempNote);
      return superagent.put(`${API_URL}/api/notes/${tempNote._id}`)
    .send({name: 'nada'})
    .catch(res => {
      expect(res.status).toEqual(404);
    });
    });
  });
});


// // DELETE
// describe('testing DELETE /api/note', () => {
//   it('should reposnd with a deleted note', () => {
//     return superagent.delete(`${API_URL}/api/notes/${tempNote}`);
//   });
// });
