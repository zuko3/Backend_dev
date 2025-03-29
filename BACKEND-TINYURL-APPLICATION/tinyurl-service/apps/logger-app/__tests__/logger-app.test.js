'use strict';

const loggerApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(loggerApp(), 'Hello from loggerApp');
console.info('loggerApp tests passed');
