/*
 * client.js: Compute client for Bluemix Cloudservers

 */

var util = require('util'),
    bluemix = require('../../client'),
    ComputeClient = require('../../../openstack/compute/computeClient').ComputeClient,
    _ = require('underscore');

var Client = exports.Client = function (options) {
  bluemix.Client.call(this, options);

  _.extend(this, require('../../../openstack/compute/client/flavors'));
  _.extend(this, require('../../../openstack/compute/client/images'));
  _.extend(this, require('../../../openstack/compute/client/servers'));
  _.extend(this, require('../../../openstack/compute/client/extensions'));

  this.serviceType = 'compute';
};

util.inherits(Client, bluemix.Client);
_.extend(Client.prototype, ComputeClient.prototype);
