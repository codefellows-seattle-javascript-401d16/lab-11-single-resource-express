'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const Team = require('../model/team.js');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = process.env.API_URL;
let tempTeam;

describe('Testing team routes', () => {
  before(server.start);
  after(server.stop);

  describe('Testing POST /api/team', () => {
    after(() => Team.remove({}));
    let data = {
      firstName: 'Michael',
      lastName: 'Miller',
      availabilityDate: '07/02/2017',
    };
    it('Should return a new team member', () => {
      return superagent.post(`${API_URL}/api/team`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.firstName).toEqual(data.firstName);
        expect(res.body.lastName).toEqual(data.lastName);
        expect(res.body.availabilityDate).toEqual(data.availabilityDate);
      });
    });
    it('Should respond with a 400 status code', () => {
      return superagent.post(`${API_URL}/api/team`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('Should respond with a 409 status code', () => {
      return superagent.post(`${API_URL}/api/team`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('Testing GET /api/team:id', () => {
    let tempTeam;

    afterEach(() => Team.remove({}));

    beforeEach(() => {
      return new Team({
        firstName: 'Michael',
        lastName: 'Miller',
        availabilityDate: '07/02/2017',
      })
      .save( team => tempTeam = team);
    });
    it('Should respond with a team member', () => {
      return superagent.get(`${API_URL}/api/team/${tempTeam._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempTeam._id);
        expect(res.body.firstName).toEqual(tempTeam.firstName);
        expect(res.body.lastName).toEqual(tempTeam.lastName);
        expect(res.body.availabilityDate).toEqual(tempTeam.availabilityDate);
        expect(res.body.submitted).toExist();
      });
    });
  });

  describe('Testing PUT /api/team/:id', () => {
    let tempTeam;

    afterEach(() => Team.remove({}));

    beforeEach(() => {
      return new Team({
        firstName: 'Michael',
        lastName: 'Miller',
        availabilityDate: '07/02/2017',
      })
      .save( team => tempTeam = team);
    });
    it('Should respond with a team member', () => {
      return superagent.put(`${API_URL}/api/team/${tempTeam._id}`)
      .send({firstName: 'John'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempTeam._id);
        expect(res.body.firstName).toEqual('John');
        expect(res.body.lastName).toEqual(tempTeam.lastName);
        expect(res.body.availabilityDate).toEqual(tempTeam.availabilityDate);
        expect(res.body.submitted).toExist();
      });
    });
  });
  //
  // describe('Testing DELETE /api/team', () => {
  //   it('Should remove the specified team member', () => {
  //     return superagent.delete(`${API_URL}/api/team/${tempTeam._id}`)
  //     .then(res => {
  //       expect(res.status).toEqual(200);
  //     });
  //   });
  // });
});
