const path = require('path');

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
        ] // 바벨의 프리셋을 적용하는 옵션
      }
    }],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
}