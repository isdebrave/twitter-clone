const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const production = require("./webpack.prod");

module.exports = merge(production, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: true,
    }),
  ],
});
