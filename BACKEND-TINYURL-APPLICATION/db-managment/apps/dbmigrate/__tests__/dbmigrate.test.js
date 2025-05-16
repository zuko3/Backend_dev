'use strict';

const dbmigrate = require('..');
const assert = require('assert').strict;

assert.strictEqual(dbmigrate(), 'Hello from dbmigrate');
console.info('dbmigrate tests passed');
