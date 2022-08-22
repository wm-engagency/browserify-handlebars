var handlebars = require('handlebars');
var through = require('through');

var wrap = function (template) {
  var templated = handlebars.precompile(template);
  
  return 'var templater = handlebars["default"].template;' +
         'module.exports = templater(' + templated + ');'
}

module.exports = function (file) {
  if (!filenamePattern.test(file)) return through();

  var input = '';
  var write = function (buffer) {
    input += buffer;
  }

  var end = function () {
    this.queue(wrap(handlebars.precompile(input)));
    this.queue(null);
  }

  return through(write, end);

}
