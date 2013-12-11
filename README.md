[![Build Status](https://secure.travis-ci.org/alexfernandez/demo-deployment.png)](http://travis-ci.org/alexfernandez/demo-deployment)

# demo-deployment

A demo for the deployment package.

## Usage

Functionality is very simple: the addPath application runs on
  http://localhost:12322/
and adds the numbers in the path together. For instance:
  http://localhost:12322/5/6
should show '11'.

Just add some tests and add them to test.js. Then try them out with

    $ npm test

You can also add load tests and include them in test.js.

After all is said and done, just deploy to your favorite directory.

## License

This package is published under the MIT license, see the enclosed LICENSE
file for details.

