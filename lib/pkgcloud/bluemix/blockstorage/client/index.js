/*
 * index.js: Cloud BlockStorage client for Bluemix
 *
 */

var util = require('util'),
    urlJoin = require('url-join'),
    bluemix = require('../../client'),
    _ = require('underscore');

var Client = exports.Client = function (options) {
  bluemix.Client.call(this, options);

  _.extend(this, require('../../../openstack/blockstorage/client/volumetypes'));
  _.extend(this, require('../../../openstack/blockstorage/client/snapshots'));
  _.extend(this, require('../../../openstack/blockstorage/client/volumes'));

  this.serviceType = 'volume';
};

util.inherits(Client, bluemix.Client);

Client.prototype._getUrl = function (options) {
  options = options || {};

  return urlJoin(this._serviceUrl,
    typeof options === 'string'
      ? options
      : options.path);

};
