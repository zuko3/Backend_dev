'use strict';

const authLib = require('..');
const assert = require('assert').strict;

assert.strictEqual(authLib(), 'Hello from authLib');
console.info('authLib tests passed');
