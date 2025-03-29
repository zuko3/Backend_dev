'use strict';

const dbmigrateApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(dbmigrateApp(), 'Hello from dbmigrateApp');
console.info('dbmigrateApp tests passed');
