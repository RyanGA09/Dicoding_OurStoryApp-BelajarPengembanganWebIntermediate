const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: [
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname, "src/public"),
    ],
    open: false,
    port: 9000,
    watchFiles: {
      paths: ["src/**/*"],
      options: {
        ignored: ["dist/**/*"],
      },
    },
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
});
