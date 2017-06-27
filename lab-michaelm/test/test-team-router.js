'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URI = `http://localhost:${process.env.PORT}`;
let tempTeam;

describe('Testing team routes', () => {
  before(server.start);
  after(server.stop);

  describe('Testing POST /api/team', () => {
    it('Should return a new team member', () => {
      return superagent.post(`${API_URI}/api/team`)
      .send({firstName: 'Michael', lastName: 'Miller', availabilityDates: ['2017-06-27', '2017-07-05']})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.firstName).toEqual('Michael');
        expect(res.body.lastName).toEqual('Miller');
        expect(res.body.availabilityDates).toEqual(['2017-06-27', '2017-07-05']);
        expect(res.body.submitted).toExist();
        tempTeam = res.body;
      });
    });
    it('Should respond with a 400 status code', () => {
      return superagent.post(`${API_URI}/api/team`)
      .send('{}')
      .catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('Testing GET /api/team', () => {
    it('Should return a team member', () => {
      return superagent.get(`${API_URI}/api/team/${tempTeam._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempTeam._id);
        expect(res.body.firstName).toEqual(tempTeam.firstName);
        expect(res.body.lastName).toEqual(tempTeam.lastName);
        expect(res.body.availabilityDates).toEqual(tempTeam.availabilityDates);
        expect(res.body.submitted).toEqual(tempTeam.submitted);
      });
    });
    it('Should respond with a 400 status code', () => {
      return superagent.get(`${API_URI}/api/team/65468468468546546846486846845`)
      .catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('Testing PUT /api/team', () => {
    it('Should return a changed team member', () => {
      return superagent.put(`${API_URI}/api/team/${tempTeam._id}`)
      .send({firstName: 'Rodney', lastName: 'Delaruth', availabilityDates: ['2017-07-02', '2017-07-09']})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempTeam._id);
        expect(res.body.firstName).toEqual('Rodney');
        expect(res.body.lastName).toEqual('Delaruth');
        expect(res.body.availabilityDates).toEqual(['2017-07-02', '2017-07-09']);
        expect(res.body.submitted).toExist();
        tempTeam = res.body;
      });
    });
    it('Should respond with a 400 status code', () => {
      return superagent.put(`${API_URI}/api/team`)
      .send({})
      .catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('Testing DELETE /api/team', () => {
    it('Should remove the specified team member', () => {
      return superagent.delete(`${API_URI}/api/team/${tempTeam._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });
});
