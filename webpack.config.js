const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: "eval",
  mode: "development",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
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
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
