const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

const tsLoader = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
}

const styleLoader = {
  test: /\.css?$/,
  loader: 'style-loader!css-loader',
}

const clientConfig = {
  entry: './src/client',
  output: {
    path: resolve(__dirname, 'build/public'),
    filename: 'client.js',
  },
  module: {
    rules: [tsLoader, styleLoader],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlPlugin({ template: './src/client/index.html' }),
    new webpack.NamedModulesPlugin(),
  ],
  externals: {
    'socket.io-client': 'io',
  },
}

const serverConfig = {
  entry: './src/server',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  module: {
    rules: [tsLoader],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [new webpack.NamedModulesPlugin()],
  target: 'node',
  externals: {
    'socket.io': `require('socket.io')`,
    express: `require('express')`,
  },
  node: {
    __dirname: false,
  },
}

module.exports = [clientConfig, serverConfig]
