'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempProfile;

describe('testing profile routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/profiles', () => {
    it('should respond with a profile', () => {
      return superagent
        .post(`${API_URL}/api/profiles`)
        .send({
          firstName: 'stephanie',
          lastName: 'dover',
          employeeID: 'SDOVER'
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.firstName).toEqual('stephanie');
          expect(res.body.lastName).toEqual('dover');
          expect(res.body.employeeID).toEqual('SDOVER');
          expect(res.body.created).toExist();
          tempProfile = res.body;
        });
    });

    it('should respond with 400 invalid request body', () => {
      return superagent.post(`${API_URL}/api/profiles`).send().catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/profile', () => {
    it('should respond with a profile', () => {
      return superagent
        .get(`${API_URL}/api/profiles/${tempProfile._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.firstName).toEqual('stephanie');
          expect(res.body.lastName).toEqual('dover');
          expect(res.body.employeeID).toEqual('SDOVER');
          expect(res.body.created).toExist();
        });
    });
    it('should respond with a 404 not found', () => {
      return superagent.get(`${API_URL}/api/profiles/`).catch(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('testing PUT /api/profile', () => {
    it('should respond with a 200 and updated profile', () => {
      return superagent
        .put(`${API_URL}/api/profiles/${tempProfile._id}`)
        .send({
          firstName: 'millie',
          lastName: 'mills',
          employeeID: 'MMILLS'
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.firstName).toEqual('millie');
          expect(res.body.lastName).toEqual('mills');
          expect(res.body.employeeID).toEqual('MMILLS');
        });
    });
  });

  describe('testing DELETE /api/profile', () => {
    it('should respond with a 200', () => {
      return superagent
        .delete(`${API_URL}/api/profiles/${tempProfile._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toNotExist();
        });
    });
  });
});
