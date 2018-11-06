'use strict';

var EasypayResource = require('../EasypayResource');
var Error = require('../Error');
var easypayMethod = EasypayResource.method;
var hasOwn = {}.hasOwnProperty;

module.exports = EasypayResource.extend({

    path: 'charges',

    includeBasic: [
        'create', 'retrieve'
    ],

    list: function (params, callback) {
        return this.wrapTimeout(easypayMethod({
            method: 'GET'
        }).call(this, params), callback);
    },

    reverse: easypayMethod({
        method: 'POST',
        path: '/{chargeId}/reverse',
        urlParams: ['chargeId'],
    }),

    /**
     * Charge: Refund methods
     */
    createRefund: easypayMethod({
        method: 'POST',
        path: '/{chargeId}/refunds',
        urlParams: ['chargeId'],
    }),

    listRefunds: easypayMethod({
        method: 'GET',
        path: '/{chargeId}/refunds',
        urlParams: ['chargeId']
    }),

    retrieveRefund: easypayMethod({
        method: 'GET',
        path: '/{chargeId}/refunds/{refundId}',
        urlParams: ['chargeId', 'refundId']
    }),

});
