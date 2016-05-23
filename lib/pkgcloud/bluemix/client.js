/*
 * client.js: Base client from which all Bluemix clients inherit from
 *
 */

var util = require('util'),
    identity = require('./identity'),
    base = require('../openstack/client'),
    _ = require('underscore');

var Client = exports.Client = function (options) {
  options = options || {};
  options.identity = identity.Identity;
  if (typeof options.useServiceCatalog === 'undefined') {
    options.useServiceCatalog = true;
  }
  base.Client.call(this, options);
  this.provider = 'bluemix';
};

util.inherits(Client, base.Client);

Client.prototype._getIdentityOptions = function() {
  var headers = {};
  if (this.config.bearerToken){
      headers["X-UAA-TOKEN"] = "bearer " + this.config.bearerToken;
      if (this.config.userDomainName) {
        headers["X-user-domain"] = this.config.userDomainName;
    }
  }
  return _.extend({
    headers: headers
  }, Client.super_.prototype._getIdentityOptions.call(this));
};

