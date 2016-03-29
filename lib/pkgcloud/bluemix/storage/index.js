  /*
 * index.js: Top-level include for the Bluemix storage module
 */

exports.Client = require('./client').Client;
exports.Container = require('./container').Container;
exports.File = require('./file').File;

exports.createClient = function (options) {
  return new exports.Client(options);
};
