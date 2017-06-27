'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempRecord;

describe('testing record routes', () => {
  before(server.start);
  after(server.stop);

  describe('testing post to /api/records/', () => {
    it('should respond with a new record', () => {
      return superagent.post(`${API_URL}/api/records`)
      .send({title: 'something', artist: 'artist'})
      .then(res => {
        expect(res.status).toEqual(200);
        tempRecord = res.body;
      });
    });
  });
  describe('testing get by id to /api/records/', () => {
    it('should respond with the record by id', () => {
      return superagent.get(`${API_URL}/api/records/${tempRecord._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.artist).toEqual(tempRecord.artist);
        expect(res.body.title).toEqual(tempRecord.title);
        expect(res.body.created).toExist();
      });
    });
  });
  describe('testing get by id to /api/records/', () => {
    it('should respond with an array of all ids', () => {
      return superagent.get(`${API_URL}/api/records/`)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
    });
  });
  describe('testing put by id to /api/records/', () => {
    it('should respond with updated record by id', () => {
      return superagent.put(`${API_URL}/api/records/${tempRecord._id}`)
      .send({title: 'updatedsomething', artist:'updatedartist'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.artist).toEqual('updatedartist');
        expect(res.body.title).toEqual('updatedsomething');
        expect(res.body.created).toExist();
      });
    });
  });
  describe('testing delete by id to /api/records/', () => {
    it('should delete the record by id', () => {
      return superagent.delete(`${API_URL}/api/records/${tempRecord._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({});
        expect(res.body.artist).toEqual(undefined);
        expect(res.body.title).toEqual(undefined);
      });
    });
  });
  describe('testing to make sure that routes that do not exist return a 404', () => {
    it('should return a 404', () => {
      superagent.get(`${API_URL}/api/is/not/a/thing`)
      .then((err) => {
        expect(err.status).toBe(404);
      });
    });
  });
});
