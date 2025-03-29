'use strict';

const cronjobApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(cronjobApp(), 'Hello from cronjobApp');
console.info('cronjobApp tests passed');
