var pkgcloud = require('../../lib/pkgcloud'),
    _ = require('underscore');

var config = {
        provider: 'bluemix', // required
        serversUrl: 'https://clouds.eu-gb.bluemix.net/v1', // required
        orgGuid: '9eda981c-77b6-445b-82aa-89caa022f829',
        spaceGuid: 'b5ca4c72-483a-4dac-9ab3-5ba18349dea9',
        bearerToken : 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmMDRkZTU3Ny02NDVkLTRmOGYtOGQ3OS00ZjkwZGUxYzU4ZGIiLCJzdWIiOiJlODIxNTE3Ny0wODM3LTRmZGMtOTllZC00ZGM2ZjdjNWE3NjkiLCJzY29wZSI6WyJjbG91ZF9jb250cm9sbGVyLnJlYWQiLCJwYXNzd29yZC53cml0ZSIsImNsb3VkX2NvbnRyb2xsZXIud3JpdGUiLCJvcGVuaWQiXSwiY2xpZW50X2lkIjoiY2YiLCJjaWQiOiJjZiIsImF6cCI6ImNmIiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwidXNlcl9pZCI6ImU4MjE1MTc3LTA4MzctNGZkYy05OWVkLTRkYzZmN2M1YTc2OSIsIm9yaWdpbiI6InVhYSIsInVzZXJfbmFtZSI6ImxsYW5AdXMuaWJtLmNvbSIsImVtYWlsIjoibGxhbkB1cy5pYm0uY29tIiwicmV2X3NpZyI6ImJkNmVjMTg0IiwiaWF0IjoxNDYxMTAxNjg2LCJleHAiOjE0NjExNDQ4ODYsImlzcyI6Imh0dHBzOi8vdWFhLm5nLmJsdWVtaXgubmV0L29hdXRoL3Rva2VuIiwiemlkIjoidWFhIiwiYXVkIjpbImNsb3VkX2NvbnRyb2xsZXIiLCJwYXNzd29yZCIsImNmIiwib3BlbmlkIl19.t8lu5eic4L7iukskpwcuZOZzJL7dlhD4Id8jSWEXzhQ' // add ur bearer token
    };

var client = pkgcloud.cloud.createClient(config);

client.getClouds(config, function (err, resp) {
    if (err) {
        console.log(err);
    }
    console.log(resp[0].toJSON());
});

client.getCloud(config, "ec9060418bd19b6052dbff9258292b49",function (err, resp) {
    if (err) {
        console.log(err);
    }
    if (resp) {
        console.log(resp.toJSON());
    } else {
        console.log('cannot find the cloud with the specified id')
    }
});