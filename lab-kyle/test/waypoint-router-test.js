'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let temp;

describe('testing note routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/waypoints',() => {
    it('should respond with a new waypoint', () => {
      return superagent.post(`${API_URL}/api/waypoints`)
      .send({
        name: 'Cape Dissapointment',
        lat: 46.2779497,
        long: -124.0497145,
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Cape Dissapointment');
        expect(res.body.lat).toEqual(46.2779497);
        expect(res.body.long).toEqual(-124.0497145);
        temp = res.body;
      });
    });

    it('should respond with 400', () => {
      return superagent.post(`${API_URL}/api/waypoints`)
      .send({})
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/waypoints', () => {
    it('should respond with a waypoint', () => {
      return superagent.get(`${API_URL}/api/waypoints/${temp._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(temp._id);
        expect(res.body.name).toEqual('Cape Dissapointment');
        expect(res.body.lat).toEqual(46.2779497);
        expect(res.body.long).toEqual(-124.0497145);
      });
    });

    it('should respond with 404', () => {
      return superagent.get(`${API_URL}/api/foo`)
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('testing PUT /api/waypoints', () => {
    it('should respond with an updated waypoint', () => {
      return superagent.put(`${API_URL}/api/waypoints/${temp._id}`)
      .send({
        name: 'Tillamook Bay',
        lat: 45.5585123,
        long: -123.9201035,
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Tillamook Bay');
        expect(res.body.lat).toEqual(45.5585123);
        expect(res.body.long).toEqual(-123.9201035);
        temp = res.body;
      });
    });
  });
});
