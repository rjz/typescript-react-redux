const webpack = require('webpack');

const webpackConfig = Object.assign({}, require('./webpack.config'), {
  entry: {},
  output: {},
  cache: true,
  externals: {}
});

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'sinon'],
    files: [
      'src/**/__tests__/*spec.ts',
      'src/**/__tests__/*spec.tsx'
    ],
    preprocessors: {
      'src/**/*spec.{ts,tsx}': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
};
