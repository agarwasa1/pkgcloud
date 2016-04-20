/*
 * client.js: Compute client for Bluemix Clouds

 */

var util = require('util'),
    urlJoin      = require('url-join'),
    base = require('../../../core/base'),
    _ = require('underscore');

var Client = exports.Client = function (opts) {
  if (!opts || !opts.serversUrl) {
    throw new TypeError('serversUrl is required');
  }

  base.Client.call(this, opts);

  this.provider = 'bluemix';
  _.extend(this, require('./clouds'));
  this.serviceType = 'cloud';
  this.protocol = opts.protocol || 'https://';
  this.serversUrl = opts.serversUrl;

  if (!this.before) {
    this.before = [];
  }

  this.before.push(function (req) {
    req.json = true;
    req.headers['Content-Type'] = 'application/json';
  });

  this.before.push(function setAuth(req) {
    req.headers = req.headers || {};
    req.headers.Authorization = [
      'bearer', opts.bearerToken
    ].join(' ');
  });
};

util.inherits(Client, base.Client);

Client.prototype._getUrl = function (options) {
  return urlJoin(this.serversUrl, options.path);
};

Client.prototype.failCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Resize not allowed',
  404: 'Item not found',
  409: 'Build in progress',
  413: 'Over Limit',
  415: 'Bad Media Type',
  422: 'Unprocessable Entity',
  500: 'Fault',
  503: 'Service Unavailable'
};

Client.prototype.successCodes = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-authoritative information',
  204: 'No content'
};