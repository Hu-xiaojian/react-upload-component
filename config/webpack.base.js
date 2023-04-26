const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@/': path.join(__dirname, '../src/'),
    },
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.sass' ],
  },
  module: {
    rules: [
      {
        // 编译处理 js(x) 和 ts(x) 文件
        test: /(\.js(x?))|(\.ts(x?))$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },

}