'use strict';

require('dotenv').config({path: '__dirname/../.test.env'});
const request = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.test.env}`;
let tempBeer

describe('testing beer routes', () => {
  before(server.start);
  after(server.stop);
});
