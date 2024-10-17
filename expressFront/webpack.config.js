const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // {
      //   test: /\.module\.css$/,  // .module.css 파일에만 CSS 모듈 적용
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.css$/,  
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "development",
};
