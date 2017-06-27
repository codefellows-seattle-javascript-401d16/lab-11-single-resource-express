'use strict';

require('dotenv').config({path: `${__dirname}/../test/.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const API_URL = `http://localhost:${process.env.PORT}`;
let tempCar;

describe('testing car routes', () =>{
  before(server.start);
  after(server.stop);

  describe('test POST /api/cars', () => {
    it('should return a car with characteristics', () => {
      return superagent.post(`${API_URL}/api/cars`)
      .send({make: 'infiniti', model: 'g35', year: '2003', color: 'white', type:'coupe'})
      .then(res =>{
        expect(res.status).toEqual(200);
        expect(res.body.make).toEqual('infiniti');
        expect(res.body.model).toEqual('g35');
        expect(res.body.year).toEqual('2003');
        expect(res.body.color).toEqual('white');
        expect(res.body.type).toEqual('coupe');
        tempCar = res.body;
      });
    });
  });
  describe('test GET /api/cars', () => {
    it('should return a car with characteristics', () =>{
      return superagent.get(`${API_URL}/api/cars/${tempCar._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempCar._id);
        expect(res.body.make).toEqual('infiniti');
        expect(res.body.model).toEqual('g35');
        expect(res.body.year).toEqual('2003');
        expect(res.body.color).toEqual('white');
        expect(res.body.type).toEqual('coupe');
        expect(res.body.created).toEqual(tempCar.created);
      });
    });
  });
  describe('test PUT /api/cars', () =>{
    it('should return a car', () => {
      return superagent.put(`${API_URL}/api/cars/${tempCar._id}`)
      .send({color: 'black'})
      .then(res =>{
        expect(res.status).toEqual(200);
        expect(res.body.make).toEqual('infiniti');
        expect(res.body.model).toEqual('g35');
        expect(res.body.year).toEqual('2003');
        expect(res.body.color).toEqual('black');
        expect(res.body.type).toEqual('coupe');
        tempCar = res.body;
      });
    });
  });
  describe('test DELETE /api/cars', () =>{
    it('should delete a car', () => {
      return superagent.delete(`${API_URL}/api/cars/${tempCar._id}`)
      .then(res =>{
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(tempCar);
        tempCar = res.body;
      });
    });
  });
});
