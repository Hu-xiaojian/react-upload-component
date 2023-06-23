const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',    //server | static | disabled
      analyzerHost: '127.0.0.1',   // 默认值：127.0.0.1。 将在服务器模式下用于启动HTTP服务器的主机。
      analyzerPort: 8889,         // 默认值：8888。将在服务器模式下用于启动HTTP服务器的端口。
      reportFilename: 'report.html',      // 默认值：report.html。 捆绑将在静态模式下生成的报告文件的路径。 相对于bundle输出目录（在webpack配置中是output.path）。
      defaultSizes: 'parsed',     // 默认值：已解析。 默认情况下在报告中显示的模块大小。 大小定义部分描述了这些值的含义。
      openAnalyzer: true,     // 默认值：true。 在默认浏览器中自动打开报告。
      generateStatsFile: false,   // 默认值：false。 如果为true，将在bundle输出目录中生成webpack stats JSON文件
      statsFilename: 'stats.json',  // 默认值：stats.json。 如果generateStatsFile为true，将生成的webpack stats JSON文件的名称。 相对于bundle输出目录。
      statsOptions: null,     // 默认值：null。 stats.toJson（）方法的选项。 例如，您可以使用source：false选项从stats文件中排除模块的源。 在这里查看更多选项。
      logLevel: 'info'    // 默认值：info。 用于控制插件输出的详细信息。
    }),
  ],
  externals: {
    'react': 'var window.React',
    'react-dom': 'var window.ReactDOM',
  },
}
