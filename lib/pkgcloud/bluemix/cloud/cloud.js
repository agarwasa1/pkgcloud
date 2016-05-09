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
  this.id = details.cloud_id;
  this.region = details.region;
  this.authUrl = details.auth_url;
  this.tenantName = details.tenant;
  this.projectDomainName = details.domainName;
  this.userDomainName = details.user_domain_name;
  this.name = details.cloud_name;
  this.type = details.type;
  this.bluemixRegion = details.bluemix_region;
  this.orgGuid = details.org_id;
  this.spaceGuid = details.space_id;
};

Cloud.prototype.toJSON = function () {
  return _.pick(this, ['id', 'name','region', 'authUrl', 'tenantName', 'projectDomainName', 'userDomainName', 'type',
                       'bluemixRegion', 'orgGuid', 'spaceGuid']);
};
