'use strict';

/**
 * Main demo.
 * (C) 2013 Alex Fernández.
 */


// requires
var server = require('./lib/server.js');
var Log = require('log');

// globals
var log = new Log('info');


// start server if invoked directly
if (__filename == process.argv[1])
{
	server.start();
}

