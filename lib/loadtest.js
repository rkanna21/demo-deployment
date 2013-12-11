'use strict';

/**
 * Load test the server.
 * (C) 2013 Alex Fernández.
 */


// requires
var loadtest = require('loadtest');
var testing = require('testing');
var util = require('util');
var Log = require('log');
var serverLib = require('./server.js');

// globals
var log = new Log('info');

// constants
var TEST_PORT = 12321;


/**
 * Run a load test.
 */
function testLoad(callback)
{
	var server = serverLib.start(TEST_PORT, function()
	{
		var options = {
			url: 'http://localhost:' + TEST_PORT + '/8',
				maxRequests: 1000,
			concurrency: 10,
			method: 'POST',
			body: {
				hi: 'there',
			},
		};
		loadtest.loadTest(options, function(error, result)
		{
			if (error)
			{
				return callback(error);
			}
			log.info('Latency results: %s', util.inspect(result));
			testing.assertEquals(result.totalRequests, 1000, 'Not enough requests received', callback);
			testing.assert(result.meanLatencyMs < 12, 'Invalid latency ' + result.meanLatencyMs, callback);
			server.close(callback);
		});
	});
}

/**
 * Run all tests.
 */
exports.test = function(callback)
{
	testing.run({
		load: testLoad,
	}, 2000, callback);
};

// start load test if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

