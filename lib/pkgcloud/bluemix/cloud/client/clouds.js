/*
 * clouds.js: Instance methods for working with clouds from Bluemix cloud
 */

 var pkgcloud = require('../../../../../lib/pkgcloud'),
  errs = require('errs'),
  _ = require('underscore'),
  urlJoin  = require('url-join'),
  bluemix_cloud = pkgcloud.providers.bluemix.cloud;

var _urlPrefix = '/clouds';

function getUser(client, callback) {

  var requestOptions = {
    path: '/users',
    qs: {}
  };

  requestOptions.qs['ace_config'] = '{"orgGuid":"' + client.orgGuid + '","spaceGuid":"' + client.spaceGuid + '"}'
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
 * @param {function}          callback      f(err, clouds) where clouds is an array of Cloud
 * @returns {*}
 */
exports.getClouds = function getClouds(callback) {
  var self = this;

  var requestOptions = {
    path: _urlPrefix,
    qs: {}
  };

  requestOptions.qs['ace_config'] = '{"orgGuid":"' + this.orgGuid + '","spaceGuid":"' + this.spaceGuid + '"}'

  return this._request(requestOptions, function (err, clouds) {
    if (err) {
      callback(err);
      return;
    }
    if (clouds.length == 0) {
      callback(err, []);
      return;
    }
    getUser(self, function(err, body) {
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
 * @param {string}            cloudId       the cloud_id for target cloud
 * @param {function}          callback      f(err, cloud) where cloud is target Cloud
 * @returns {*}
 */
exports.getCloud = function getCloud(cloudId, callback) {
  var self = this;

  var requestOptions = {
    path: urlJoin(_urlPrefix, cloudId),
    qs: {}
  };

  requestOptions.qs['ace_config'] = '{"orgGuid":"' + this.orgGuid + '","spaceGuid":"' + this.spaceGuid + '"}'

  return this._request(requestOptions, function (err, cloud) {
    if (err) {
      callback(err);
      return;
    }
    getUser(self, function(err, body) {
      if (err) {
        callback(err)
        return;
      }
      cloud.user_domain_name = body.user_domain_name;
      callback(err, new bluemix_cloud.Cloud(self, cloud));
    });
  });
}