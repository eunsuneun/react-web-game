const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'web game with react',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./client'],
  },
  module: {
    rules: [{
      test: /.\jsx?/, // js와 jsx파일에 규칙을 적용하겠다.
      loader: 'babel-loader', // 바벨을
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'], // browserslist
            },
            debug: true,
          }],
          '@babel/preset-react'
        ], // 바벨의 프리셋을 적용하는 옵션
        plugins: [
          'react-refresh/babel'
        ]
      }
    }],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) }, 
    hot: true
  }
}