const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
var CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require("@gfx/zopfli");


module.exports = {
  
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        use: "file-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new NodePolyfillPlugin(), 
    new CompressionPlugin({
      compressionOptions: {
        numiterations: 15,
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      },
    }),
  
  ],
};
