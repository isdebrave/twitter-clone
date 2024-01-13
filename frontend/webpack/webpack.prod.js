const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "hidden-source-map",
  mode: "production",
  output: {
    filename: "[name].[contenthash:12].js",
    publicPath: "/",
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    ],
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        "react-slick": {
          test: /[\\/]node_modules[\\/]react-slick[\\/]/,
          chunks: "initial",
          name: "react-slick",
          priority: 1,
        },
        "react-dom": {
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
          chunks: "initial",
          name: "react-dom",
          priority: 1,
        },
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "node_modules",
          priority: 0,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(svg|woff|eot|ttf|gif)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:12].css",
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: "gzip",
    }),
  ],
});
