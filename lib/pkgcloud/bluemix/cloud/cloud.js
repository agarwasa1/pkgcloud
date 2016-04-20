/*
 * cloud.js: Bluemix cloud
 *
 */

var util  = require('util'),
    base  = require('../../core/base'),
    _     = require('underscore');

var Cloud = exports.Cloud = function Cloud(client, details) {
  base.Model.call(this, client, details);
};

util.inherits(Cloud, base.Model);

Cloud.prototype._setProperties = function (details) {
  this.region = details.region;
  this.authUrl = details.auth_url;
  this.tenantName = details.tenant;
  this.projectDomainName = details.domainName;
  this.userDomainName = details.user_domain_name;
};

Cloud.prototype.toJSON = function () {
  return _.pick(this, ['region', 'authUrl', 'tenantName', 'projectDomainName', 'userDomainName' ]);
};
