'use strict';

var EasypayResource = require('../EasypayResource');

module.exports = EasypayResource.extend({

  path: 'transfers',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],
});
