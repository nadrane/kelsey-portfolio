"use strict";

const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: "./browser/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  context: __dirname,
  devtool: "source-map",
  resolve: {
    modules: [
      'node_modules',
      'assets/stylesheets'
    ]
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.scss|\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: ["assets/stylesheets"]
            }
          }
        ]
      }
    ]
  }
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production')
  //     }
  //   }),
  //   new webpack.optimize.UglifyJsPlugin()
  // ]
};
