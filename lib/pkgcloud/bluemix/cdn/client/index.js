/*
 * client.js: client for bluemix CDN
 *
 */

var util = require('util'),
  bluemix = require('../../client'),
  urlJoin = require('url-join'),
  _ = require('underscore');

var Client = exports.Client = function (options) {
  bluemix.Client.call(this, options);

  this.models = {
    Service: require('../../../openstack/cdn/service').Service,
    Flavor: require('../../../openstack/cdn/flavor').Flavor
  };

  _.extend(this, require('../../../openstack/cdn/client/base'));
  _.extend(this, require('../../../openstack/cdn/client/services'));
  _.extend(this, require('../../../openstack/cdn/client/flavors'));

  this.serviceType = 'cdn';
};

util.inherits(Client, bluemix.Client);

/**
 * client._getUrl
 *
 * @description get the url for the current compute service
 *
 * @param options
 * @returns {exports|*}
 * @private
 */
Client.prototype._getUrl = function (options) {
  options = options || {};

  if (!this._serviceUrl) {
    throw new Error('Service url not found');
  }

  return urlJoin(this._serviceUrl,
      typeof options === 'string'
      ? options
      : options.path);
};
