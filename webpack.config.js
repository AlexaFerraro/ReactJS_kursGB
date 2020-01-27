const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './index.jsx',
  },
  context: path.resolve(__dirname, 'static_src'),
  output: {
    path: path.resolve(__dirname, 'static', 'build'),
    filename: 'app.js',
    publicPath: 'static/build'
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'static_src'),
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            [
              '@babel/plugin-proposal-class-properties',
                {
                  'loose': true
                }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    modules: [`${__dirname}/static_src`, 'node_modules'],
    extensions: ['.js', '.jsx'],
 },
};