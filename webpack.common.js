const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { GenerateSW, InjectManifest } = require("workbox-webpack-plugin");
// const WebpackPwaManifest = require("webpack-pwa-manifest");

// const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
    // sw: path.resolve(__dirname, "src/scripts/sw.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      excludeChunks: ["sw"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
          globOptions: {
            ignore: ["**/index.html"], // Exclude index.html
          },
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, "src/sw.js"),
      swDest: "sw.bundle.js",
    }),
    // new WebpackPwaManifest({
    //   name: 'Go Eat App',
    //   short_name: 'Go Eat',
    //   description: 'Katalog Restaurant, menampilkan katalog restaurant Terkenal',
    //   start_url: '/index.html',
    //   display: 'standalone',
    //   background_color: '#ffffff',
    //   theme_color: '#e59446',
    //   crossorigin: null,
    //   inject: true, // Ensure this is enabled
    //   icons: [
    //     {
    //       src: path.resolve(__dirname, 'src/public/images/icons/add-x512.png'),
    //       sizes: [96, 120, 128, 152, 167, 180, 192, 256, 384, 512],
    //       type: 'image/png',
    //       purpose: 'any maskable',
    //       destination: path.join('icons', 'icon'),
    //     },
    //   ],
    // }),
  ],
};
