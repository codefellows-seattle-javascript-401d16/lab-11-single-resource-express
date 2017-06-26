'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
// const Seahawk = require('../model/seahawk.js');
// const fs = require('fs-extra');

const API_URL = `http://localhost:${process.env.PORT}/api`;

describe('/api/seahawks routes', () => {
  let tempSeahawk;

  before(server.start);
  after(server.stop);

  describe('testing POST /api/seahawks', () => {
    it('Should respond with the posted player', () => {
      return superagent.post(`${API_URL}/seahawks`)
        .send({name: 'Russell Wilson', height: `6'11"`, weight: 500, position: 'QB', picture: 'testpic/pic.png'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.height).toEqual('6\'11"');
          expect(res.body.weight).toEqual(500);
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
        });
    });
  });

  describe('testing GET /api/note/:id', () => {
    it('Should respond with a seahawk', () => {
      return superagent.get(`${API_URL}/seahawks/${tempSeahawk._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempSeahawk._id);
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.height).toEqual(`6'11"`);
          expect(res.body.weight).toEqual(500);
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
        });
    });
  });

  // describe('Seahawk Constructor', () => {
  //   it('Should return a Seahawk Object', done => {
  //     new Seahawk('Spencer Gietzen', '5\'10"', '150', 'TB', 'rand/pic.png')
  //       .save()
  //       .then(data => {
  //         expect(data.id).toExist();
  //         expect(data.name).toEqual('Spencer Gietzen');
  //         expect(data.height).toEqual('5\'10"');
  //         expect(data.weight).toEqual('150');
  //         expect(data.position).toEqual('TB');
  //         expect(data.picture).toEqual('rand/pic.png');
  //         done();
  //       });
  //   });
  // });
  //
  // describe('POST', () => {
  //   it('Should respond 201 with stringified JSON of the player posted', done => {
  //     superagent.post(`${API_URL}/seahawks`)
  //       .send({name: 'Russell Wilson', height: '6\'11"', weight: '500', position: 'QB', picture: 'testpic/pic.png'})
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).toEqual(201);
  //         expect(res.body.id).toExist();
  //         expect(res.body.name).toEqual('Russell Wilson');
  //         expect(res.body.height).toEqual('6\'11"');
  //         expect(res.body.weight).toEqual('500');
  //         expect(res.body.position).toEqual('QB');
  //         expect(res.body.picture).toEqual('testpic/pic.png');
  //         tempSeahawk = res.body;
  //         done();
  //       });
  //   });
  //   it('Should respond 400', done => {
  //     superagent.post(`${API_URL}/seahawks`)
  //       .send({})
  //       .end((err, res) => {
  //         expect(res.status).toEqual(400);
  //         done();
  //       });
  //   });
  // });
  // describe('GET', () => {
  //   it('Should respond 200 with a Seahawk', done => {
  //     superagent.get(`${API_URL}/seahawks?id=${tempSeahawk.id}`)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).toEqual(200);
  //         expect(res.body.id).toExist();
  //         expect(res.body.name).toEqual('Russell Wilson');
  //         expect(res.body.height).toEqual('6\'11"');
  //         expect(res.body.weight).toEqual('500');
  //         expect(res.body.position).toEqual('QB');
  //         expect(res.body.picture).toEqual('testpic/pic.png');
  //         tempSeahawk = res.body;
  //         done();
  //       });
  //   });
  //   it('Should respond 400', done => {
  //     superagent.get(`${API_URL}/seahawks`)
  //       .end((err, res) => {
  //         expect(res.status).toEqual(400);
  //         done();
  //       });
  //   });
  //   it('Should respond 404', done => {
  //     superagent.get(`${API_URL}/seahawks?id=142`)
  //       .end((err, res) => {
  //         expect(res.status).toEqual(404);
  //         done();
  //       });
  //   });
  // });
  // describe('PUT', () => {
  //   it('Should respond 202', done => {
  //     superagent.put(`${API_URL}/seahawks?id=${tempSeahawk.id}`)
  //       .send({name: 'Russell Hawk', height: '6\'12"', weight: '185', position: 'QB', picture: 'testpic/pic.png'})
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).toEqual(202);
  //         expect(res.body.id).toEqual(tempSeahawk.id);
  //         expect(res.body.name).toEqual('Russell Hawk');
  //         expect(res.body.height).toEqual('6\'12"');
  //         expect(res.body.weight).toEqual('185');
  //         expect(res.body.position).toEqual('QB');
  //         expect(res.body.picture).toEqual('testpic/pic.png');
  //         tempSeahawk = res.body;
  //         done();
  //       });
  //   });
  //   it('Should respond 400', done => {
  //     superagent.put(`${API_URL}/seahawks`)
  //       .send({})
  //       .end((err, res) => {
  //         expect(res.status).toEqual(400);
  //         done();
  //       });
  //   });
  //   it('Should respond 404', done => {
  //     superagent.put(`${API_URL}/seahawks?id=999999`)
  //     .send({name: 'Russell Wilson', height: '6\'12"', weight: '185', position: 'QB', picture: 'testpic/pic.png', id: 9999999})
  //     .end((err, res) => {
  //       expect(res.status).toEqual(404);
  //       done();
  //     });
  //   });
  // });
  // describe('DELETE', () => {
  //   it('Should respond 204', done => {
  //     superagent.delete(`${API_URL}/seahawks?id=${tempSeahawk.id}`)
  //       .end((err, res) => {
  //         expect(res.status).toEqual(204);
  //         done();
  //       });
  //   });
  //   it('Should respond 400', done => {
  //     superagent.delete(`${API_URL}/seahawks`)
  //       .send({})
  //       .end((err, res) => {
  //         expect(res.status).toEqual(400);
  //         done();
  //       });
  //   });
  //   it('Should respond 404', done => {
  //     superagent.delete(`${API_URL}/seahawks?id=9999999`)
  //       .end((err, res) => {
  //         expect(res.status).toEqual(404);
  //         done();
  //       });
  //   });
  // });
});
