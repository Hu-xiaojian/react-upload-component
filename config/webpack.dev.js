const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../demo/app'),
  output: {
    path: path.join(__dirname, '../lib'),
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
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {}, // 其他选项
                  ],
                ],
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /.min.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../demo/index.html'),
    }),
    new ESLintPlugin(),
  ],
  devServer: {
    static: path.join(__dirname, '../demo/'),
    compress: true,
    host: '127.0.0.1',
    port: 8888,
    open: true,
  },
};

module.exports = merge(devConfig, baseConfig);
