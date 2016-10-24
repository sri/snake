var webpack = require("webpack");

module.exports = {
  entry: [
    "babel-polyfill",
    "./src/Main.js"
  ],
  output: {
    path: "./html/bundle",
    filename: "all.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        exclude: "./node_modules",
        test: /\.js$/,
        query: {
          presets: ["es2015"]
        },
      },
      {
        loader: "style!css",
        test: /\.css$/,
      },
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
