  /*
 * index.js: Top-level include for the Bluemix orchestration module
 *
 */

exports.Client = require('./client').Client;
exports.Stack = require('../../openstack/orchestration/stack').Stack;
exports.Resource = require('../../openstack/orchestration/resource').Resource;

exports.createClient = function (options) {
  return new exports.Client(options);
};