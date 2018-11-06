'use strict';

Easypay.DEFAULT_HOST = '120.79.83.49';
Easypay.DEFAULT_PORT = '8766';
Easypay.DEFAULT_PROTOCOL = 'http';
// Easypay.DEFAULT_PORT = '443';
// Easypay.DEFAULT_PROTOCOL = 'https';
Easypay.DEFAULT_BASE_PATH = '/v1/';
Easypay.DEFAULT_API_VERSION = null;

Easypay.DEFAULT_TIMEOUT = require('http').createServer().timeout;

Easypay.PACKAGE_VERSION = require('../package.json').version;

Easypay.USER_AGENT = {
    bindings_version: Easypay.PACKAGE_VERSION,
    lang: 'node',
    lang_version: process.version,
    platform: process.platform,
    publisher: 'easypay',
    uname: null
};

Easypay.USER_AGENT_SERIALIZED = null;

var exec = require('child_process').exec;

var resources = {
    Charges: require('./resources/Charges'),
    Transfers: require('./resources/Transfers'),
};

var _ = require('lodash');
var HEADERS_TO_PARSE = ['Easypay-One-Version', 'Easypay-Sdk-Version'];
var fs = require('fs');

Easypay.EasypayResource = require('./EasypayResource');
Easypay.resources = resources;

function Easypay(key, version) {
    if (!(this instanceof Easypay)) {
        return new Easypay(key, version);
    }

    this._api = {
        protocol: Easypay.DEFAULT_PROTOCOL,
        auth: null,
        host: Easypay.DEFAULT_HOST,
        port: Easypay.DEFAULT_PORT,
        basePath: Easypay.DEFAULT_BASE_PATH,
        version: Easypay.DEFAULT_API_VERSION,
        timeout: Easypay.DEFAULT_TIMEOUT,
        dev: false
    };

    this._parsedHeaders = {};
    this._privateKey = null;

    this._prepResources();
    this._prepExtraFuncs();
    this.setApiKey(key);
    this.setApiVersion(version);
}

Easypay.prototype = {

    setHost: function (host, port, protocol) {
        this._setApiField('host', host);
        if (port) this.setPort(port);
        if (protocol) this.setProtocol(protocol);
    },

    setProtocol: function (protocol) {
        this._setApiField('protocol', protocol.toLowerCase());
    },

    setPort: function (port) {
        this._setApiField('port', port);
    },

    setApiVersion: function (version) {
        if (version) {
            this._setApiField('version', version);
        }
    },

    setApiKey: function (key) {
        if (key) {
            this._setApiField(
                'auth',
                'Basic ' + key
            );
        }
    },

    setAppID: function (id) {
        if (id) {
            this._setApiField(
                'appID',
                id
            );
        }
    },

    setTimeout: function (timeout) {
        this._setApiField(
            'timeout',
            timeout == null ? Easypay.DEFAULT_TIMEOUT : timeout
        );
    },

    _setApiField: function (key, value) {
        this._api[key] = value;
    },

    getApiField: function (key) {
        return this._api[key];
    },

    getConstant: function (c) {
        return Easypay[c];
    },

    getClientUserAgent: function (cb) {
        if (Easypay.USER_AGENT_SERIALIZED) {
            return cb(Easypay.USER_AGENT_SERIALIZED);
        }
        exec('uname -a', function (err, uname) {
            Easypay.USER_AGENT.uname = uname || 'UNKNOWN';
            Easypay.USER_AGENT_SERIALIZED = JSON.stringify(Easypay.USER_AGENT);
            cb(Easypay.USER_AGENT_SERIALIZED);
        });
    },

    setPrivateKey: function (privateKey) {
        this._privateKey = privateKey;
    },

    getPrivateKey: function () {
        return this._privateKey;
    },

    setPrivateKeyPath: function (path) {
        this._privateKey = fs.readFileSync(path, 'utf8');
    },

    _prepResources: function () {

        for (var name in resources) {
            this[
            name[0].toLowerCase() + name.substring(1)
                ] = new resources[name](this);
        }
    },

    _setParsedHeader: function (key, value) {
        this._parsedHeaders[key] = value;
    },

    getParsedHeaders: function () {
        return this._parsedHeaders;
    },

    _prepExtraFuncs: function () {
        var self = this;
        this['parseHeaders'] = function (headers) {
            if (typeof headers == 'undefined') {
                return;
            }
            for (var k in headers) {
                var key = _.startCase(k.toLowerCase()).replace(/\s/g, '-');
                if (_.indexOf(HEADERS_TO_PARSE, key) != -1) {
                    self._setParsedHeader(key, headers[k]);
                }
            }
        };
    }
};

module.exports = Easypay;
