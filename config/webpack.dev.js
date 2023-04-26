const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    path: path.join(__dirname, '../demo/'),
    filename: 'dev.js',
  },
  module: {
    rules: [
      {
        test: /.s[ac]ss$/,
        exclude: /.min.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env', {}, // 其他选项
                  ]
                ]
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /.min.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, '../demo/'),
    compress: true,
    host: '127.0.0.1',
    port: 8888,
    open: true,
  }
}

module.exports = merge(devConfig, baseConfig);