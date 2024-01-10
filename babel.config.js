module.exports = {
  env: {
    development: {
      presets: [
        "@babel/preset-typescript",
        "@babel/preset-react",
        "@babel/preset-env",
      ],
      plugins: ["react-refresh/babel"],
    },
    production: {
      presets: [
        "@babel/preset-typescript",
        "@babel/preset-react",
        [
          "@babel/preset-env",
          { useBuiltIns: "usage", corejs: 3, debug: false },
        ],
      ],
    },
  },
};
