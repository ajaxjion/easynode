'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by easypay-node
 */
function _Error(_raw) {
    this.populate.apply(this, arguments);
    this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function (type, message) {
    this.type = type;
    this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Easypay's REST API)
 */
var EasypayError = _Error.EasypayError = _Error.extend({
    type: 'EasypayError',
    populate: function (raw) {
        // Move from prototype def (so it appears in stringified obj)
        this.type = this.type;

        this.stack = (new Error(raw.message)).stack;
        this.rawType = raw.type;
        this.code = raw.code;
        this.param = raw.param;
        this.message = raw.message;
        this.detail = raw.detail;
        this.raw = raw;
    }
});

/**
 * Helper factory which takes raw easypay errors and outputs wrapping instances
 */
EasypayError.generate = function (rawEasypayError) {
    switch (rawEasypayError.type) {
        case 'INVALID_REQUEST_ERROR':
            return new _Error.EasypayInvalidRequestError(rawEasypayError);
        case 'API_ERROR':
            return new _Error.EasypayAPIError(rawEasypayError);
        case 'CHANNEL_ERROR':
            return new _Error.EasypayChannelError(rawEasypayError);
        case 'BUSINESS_ERROR':
            return new _Error.EasypayAPIError(rawEasypayError);
    }

    return new _Error('Generic', 'Unknown Error');
};

// Specific Easypay Error types:
_Error.EasypayInvalidRequestError = EasypayError.extend({type: 'EasypayInvalidRequestError'});
_Error.EasypayAPIError = EasypayError.extend({type: 'EasypayAPIError'});
_Error.EasypayAuthenticationError = EasypayError.extend({type: 'EasypayAuthenticationError'});
_Error.EasypayConnectionError = EasypayError.extend({type: 'EasypayConnectionError'});
_Error.EasypayChannelError = EasypayError.extend({type: 'EasypayChannelError'});
_Error.EasypayRateLimitError = EasypayError.extend({type: 'EasypayRateLimitError'});
