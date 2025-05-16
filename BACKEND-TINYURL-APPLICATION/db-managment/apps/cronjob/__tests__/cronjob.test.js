'use strict';

const cronjob = require('..');
const assert = require('assert').strict;

assert.strictEqual(cronjob(), 'Hello from cronjob');
console.info('cronjob tests passed');
