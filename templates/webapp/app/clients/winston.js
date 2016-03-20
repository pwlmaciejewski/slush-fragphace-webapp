var config = require('config');
var winston = require('winston');

var options = {
  transports: []
};

if (config.logger.console) {
  options.transports.push(new (winston.transports.Console)({
    colorize: true
  }));
}

module.exports = new (winston.Logger)(options);
