var log4js = require('log4js'); 
var config = require('./../ackuaria_config');


var log_file = "./log4js_configuration.json";

log4js.configure(log_file);

exports.logger = log4js;
