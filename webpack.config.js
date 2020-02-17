// var debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDirectory = 'dist';

var DIST_DIR = path.resolve(__dirname, outputDirectory);
var SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  devtool: "inline-sourcemap",

  entry: [
    SRC_DIR + '/index.tsx'
  ],
  output: {
    path: DIST_DIR + '/',
    filename: "bundle.js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          "html-loader",
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ]
  },
  devServer: {
    port: 8080, // Defaults to 8080 (if using another port)
    open: true,
    publicPath: '/',
    proxy: [{
      //regx connect to /api requests
      context: ['/auth', '/api'],
      target: 'http://localhost:3010',
      // pathRewrite: {"^/api" : ""}
    }]
  },
  // and separately, in your plugins section
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/server/views/index.html',
      // favicon: './public/favicon.ico'
    }),
    new webpack.HotModuleReplacementPlugin({
      // multiStep: true
    })
  ],
  performance: { hints: false }
};