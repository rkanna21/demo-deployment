'use strict';

/**
 * Integration test.
 * (C) 2013 Alex Fernández.
 */


// requires
var http = require('http');
var testing = require('testing');
var Log = require('log');
var serverLib = require('./server.js');

// globals
var log = new Log('info');

// constants
var TEST_PORT = 12321;


/**
 * Run an integrated test.
 */
function testIntegrated(callback)
{
	log.info('Integration test');
	var server = serverLib.start(TEST_PORT, function()
	{
		var url = 'http://localhost:' + TEST_PORT + '/8/8';
		http.get(url, function(response)
		{
			testing.assertEquals(response.statusCode, 200, 'Invalid status code', callback);
			response.on('data', function(chunk)
			{
				testing.assertEquals(String(chunk), '16', 'Invalid data', callback);
				server.close(callback);
			});
		}).on('error', function(error)
		{
			testing.fail('Could not get %s: %s', url, error, callback);
		});
	});
}

/**
 * Run all tests.
 */
exports.test = function(callback)
{
	testing.run({
		integrated: testIntegrated,
	}, 2000, callback);
};

// start test if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

