var handlebars = require('handlebars');
var through = require('through');

var filenamePattern = /\.(html|handlebars|hbs)$/;

var wrap = function (templated, dir = '') {
  var directory = dir?.dir !== undefined ? dir.dir.toString() : '';
  return 'var templater = require("' + directory + '/node_modules/handlebars/dist/cjs/handlebars.runtime")["default"].template; module.exports = templater(' + templated +');'
}

module.exports = function (file, dir) {
  if (!filenamePattern.test(file)) return through();

  var input = '';
  var write = function (buffer) {
    input += buffer;
  }

  var end = function () {
    this.queue(wrap(handlebars.precompile(input), dir));
    this.queue(null);
  }

  return through(write, end);

}
