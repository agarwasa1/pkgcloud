  /*
 * index.js: Top-level include for the Bluemix cloud module
 *
 */

exports.Client = require('./client').Client;
exports.Cloud = require('./cloud').Cloud;

exports.createClient = function (options) {
  return new exports.Client(options);
};
