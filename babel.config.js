module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            screens: "./src/screens",
            store: "./src/store",
            utils: "./src/utils",
            types: "./src/types",
            hooks: "./src/hooks",
          },
        },
      ],
    ],
  };
};
