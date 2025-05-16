'use strict';

const dbMgmt = require('..');
const assert = require('assert').strict;

assert.strictEqual(dbMgmt(), 'Hello from dbMgmt');
console.info('dbMgmt tests passed');
