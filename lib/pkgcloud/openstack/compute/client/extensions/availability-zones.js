/*
 * availability-zones.js Implementation of OpenStack AvailabilityZones API
 *
 * (C) 2016 Saurabh Agarwal
 *
 */

var urlJoin = require('url-join');

var _extension = 'os-availability-zone';

/**
 * client.listAvailabilityZones
 *
 * @description List availabilityZones for the current compute client
 *
 * @param {Function}    callback    f(err, availabilityZones) where availabilityZoneInfo is an array of availabilityZones
 * @returns {*}
 */
exports.listAvailabilityZones = function listAvailabilityZones(callback) {
  return this._request({
    path: _extension
  }, function (err, body, res) {
    return err
      ? callback(err)
      : callback(null, body.availabilityZoneInfo);
  });
};