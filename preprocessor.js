var tsc = require('typescript');
var tsConfig = require('./tsconfig.json');

module.exports = {
  process: function (src, path) {
    if (path.match(/\.tsx?$/)) {
      return tsc.transpile(src, tsConfig.compilerOptions, path, []);
    }
    return src;
  }
};
