module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "8.9.0" } }]],
  plugins: [
    ["@babel/plugin-transform-typescript", { isTSX: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  env: {
    production: {
      ignore: [/[/\\.]test\.[tj]sx?$/],
    },
  },
  sourceMaps: "inline",
};
