var failPlugin = require('webpack-fail-plugin');

// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: './dist/bundle.js',
  },

  // enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  plugins: [ failPlugin ],

  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'babel-loader?presets[]=es2015!ts-loader' },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
    ],
  },

  // when importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // this is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};
