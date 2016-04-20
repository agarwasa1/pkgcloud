/*
 * clouds.js: Instance methods for working with clouds from Bluemix cloud
 */

 var pkgcloud = require('../../../../../lib/pkgcloud'),
  errs = require('errs'),
  _ = require('underscore'),
  bluemix_cloud = pkgcloud.providers.bluemix.cloud;

var _urlPrefix = '/clouds';

function getUser(client, options, callback) {

  var requestOptions = {
    path: '/users',
    qs: {}
  };

  requestOptions.qs['ace_config'] = '{"orgGuid":"' + options.orgGuid + '","spaceGuid":"' + options.spaceGuid + '"}'
  return client._request(requestOptions, function (err, body) {
    if (err) {
      callback(err);
      return;
    }
    return callback(err, body)
  });
}

/**
 * client.getClouds
 *
 * @description get the list of clouds for the current account
 *
 * @param {object|Function}   [options]     A set of options for the getClouds call
 * @param {function}          callback      f(err, clouds) where clouds is an array of Cloud
 * @returns {*}
 */
exports.getClouds = function getClouds(options, callback) {
  var self = this;

  var requestOptions = {
    path: _urlPrefix,
    qs: {}
  };

  requestOptions.qs['ace_config'] = '{"orgGuid":"' + options.orgGuid + '","spaceGuid":"' + options.spaceGuid + '"}'

  return this._request(requestOptions, function (err, clouds) {
    if (err) {
      callback(err);
      return;
    }
    if (clouds.length == 0) {
      callback(err, []);
      return;
    }
    getUser(self, options, function(err, body) {
      callback(err, clouds.clouds.map(function(cloud) {
        cloud.user_domain_name = body.user_domain_name;
        return new bluemix_cloud.Cloud(self, cloud);
    }));
    });
  });
};

/**
 * client.getClouds
 *
 * @description get the the cloud for the current account based on given cloudId
 *
 * @param {object|Function}   [options]     A set of options for the getClouds call
 * @param {string}            cloudId       the cloud_id for target cloud
 * @param {function}          callback      f(err, cloud) where cloud is target Cloud
 * @returns {*}
 */
exports.getCloud = function getCloud(options, cloudId, callback) {
  var self = this;

  var requestOptions = {
    path: _urlPrefix,
    qs: {}
  };

  requestOptions.qs['ace_config'] = '{"orgGuid":"' + options.orgGuid + '","spaceGuid":"' + options.spaceGuid + '"}'

  userDomainName = getUser(this, options, function(err, body) {
    if (err) {
      console.log(err);
    }
  });

  return this._request(requestOptions, function (err, body) {
    if (err) {
      callback(err);
      return;
    }
    filteredClouds = body.clouds.filter(function(cloud) {
      return cloudId == cloud.cloud_id;
    });
    if (filteredClouds.length == 0) {
      callback(err, null)
      return
    }
    getUser(self, options, function(err, body) {
      if (err) {
        callback(err)
        return;
      }
      filteredClouds[0].user_domain_name = body.user_domain_name;
      callback(err, new bluemix_cloud.Cloud(self, filteredClouds[0]));
    });
  });
}