var config = require('../ackuaria_config');
var log = require('./logger').logger.getLogger("Ackuaria");
var connection = config.notifications.https ? require('https') : require('http');
var querystring = require('querystring');

var API = {};

function optionsForRequest(endpoint) {
    return {
        hostname: config.notifications.hostname,
        port: config.notifications.port,
        path: endpoint,
        method: 'POST'
    };
}

function performRequest(options, params) {
    var data = querystring.stringify(params);

    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    };

    var request = connection.request(options, function (res) {
        log.info('Notifications: Response satatus', res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
        });
    });

    request.write(data);
    request.end();

    request.on('error', function (e) {
        log.error('Notifications: There was an error notifying endpoint `'+ options.path +'`:', e);
    });
}

API.notifyEvent = function (eventName, params) {
    var endpoint = config.notifications.endpoints[eventName];
    if (!endpoint)
      return;
    var options = optionsForRequest(endpoint, params);
    log.info('Notifications: Notifying event `'+eventName+'` to endpoint `' + endpoint);
    performRequest(options, params);
}

var module = module || {};
module.exports = API;
