'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempArticle;

describe('testing article routes', () => {
  before(server.start);
  after(server.stop);

//   describe('test POST /api/articles',() => {
//     it('should respond with an article', () => {
//       return superagent.post(`${API_URL}/api/articles`)
//       .send({content: 'got an epic sunburn'})
//       .then(res => {
//         expect(res.status).toEqual(200);
//         expect(res.body._id).toExist();
//         expect(res.body.content).toEqual('got an epic sunburn');
//         expect(res.body.created).toExist();
//         tempArticle = res.body;
//       });
//     });
//   });
//
//   describe('testing GET /api/note', () => {
//     it('should respond with a note', () => {
//       return superagent.get(`${API_URL}/api/articles/${tempArticle._id}`)
//       .then(res => {
//         expect(res.status).toEqual(200);
//         expect(res.body._id).toEqual(tempArticle._id);
//         expect(res.body.content).toEqual('got an epic sunburn');
//         expect(res.body.created).toEqual(tempArticle.created);
//       });
//     });
//   });
});
