const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../lib'),
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
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
      template: path.join(__dirname, '../docs/index.html'),
    }),
    new ESLintPlugin(),
  ],
};

module.exports = merge(devConfig, baseConfig);
