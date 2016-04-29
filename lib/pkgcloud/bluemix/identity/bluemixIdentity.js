/*
 * bluemixIdentity.js: bluemixIdentity model
 *
 */

var identity = require('../../openstack/context'),
  events = require('eventemitter2'),
  Identity = identity.Identity,
  util = require('util');

var BluemixIdentity = exports.Identity = function (options) {
  this.options = options;
  this.name = 'BluemixIdentity';
  this.basePath = options.basePath || (options.keystoneAuthVersion === 'v2.0' ? '/v2.0/tokens' : '/v3/auth/tokens');
  this.useServiceCatalog = (typeof options.useServiceCatalog === 'boolean')
    ? options.useServiceCatalog
    : true;

  events.EventEmitter2.call(this, { delimiter: '::', wildcard: true });
};

util.inherits(BluemixIdentity, events.EventEmitter2);
util.inherits(BluemixIdentity, Identity);

BluemixIdentity.prototype._buildAuthenticationPayload = function () {
  var self = this;

  BluemixIdentity.super_.prototype._buildAuthenticationPayload.call(this);

  this.emit('log::trace', 'Building Bluemix Identity Auth Payload');

  if (!self._authenticationPayload) {
    // setup our inputs for authorization
    // key & username
    if (self.options.headers && self.options.headers["X-UAA-TOKEN"]) {
      self._authenticationPayload = {
        auth: {}
      };
       //check if we're getting a scoped token against a project and/or domain
      if (self.options.tenantId || self.options.tenantName || self.options.projectDomainName || self.options.projectDomainId) {
        self._authenticationPayload.auth.scope = {};
        var scopedProject = true;
        if (self.options.tenantId) {
          self._authenticationPayload.auth.scope.project = {id:self.options.tenantId};
        } else  if (self.options.tenantName) {
          self._authenticationPayload.auth.scope.project = {name:self.options.tenantName};
        } else {
          scopedProject = false;
        }
        if (!scopedProject) {
          if (self.options.projectDomainId) {
            self._authenticationPayload.auth.scope.domain = {id:self.options.projectDomainId};
          } else if (self.options.projectDomainName) {
            self._authenticationPayload.auth.scope.domain = {name:self.options.projectDomainName};
          }
        } else {
          if (self.options.projectDomainId) {
            self._authenticationPayload.auth.scope.project.domain = {id:self.options.projectDomainId};
          } else if(self.options.projectDomainName) {
            self._authenticationPayload.auth.scope.project.domain = {name:self.options.projectDomainName};
          }
        }
      }
    }
  }
};