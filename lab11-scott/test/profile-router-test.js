'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
//npm modules
const expect = require('expect');
const superagent = require('superagent');
//app modules
const server = require('../lib/server.js');
const Profile = require('../model/profile.js');

const API_URL = process.env.API_URL;

let tempProfile;

describe('Testing profile routes\n', () => {
  before(server.start);
  after(server.stop);

  describe('Testing POST route at /api/profile', () => {
    after(() => Profile.remove({})); //this will remove all profiles after the test is ran
    let data = {
      firstName: 'Scott',
      nickName: 'Dingo',
      age: 25,
    };
    describe('If successful', () => {
      it('it should respond with a new profile', () => {
        return superagent.post(`${API_URL}/api/profile`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.firstName).toEqual('Scott');
          expect(res.body.nickName).toEqual('Dingo');
          expect(res.body.age).toEqual(25);
          expect(res.body._id).toExist();
        });
      });
    });
    describe('If passing in bad content', () =>{
      it('it should return with a 400', () => {
        return superagent.post(`${API_URL}/api/profile`)
        .send()
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
    describe('If passing in a bad url path', () =>{
      it('it should return with a 404', () => {
        return superagent.post(`${API_URL}/api/notapath`)
        .send({firstName: 'Scott', nickName: 'Dingo', age:25})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
    describe('If passing in a nickName which is not uniqe to the db', () =>{
      it('it should return with a 409', () => {
        return superagent.post(`${API_URL}/api/profile`)
        .send(data)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
      });
    });
  });

  describe('Testing GET /api/profile/:id', () => {
    //after/before each does it before each IT block.
    afterEach(() => Profile.remove({}));
    beforeEach(() => {
      return new Profile({
        firstName: 'Scott',
        nickName: 'Dingo',
        age: 25,
      })
      .save()
      .then(profile => tempProfile = profile);
    });
    describe('When GET is successful', () => {
      it('it should return a profile', () => {
        superagent.get(`${API_URL}/api/profile/${tempProfile._id}`)
        .then(res => {
          expect(res.firstName).toEqual(tempProfile.firstName);
          expect(res.nickName).toEqual(tempProfile.nickName);
          expect(res.age).toEqual(tempProfile.age);
        });
      });
    });
    describe('When passing in a bad id', () => {
      it('it should return a 404 status', () => {
        superagent.get(`${API_URL}/api/profile/23432`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  });

  describe('Testing PUT /api/profile/:id', () => {
    //after/before each does it before each IT block.
    afterEach(() => Profile.remove({}));
    beforeEach(() => {
      return new Profile({
        firstName: 'Scott',
        nickName: 'Dingo',
        age: 25,
      })
      .save()
      .then(profile => tempProfile = profile);
    });
    describe('When PUT is successful', () => {
      it('it should return a profile', () => {
        superagent.put(`${API_URL}/api/profile/${tempProfile._id}`)
        .send({nickName: 'fiddleSticks'})
        .then(res => {
          expect(res.nickName).toEqual('fiddleSticks');
        });
      });
    });
  });

  describe('Testing DELETE /api/profile/:id', () => {
    //after/before each does it before each IT block.
    afterEach(() => Profile.remove({}));
    beforeEach(() => {
      return new Profile({
        firstName: 'Scott',
        nickName: 'Dingo',
        age: 25,
      })
      .save()
      .then(profile => tempProfile = profile);
    });
    describe('When DELETE is successful', () => {
      it('it should return a 204 status with no content', () => {
        superagent.delete(`${API_URL}/api/profile/${tempProfile._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
      });
    });
  });


});
