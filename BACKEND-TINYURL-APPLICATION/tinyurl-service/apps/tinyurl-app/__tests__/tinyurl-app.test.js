'use strict';

const tinyurlApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(tinyurlApp(), 'Hello from tinyurlApp');
console.info('tinyurlApp tests passed');
