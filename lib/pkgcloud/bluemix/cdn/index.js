/*
 * index.js: Top-level include for the Bluemix CDN module.
 */

exports.Client = require('./client').Client;
exports.Service = require('../../openstack/cdn/service').Service;
exports.Flavor = require('../../openstack/cdn/flavor').Flavor;

exports.createClient = function(options) {
  return new exports.Client(options);
};
