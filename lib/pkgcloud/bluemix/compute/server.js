/*
 * server.js: Bluemix Cloud server
 *
 */

var util = require('util'),
    base = require('../../openstack/compute/server');

var Server = exports.Server = function Server(client, details) {
  base.Server.call(this, client, details);
};

util.inherits(Server, base.Server);
