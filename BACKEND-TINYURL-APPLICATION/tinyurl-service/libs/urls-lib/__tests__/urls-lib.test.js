'use strict';

const urlsLib = require('..');
const assert = require('assert').strict;

assert.strictEqual(urlsLib(), 'Hello from urlsLib');
console.info('urlsLib tests passed');
