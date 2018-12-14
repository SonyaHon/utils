const path = require('path');

const ENV = process.env.ENV || 'development';

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../build'),
    library: 'utils',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'utils.lib.js',
    umdNamedDefine: true,
  },
  target: 'node',
  mode: ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
