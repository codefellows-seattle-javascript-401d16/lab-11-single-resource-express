'use strict';

const dotEnv = require('dotenv').config();

const server = require('./lib/server.js');

//start the server
server.start();
