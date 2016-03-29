/*
 * client.js: Compute client for Bluemix Cloudservers
 *
 */

var util = require('util'),
    bluemix = require('../../client'),
    StorageClient = require('../../../openstack/storage/storageClient').StorageClient,
    _ = require('underscore');

var Client = exports.Client = function (options) {
  bluemix.Client.call(this, options);

  this.models = {
    Container: require('../container').Container,
    File: require('../file').File
  };

  _.extend(this, require('../../../openstack/storage/client/containers'));
  _.extend(this, require('../../../openstack/storage/client/files'));
  _.extend(this, require('./archive'));
  _.extend(this, require('./cdn-containers'));
  _.extend(this, require('./files'));

  this.serviceType = 'object-store';
  this.cdnServiceType = 'object-cdn';
};

util.inherits(Client, bluemix.Client);
_.extend(Client.prototype, StorageClient.prototype);

