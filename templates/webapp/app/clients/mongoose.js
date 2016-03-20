var mongoose = require('mongoose');
var config = require('config');
var logger = require('clients/winston');

mongoose.connect(config.mongoose.uri, config.mongoose.options);

mongoose.connection.on('error', function(err) {
  logger.error(err);
});

mongoose.connection.on('open', function() {
  logger.info('Mongo connected');
});

mongoose.Promise = Promise;

module.exports = mongoose;
