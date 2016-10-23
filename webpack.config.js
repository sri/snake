module.exports = {
  entry: [
    "babel-polyfill",
    "./src/snake.js"
  ],
  output: {
    path: "./html/bundle",
    filename: "all.js"
  },
  module: {
    loaders: [
      {
        loader: "style!css",
        test: /\.css$/,
      },
      {
        loader: "babel-loader",
        include: [
          "./src"
        ],
        test: /\.js$/,
        query: {
          presets: ["es2015"]
        },
      }
    ]
  }
};
