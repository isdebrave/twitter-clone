const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "eval",
  mode: "development",
  output: {
    filename: "bundle.js",
  },
  devServer: {
    allowedHosts: "all",
    port: 3000,
    hot: true,
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
