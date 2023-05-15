const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
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
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 支持的浏览器
                    targets: {
                      chrome: '90',
                      ie: '9',
                    }
                  }
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },

}
